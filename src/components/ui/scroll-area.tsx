import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

// نسخة موسعة ومحترفة مع جميع الميزات المنطقية الممكنة
type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  hideScrollbars?: boolean
  scrollHideDelay?: number
  minThumbSize?: number
  thumbColorClass?: string
  orientation?: "vertical" | "horizontal" | "both"
  cornerContent?: React.ReactNode
  showShadowTop?: boolean
  showShadowBottom?: boolean
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      hideScrollbars = false,
      scrollHideDelay = 600,
      minThumbSize = 28,
      thumbColorClass = "bg-border",
      orientation = "vertical",
      cornerContent,
      showShadowTop = false,
      showShadowBottom = false,
      ...props
    },
    ref
  ) => {
    // منطق لإظهار ظل أعلى/أسفل عند التمرير
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const [topShadow, setTopShadow] = React.useState(false)
    const [bottomShadow, setBottomShadow] = React.useState(false)
    React.useEffect(() => {
      if (!showShadowTop && !showShadowBottom) return
      const el = viewportRef.current
      if (!el) return
      const handler = () => {
        if (showShadowTop) setTopShadow(el.scrollTop > 0)
        if (showShadowBottom) setBottomShadow(el.scrollTop + el.clientHeight < el.scrollHeight)
      }
      el.addEventListener("scroll", handler)
      handler()
      return () => el.removeEventListener("scroll", handler)
    }, [showShadowTop, showShadowBottom])

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        type={hideScrollbars ? "auto" : "always"}
        scrollHideDelay={scrollHideDelay}
        className={cn(
          "relative overflow-hidden",
          hideScrollbars && "scrollbar-hide",
          className
        )}
        {...props}
      >
        <div className="relative h-full w-full">
          {showShadowTop && (
            <div
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-black/10 to-transparent opacity-0 transition-opacity",
                topShadow && "opacity-100"
              )}
            />
          )}
          <ScrollAreaPrimitive.Viewport
            ref={viewportRef}
            className="h-full w-full rounded-[inherit]"
          >
            {children}
          </ScrollAreaPrimitive.Viewport>
          {showShadowBottom && (
            <div
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-full bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity",
                bottomShadow && "opacity-100"
              )}
            />
          )}
        </div>
        {(orientation === "vertical" || orientation === "both") && (
          <ScrollBar
            orientation="vertical"
            thumbColorClass={thumbColorClass}
            minThumbSize={minThumbSize}
          />
        )}
        {(orientation === "horizontal" || orientation === "both") && (
          <ScrollBar
            orientation="horizontal"
            thumbColorClass={thumbColorClass}
            minThumbSize={minThumbSize}
          />
        )}
        <ScrollAreaPrimitive.Corner>
          {cornerContent}
        </ScrollAreaPrimitive.Corner>
      </ScrollAreaPrimitive.Root>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  minThumbSize?: number
  thumbColorClass?: string
}
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", thumbColorClass = "bg-border", minThumbSize = 28, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical"
        ? "h-full w-2.5 border-l border-l-transparent p-[1px]"
        : "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full",
        thumbColorClass
      )}
      style={{
        minHeight: orientation === "vertical" ? minThumbSize : undefined,
        minWidth: orientation === "horizontal" ? minThumbSize : undefined
      }}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = "ScrollAreaScrollbar"

// مثال عملي جاهز
export function ExampleScrollArea() {
  return (
    <div className="w-56 h-48 border rounded p-2">
      <ScrollArea
        orientation="both"
        thumbColorClass="bg-primary/60"
        minThumbSize={32}
        showShadowTop
        showShadowBottom
      >
        <div className="w-[600px] h-[400px] bg-gradient-to-br from-gray-100 to-gray-300 p-6">
          <p>محتوى طويل جداً يمكن تمريره أفقياً وعمودياً عبر الـ ScrollArea.</p>
          <p>تستطيع تخصيص كل شيء: الشكل، اللون، الحجم، السلوك، إلخ.</p>
        </div>
      </ScrollArea>
    </div>
  )
}

export { ScrollArea, ScrollBar }
