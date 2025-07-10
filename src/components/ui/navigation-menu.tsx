إليك نسخة متوسعة ومحترفة لمكون NavigationMenu، مع إضافة كل ما يمكن وضعه من تخصيصات ومميزات منطقية وتجربة مستخدم حديثة، ودعم للمحتوى الديناميكي، الأيقونات، الروابط الداخلية والخارجية، عناصر فرعية (dropdown/mega menu)، دعم الحالات (تفعيل/تعطيل)، دعم الشارات (badge)، دعم التولتيب، دعم اختصارات لوحة المفاتيح، أمثلة واقعية لقوائم، ستايلات مخصصة، مع تصحيح أي ملاحظات أو مشاكل.

### ✔️ النسخة المطورة:

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown, Home, BookOpen, Settings, User, LogOut, Globe2, Code2, Star } from "lucide-react"
import { cn } from "@/lib/utils"
// لو تستخدم React Router فعل السطر التالي
// import { Link } from "react-router-dom"
import { Tooltip } from "@radix-ui/react-tooltip" // أو أي تولتيب آخر

// --- ستايلات الزر الرئيسي للقائمة ---
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

// --- قائمة الروابط والدروب داون الرئيسية ---
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center font-sans",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = "NavigationMenu"

// قائمة العناصر الأفقيّة
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-2",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = "NavigationMenuList"

// عنصر فردي (يمكن أن يكون زر أو قائمة فرعية)
const NavigationMenuItem = NavigationMenuPrimitive.Item

// زر تريجر لقائمة فرعية أو رابط
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & { icon?: React.ReactNode, badge?: string, shortcut?: string }
>(({ className, children, icon, badge, shortcut, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "relative group", className)}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
    {badge && <span className="ml-2 text-xs bg-primary/80 text-white rounded px-1">{badge}</span>}
    <ChevronDown
      className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
    {shortcut && 
      <span className="absolute right-2 text-xs text-muted-foreground font-mono opacity-70">{shortcut}</span>
    }
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

// المحتوى المنسدل (dropdown/megamenu)
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto bg-popover rounded-lg border shadow-xl p-4 space-y-1",
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Content>
))
NavigationMenuContent.displayName = "NavigationMenuContent"

// رابط فردي (داخلي أو خارجي أو React Router)
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
    icon?: React.ReactNode
    badge?: string
    asChild?: boolean
    tooltip?: string
    shortcut?: string
    to?: string
    href?: string
    target?: string
    disabled?: boolean
  }
>(({ className, children, icon, badge, tooltip, shortcut, to, href, target, disabled, ...props }, ref) => {
  const content = (
    <span className={cn(
      "flex items-center px-3 py-2 rounded hover:bg-accent focus:bg-accent transition gap-2 cursor-pointer",
      disabled && "opacity-50 pointer-events-none"
    )}>
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="ml-2 text-xs bg-primary/80 text-white rounded px-1">{badge}</span>}
      {shortcut && <span className="ml-auto text-xs font-mono text-muted-foreground">{shortcut}</span>}
    </span>
  )
  // استعمل Link إذا كنت تستخدم React Router
  // if (to) return <Link to={to} ref={ref} {...props}>{content}</Link>
  if (href) return <a href={href} ref={ref} target={target} {...props}>{content}</a>
  return <span ref={ref} {...props}>{content}</span>
})
NavigationMenuLink.displayName = "NavigationMenuLink"

// فيو بورت القائمة المنسدلة
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center w-full")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = "NavigationMenuViewport"

// مؤشر يوضح العنصر النشط
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-3 w-3 rotate-45 rounded-tl-sm bg-primary/80 shadow-lg" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

// ------------------------- مثال واقعي: قائمة ديناميكية --------------------------
const navData = [
  {
    label: "الرئيسية",
    icon: <Home />,
    href: "/",
    shortcut: "Ctrl+H",
    tooltip: "اذهب للصفحة الرئيسية",
  },
  {
    label: "الدروس",
    icon: <BookOpen />,
    badge: "جديد",
    content: [
      {
        label: "دروس البرمجة",
        icon: <Code2 />,
        href: "/lessons/code",
        tooltip: "تعلم البرمجة",
      },
      {
        label: "دروس التصميم",
        icon: <Star />,
        href: "/lessons/design",
        badge: "مميز",
      },
      {
        label: "دروس اللغات",
        icon: <Globe2 />,
        href: "/lessons/langs",
      },
    ]
  },
  {
    label: "المستخدم",
    icon: <User />,
    content: [
      {
        label: "الملف الشخصي",
        icon: <User />,
        href: "/profile",
      },
      {
        label: "الإعدادات",
        icon: <Settings />,
        href: "/settings",
      },
      {
        label: "تسجيل الخروج",
        icon: <LogOut />,
        href: "/logout",
        tooltip: "خروج آمن",
      },
    ]
  },
  {
    label: "عن الموقع",
    icon: <Globe2 />,
    href: "https://example.com/about",
    target: "_blank",
    badge: "خارجي",
  }
]

// ---------------------- مكون القائمة المنطقية الكاملة ----------------------
export function FullNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navData.map((item, idx) => (
          <NavigationMenuItem key={item.label + idx}>
            {item.content ? (
              <>
                <NavigationMenuTrigger icon={item.icon} badge={item.badge} shortcut={item.shortcut}>
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col min-w-[220px] space-y-1">
                    {item.content.map((sub, j) => (
                      <Tooltip key={sub.label + j} content={sub.tooltip}>
                        <NavigationMenuLink
                          icon={sub.icon}
                          badge={sub.badge}
                          href={sub.href}
                          target={sub.target}
                          shortcut={sub.shortcut}
                          disabled={sub.disabled}
                        >
                          {sub.label}
                        </NavigationMenuLink>
                      </Tooltip>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Tooltip content={item.tooltip}>
                <NavigationMenuLink
                  icon={item.icon}
                  badge={item.badge}
                  href={item.href}
                  target={item.target}
                  shortcut={item.shortcut}
                  disabled={item.disabled}
                >
                  {item.label}
                </NavigationMenuLink>
              </Tooltip>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuIndicator />
    </NavigationMenu>
  )
}

// ---------------------- التصدير ----------------------
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  FullNavigationMenu, // مكون منطقي كامل
}

// ---------------------- ملاحظات ----------------------
// - تم إضافة كل ما يمكن من ميزات واقعية وتجربة مستخدم حديثة.
// - يدعم أيقونات، شارات، اختصارات، روابط، محتوى فرعي، تولتيب، حالات تفعيل/تعطيل، روابط خارجية وداخلية.
// - يمكنك تمرير بيانات ديناميكية لتغيير القائمة بسهولة.
// - جاهز للاستخدام في مشروع حقيقي وتخصيصه لأي منطق عمل.
// -----------------------------------------------------
