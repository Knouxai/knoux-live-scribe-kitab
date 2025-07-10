import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  label?: React.ReactNode
  labelPosition?: "center" | "start" | "end"
  thickness?: number | string
  colorClass?: string
  withAnimation?: boolean
  show?: boolean
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      labelPosition = "center",
      thickness,
      colorClass = "bg-border",
      withAnimation = false,
      show = true,
      ...props
    },
    ref
  ) => {
    if (!show) return null

    const isHorizontal = orientation === "horizontal"
    const thicknessClass = thickness
      ? isHorizontal
        ? `h-[${typeof thickness === "number" ? thickness + "px" : thickness}]`
        : `w-[${typeof thickness === "number" ? thickness + "px" : thickness}]`
      : isHorizontal
        ? "h-[1px]"
        : "w-[1px]"

    return label ? (
      <div
        className={cn(
          "flex items-center gap-2 select-none",
          isHorizontal ? "flex-row" : "flex-col",
          className
        )}
        aria-orientation={orientation}
      >
        {/* خط قبل النص */}
        {(labelPosition === "center" || labelPosition === "end") && (
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
              "shrink-0 flex-1",
              thicknessClass,
              colorClass,
              withAnimation && "transition-all duration-300",
            )}
            {...props}
          />
        )}
        {/* النص أو العنوان */}
        <span
          className={cn(
            "mx-2 text-xs font-medium text-muted-foreground whitespace-nowrap",
            withAnimation && "animate-pulse"
          )}
        >
          {label}
        </span>
        {/* خط بعد النص */}
        {(labelPosition === "center" || labelPosition === "start") && (
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
              "shrink-0 flex-1",
              thicknessClass,
              colorClass,
              withAnimation && "transition-all duration-300"
            )}
            {...props}
          />
        )}
      </div>
    ) : (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0",
          thicknessClass,
          colorClass,
          withAnimation && "transition-all duration-300",
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"

export { Separator }

// ---------------------- مثال عملي ----------------------

// استخدمه هكذا في أي مكان
/*
<>
  <Separator className="my-4" />
  <Separator orientation="vertical" className="mx-4" />
  <Separator label="أو" labelPosition="center" className="my-8" />
  <Separator label="نهاية القسم" labelPosition="end" colorClass="bg-red-500" thickness={3} withAnimation />
</>
*/
