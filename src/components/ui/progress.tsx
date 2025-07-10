import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number
  showLabel?: boolean
  label?: string | ((value: number) => React.ReactNode)
  color?: "primary" | "success" | "danger" | "warning" | "info" | string
  striped?: boolean
  animated?: boolean
  showPercent?: boolean
  size?: "sm" | "md" | "lg"
}

const colorMap: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-400",
  info: "bg-blue-400",
}

const sizeMap: Record<string, string> = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      showLabel = false,
      label,
      color = "primary",
      striped = false,
      animated = true,
      showPercent = false,
      size = "md",
      ...props
    },
    ref
  ) => {
    const percent = Math.max(0, Math.min(100, value))
    const indicatorColor = colorMap[color] || color
    const sizeClass = sizeMap[size] || sizeMap.md

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-secondary transition-all",
          sizeClass,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "flex-1 h-full transition-all duration-500",
            indicatorColor,
            striped && "bg-[repeating-linear-gradient(45deg,#fff3,transparent_10px,#fff3_20px,transparent_30px)]",
            animated && "animate-pulse"
          )}
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
        {(showLabel || showPercent) && (
          <span className="absolute inset-0 flex items-center justify-center font-medium text-xs text-black/80 select-none pointer-events-none">
            {label
              ? typeof label === "function"
                ? label(percent)
                : label
              : showPercent
                ? `${percent}%`
                : null}
          </span>
        )}
      </ProgressPrimitive.Root>
    )
  }
)
Progress.displayName = "Progress"

// ---------- مثال عملي/توضيحي ----------

export function ExampleProgressDemo() {
  const [val, setVal] = React.useState(20)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setVal((v) => (v >= 100 ? 0 : v + 10))
    }, 1200)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="space-y-4 w-64">
      <Progress value={val} showPercent size="md" />
      <Progress value={val} color="success" showLabel label="تحميل..." striped animated size="lg" />
      <Progress value={val} color="danger" showLabel label={(v) => `تم ${v}%`} striped size="sm" />
      <Progress value={val} color="#8b5cf6" showPercent size="md" />
    </div>
  )
}
