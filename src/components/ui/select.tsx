import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// الجذر الأساسي
const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

// زر التريجر مع دعم أيقونة اختيارية وحالة التحميل والتعطيل
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    loading?: boolean
    icon?: React.ReactNode
    error?: boolean
  }
>(({ className, children, loading, icon, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition",
      error && "border-red-500 focus:ring-red-500",
      loading && "opacity-60 pointer-events-none",
      className
    )}
    aria-invalid={error}
    disabled={loading}
    {...props}
  >
    <div className="flex items-center gap-2">
      {icon}
      {children}
    </div>
    {loading ? (
      <span className="animate-spin mr-2 h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
    ) : (
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

// زر التمرير لأعلى/أسفل
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

// محتوى القائمة المنسدلة مع دعم عناصر فرعية وأخطاء وخيارات فارغة
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    emptyText?: React.ReactNode
    error?: boolean
    helperText?: React.ReactNode
    maxHeight?: string | number
    position?: "popper" | "item-aligned"
  }
>(({ className, children, emptyText, error, helperText, maxHeight = "24rem", position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] max-h-[24rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in",
        error && "border-red-500",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      style={{ maxHeight }}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {React.Children.count(children) > 0 ? children : (
          <div className="p-4 text-muted-foreground text-center text-xs">{emptyText ?? "لا توجد خيارات"}</div>
        )}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
      {helperText && (
        <div className={cn("px-3 pb-2 text-xs flex items-center gap-1", error && "text-red-500")}>
          {error && <Info className="h-3 w-3" />} {helperText}
        </div>
      )}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = "SelectContent"

// عنوان مجموعة الخيارات
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

// عنصر خيار مع دعم أيقونة وحالة تعطيل/تفعيل/تحديد
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    icon?: React.ReactNode
    tooltip?: string
  }
>(({ className, children, icon, tooltip, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition",
      className
    )}
    title={tooltip}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
      {icon}
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = "SelectItem"

// فاصل بين الخيارات
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

// مكون عملي: مثال للاستخدام الديناميكي
export function ExampleSelect() {
  const [value, setValue] = React.useState<string>("")
  return (
    <div className="w-64 space-y-2">
      <label className="block font-medium mb-1">اختر الدولة</label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger icon={<span>🌍</span>} error={!value}>
          <SelectValue placeholder="اختر..." />
        </SelectTrigger>
        <SelectContent emptyText="لا توجد دول متاحة" error={!value} helperText={!value && "يجب اختيار دولة"}>
          <SelectGroup>
            <SelectLabel>العربية</SelectLabel>
            <SelectItem value="eg" icon={<span>🇪🇬</span>}>مصر</SelectItem>
            <SelectItem value="sa" icon={<span>🇸🇦</span>}>السعودية</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>دول أخرى</SelectLabel>
            <SelectItem value="us" icon={<span>🇺🇸</span>}>أمريكا</SelectItem>
            <SelectItem value="de" icon={<span>🇩🇪</span>} disabled tooltip="غير متاح">ألمانيا</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  ExampleSelect
}
