import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// المكون الأساسي للراديو جروب مع دعم العنوان والوصف والحالة
type RadioOption = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  tooltip?: string
}

type ExtendedRadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "children"
> & {
  options: RadioOption[]
  label?: React.ReactNode
  description?: React.ReactNode
  orientation?: "vertical" | "horizontal"
  size?: "sm" | "md" | "lg"
  showIndicator?: boolean
  onValueChange?: (val: string) => void
  value?: string
  defaultValue?: string
  name?: string
  disabled?: boolean
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  ExtendedRadioGroupProps
>(
  (
    {
      className,
      label,
      description,
      options,
      orientation = "vertical",
      size = "md",
      showIndicator = true,
      onValueChange,
      value,
      defaultValue,
      name,
      disabled,
      ...props
    },
    ref
  ) => (
    <div className={cn("space-y-1", className)}>
      {label && <div className="font-semibold text-base">{label}</div>}
      {description && <div className="text-xs text-muted-foreground mb-1">{description}</div>}
      <RadioGroupPrimitive.Root
        className={cn(
          orientation === "vertical" ? "flex flex-col gap-3" : "flex flex-row gap-5",
          disabled && "opacity-50 pointer-events-none"
        )}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        name={name}
        onValueChange={onValueChange}
        disabled={disabled}
        {...props}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-center gap-2 cursor-pointer select-none group",
              opt.disabled && "opacity-50 cursor-not-allowed"
            )}
            title={opt.tooltip}
          >
            <RadioGroupPrimitive.Item
              value={opt.value}
              disabled={disabled || opt.disabled}
              className={cn(
                "relative border border-primary rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition shadow-sm bg-background",
                sizeMap[size],
                "flex items-center justify-center",
                "data-[state=checked]:bg-primary/10",
                "data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
              )}
            >
              {showIndicator && (
                <RadioGroupPrimitive.Indicator className="flex items-center justify-center transition-all duration-200">
                  <Circle
                    className={cn(
                      size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-3 w-3",
                      "fill-current text-primary"
                    )}
                  />
                </RadioGroupPrimitive.Indicator>
              )}
            </RadioGroupPrimitive.Item>
            {opt.icon && <span className="text-primary">{opt.icon}</span>}
            <span className="text-sm font-medium">{opt.label}</span>
            {opt.description && (
              <span className="ml-2 text-xs text-muted-foreground">{opt.description}</span>
            )}
          </label>
        ))}
      </RadioGroupPrimitive.Root>
    </div>
  )
)
RadioGroup.displayName = "RadioGroup"

// مكون عملي: مثال للاستخدام
export function ExampleRadioGroupDemo() {
  const [val, setVal] = React.useState("option2")
  return (
    <RadioGroup
      label="اختر طريقة الدفع"
      description="يرجى تحديد الخيار المناسب لك"
      options={[
        { value: "option1", label: "فيزا", icon: <span>💳</span>, description: "بطاقة بنكية" },
        { value: "option2", label: "باي بال", icon: <span>🅿️</span>, description: "دفع إلكتروني" },
        { value: "option3", label: "نقداً", icon: <span>💵</span>, description: "عند التسليم", disabled: true },
      ]}
      value={val}
      onValueChange={setVal}
      orientation="horizontal"
      size="lg"
    />
  )
}
