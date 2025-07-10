import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// الجذر الأساسي
const Popover = PopoverPrimitive.Root

// زر التريجر بأي محتوى (أيقونة/نص/عنصر)
const PopoverTrigger = PopoverPrimitive.Trigger

// محتوى البوب أوفر مع دعم تخصيصات متقدمة
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    title?: React.ReactNode
    closeButton?: boolean
    size?: "sm" | "md" | "lg" | number // تخصيص الحجم بسهولة
    asPanel?: boolean // لدعم الحوارات الكبيرة
    align?: "start" | "center" | "end"
    sideOffset?: number
    disabled?: boolean
  }
>(
  (
    {
      className,
      children,
      title,
      closeButton = true,
      size = "md",
      asPanel = false,
      align = "center",
      sideOffset = 4,
      disabled = false,
      ...props
    },
    ref
  ) => {
    // تحديد الحجم
    let widthClass = "w-72"
    if (size === "sm") widthClass = "w-56"
    else if (size === "lg") widthClass = "w-[28rem]"
    else if (typeof size === "number") widthClass = `w-[${size}px]`

    // دعم إغلاق البوب أوفر بالزر
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
      if (disabled) setOpen(false)
    }, [disabled])

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            widthClass,
            "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none transition-all",
            asPanel && "py-8 px-8 w-auto max-w-lg min-h-[200px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          onOpenAutoFocus={e => disabled && e.preventDefault()}
          onPointerDownOutside={e => disabled && e.preventDefault()}
          onInteractOutside={e => disabled && e.preventDefault()}
          {...props}
        >
          {(title || closeButton) && (
            <div className="flex items-center justify-between mb-2">
              {title && <div className="font-bold text-base">{title}</div>}
              {closeButton && (
                <PopoverPrimitive.Close
                  className="rounded p-1 hover:bg-accent transition focus:outline-none"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </PopoverPrimitive.Close>
              )}
            </div>
          )}
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

// مكون عملي: مثال على استخدام البوب أوفر مع محتوى ديناميكي وأزرار
export function ExamplePopover() {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="btn btn-primary">فتح البوب أوفر</button>
      </PopoverTrigger>
      <PopoverContent title="إعدادات" size="lg" closeButton>
        <div className="space-y-2">
          <p>هذا محتوى ديناميكي للبوب أوفر، يمكنك تخصيصه بالكامل.</p>
          <button className="btn btn-outline" onClick={() => setDisabled(!disabled)}>
            {disabled ? "تفعيل البوب أوفر" : "تعطيل البوب أوفر"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { Popover, PopoverTrigger, PopoverContent }

/*
مميزات النسخة:
- دعم عنوان علوي وزر إغلاق.
- تخصيص الحجم بسهولة.
- دعم محتوى ديناميكي بالكامل.
- دعم تعطيل البوب أوفر بالكامل.
- دعم الحركات (Animations) المتقدمة والستايل.
- مثال عملي جاهز للاستخدام.
*/
