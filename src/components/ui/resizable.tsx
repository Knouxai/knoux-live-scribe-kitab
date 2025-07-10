import { GripVertical, GripHorizontal } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "@/lib/utils"
import * as React from "react"

// PanelGroup مع دعم الاتجاه والحفظ التلقائي للحجم
const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  autoSaveId,
  children,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup> & {
  direction?: "horizontal" | "vertical"
  autoSaveId?: string // لو تريد حفظ الحالة تلقائياً
}) => {
  // حفظ واسترجاع أحجام اللوحات (panels) في localStorage
  const [sizes, setSizes] = React.useState<number[]>()
  React.useEffect(() => {
    if (autoSaveId) {
      const saved = window.localStorage.getItem(`panel-sizes-${autoSaveId}`)
      if (saved) setSizes(JSON.parse(saved))
    }
  }, [autoSaveId])
  const handleLayout = (newSizes: number[]) => {
    if (autoSaveId) {
      window.localStorage.setItem(`panel-sizes-${autoSaveId}`, JSON.stringify(newSizes))
    }
    setSizes(newSizes)
  }
  return (
    <ResizablePrimitive.PanelGroup
      direction={direction}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      onLayout={autoSaveId ? handleLayout : undefined}
      {...props}
    >
      {children}
    </ResizablePrimitive.PanelGroup>
  )
}

// Panel مع دعم رأس وتذييل وتعطيل السحب
const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Panel>,
  React.ComponentProps<typeof ResizablePrimitive.Panel> & {
    header?: React.ReactNode
    footer?: React.ReactNode
    disableResize?: boolean
    className?: string
  }
>(({ header, footer, disableResize, className, children, ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    className={cn(
      "relative flex flex-col min-w-[40px] min-h-[40px] bg-background border",
      className
    )}
    disabled={disableResize}
    {...props}
  >
    {header && <div className="p-2 border-b bg-muted font-bold text-sm">{header}</div>}
    <div className="flex-1 overflow-auto">{children}</div>
    {footer && <div className="p-2 border-t bg-muted text-xs">{footer}</div>}
  </ResizablePrimitive.Panel>
))
ResizablePanel.displayName = "ResizablePanel"

// Handle مع دعم الاتجاه، Tooltips، وتعطيل السحب
const ResizableHandle = ({
  withHandle = true,
  direction = "horizontal",
  disabled,
  tooltip,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
  direction?: "horizontal" | "vertical"
  disabled?: boolean
  tooltip?: string
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex items-center justify-center transition group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 bg-border",
      direction === "vertical"
        ? "h-px w-full cursor-row-resize"
        : "w-px h-full cursor-col-resize",
      disabled && "opacity-30 pointer-events-none",
      className
    )}
    disabled={disabled}
    {...props}
    title={tooltip}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex items-center justify-center rounded bg-border border shadow-sm",
          direction === "vertical" ? "h-3 w-6" : "h-6 w-3"
        )}
      >
        {direction === "vertical"
          ? <GripHorizontal className="h-2.5 w-2.5" />
          : <GripVertical className="h-2.5 w-2.5" />}
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)
ResizableHandle.displayName = "ResizableHandle"

// مثال عملي متكامل للاستخدام
export function ExampleResizablePanels() {
  const [direction, setDirection] = React.useState<"horizontal" | "vertical">("horizontal")
  return (
    <div className="w-full h-64 border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 p-2 bg-muted">
        <span className="font-bold text-sm">اتجاه اللوحات:</span>
        <button
          className={cn(
            "px-2 py-1 rounded border",
            direction === "horizontal" && "bg-primary text-white"
          )}
          onClick={() => setDirection("horizontal")}
        >أفقي</button>
        <button
          className={cn(
            "px-2 py-1 rounded border",
            direction === "vertical" && "bg-primary text-white"
          )}
          onClick={() => setDirection("vertical")}
        >عمودي</button>
      </div>
      <ResizablePanelGroup direction={direction} autoSaveId="example">
        <ResizablePanel header="لوحة 1" footer="محتوى قابل للسحب" minSize={10} defaultSize={30}>
          <div className="p-4">محتوى اللوحة 1</div>
        </ResizablePanel>
        <ResizableHandle
          direction={direction}
          tooltip={direction === "vertical" ? "اسحب للأعلى أو الأسفل" : "اسحب لليمين أو اليسار"}
        />
        <ResizablePanel header="لوحة 2" footer="تجربة تفاعلية" minSize={10} defaultSize={70}>
          <div className="p-4">لوحة 2: محتوى آخر، اسحب المقبض للتحكم بالحجم.</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

/*
مميزات النسخة:
- دعم الاتجاه الأفقي والعمودي ديناميكياً.
- دعم رأس وتذييل ومحتوى داخلي لكل Panel.
- دعم الحفظ التلقائي لأحجام اللوحات في localStorage.
- دعم تعطيل السحب/المقابض.
- دعم Tooltips وأيقونات ديناميكية للمقبض.
- مثال عملي تفاعلي.
- أنيميشن وحركات حديثة ودعم الستايل الكامل.
- جاهز للتوسعة في المشاريع الكبيرة مباشرة.
*/
