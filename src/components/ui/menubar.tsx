import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle, LogOut, Settings, FileText, Edit2, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // إذا كنت تستخدم React Router
import { Tooltip } from "@radix-ui/react-tooltip"; // أو أي مكتبة Tooltip

// ---------------------- المكونات الأساسية (Core Components) ------------------------

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-12 items-center space-x-1 rounded-lg border bg-background p-1 shadow-md",
      className
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, children, icon, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded px-4 py-2 text-base font-semibold outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent/50 transition",
      className
    )}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </MenubarPrimitive.Trigger>
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
    icon?: React.ReactNode;
  }
>(({ className, inset, children, icon, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded px-4 py-2 text-base outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent/50",
      inset && "pl-10",
      className
    )}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = "MenubarSubTrigger";

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[10rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg animate-in",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = "MenubarSubContent";

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[14rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-2xl animate-in",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    icon?: React.ReactNode;
    as?: "a" | "link" | "button";
    to?: string;
    tooltip?: string;
    shortcut?: string;
    disabled?: boolean;
  }
>(({ className, inset, children, icon, as, to, tooltip, shortcut, disabled, ...props }, ref) => {
  const content = (
    <span className="flex items-center w-full">
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
    </span>
  );
  let item =
    as === "a" && to ? (
      <a href={to} className="w-full h-full" tabIndex={-1}>{content}</a>
    ) : as === "link" && to ? (
      <Link to={to} className="w-full h-full">{content}</Link>
    ) : (
      content
    );
  item = tooltip ? (
    <Tooltip content={tooltip}>
      <span>{item}</span>
    </Tooltip>
  ) : item;
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded px-4 py-2 text-base outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent/50 disabled:opacity-40",
        inset && "pl-10",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {item}
    </MenubarPrimitive.Item>
  );
});
MenubarItem.displayName = "MenubarItem";

// دعم العناصر القابلة للاختيار (Checkbox وRadio)
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> & { tooltip?: string }
>(({ className, children, checked, tooltip, ...props }, ref) => {
  const content = (
    <>
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </>
  );
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded py-2 pl-10 pr-4 text-base outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent/50",
        className
      )}
      checked={checked}
      {...props}
    >
      {tooltip ? <Tooltip content={tooltip}>{content}</Tooltip> : content}
    </MenubarPrimitive.CheckboxItem>
  );
});
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> & { tooltip?: string }
>(({ className, children, tooltip, ...props }, ref) => {
  const content = (
    <>
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-3 w-3 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </>
  );
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded py-2 pl-10 pr-4 text-base outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent/50",
        className
      )}
      {...props}
    >
      {tooltip ? <Tooltip content={tooltip}>{content}</Tooltip> : content}
    </MenubarPrimitive.RadioItem>
  );
});
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-4 py-2 text-base font-bold text-accent-foreground",
      inset && "pl-10",
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground font-mono",
      className
    )}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";

// ---------------------- مثال واقعي: قائمة ديناميكية (Dynamic Example) ----------------------

const menuData = [
  {
    title: "الملف",
    icon: <FileText />,
    items: [
      { label: "جديد", icon: <FileText />, shortcut: "Ctrl+N", onClick: () => alert("جديد") },
      { label: "فتح...", icon: <FileText />, shortcut: "Ctrl+O", onClick: () => alert("فتح") },
      { label: "حفظ", icon: <FileText />, shortcut: "Ctrl+S", disabled: true },
      { type: "separator" },
      { label: "إعدادات", icon: <Settings />, as: "link", to: "/settings", tooltip: "إعدادات التطبيق" },
      { type: "separator" },
      { label: "خروج", icon: <LogOut />, shortcut: "Alt+F4", onClick: () => alert("خروج") },
    ],
  },
  {
    title: "تعديل",
    icon: <Edit2 />,
    items: [
      { label: "تراجع", shortcut: "Ctrl+Z", onClick: () => alert("تراجع") },
      { label: "إعادة", shortcut: "Ctrl+Y", onClick: () => alert("إعادة") },
      { label: "قص", shortcut: "Ctrl+X", onClick: () => alert("قص") },
      { label: "نسخ", shortcut: "Ctrl+C", onClick: () => alert("نسخ") },
      { label: "لصق", shortcut: "Ctrl+V", onClick: () => alert("لصق") },
    ],
  },
  {
    title: "المستخدم",
    icon: <User />,
    items: [
      { label: "الملف الشخصي", icon: <User />, as: "link", to: "/profile" },
      {
        label: "اللغة",
        icon: <Globe />,
        submenu: [
          { label: "العربية", value: "ar", checked: true },
          { label: "English", value: "en" },
          { label: "Français", value: "fr" },
        ],
      },
    ],
  },
];

// ---------------------- مكون القائمة الكاملة (Full Menubar Example) ----------------------

export function AppMenubar() {
  const [language, setLanguage] = React.useState("ar");
  return (
    <Menubar>
      {menuData.map((menu) => (
        <MenubarMenu key={menu.title}>
          <MenubarTrigger icon={menu.icon}>{menu.title}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, idx) =>
              item.type === "separator" ? (
                <MenubarSeparator key={idx} />
              ) : item.submenu ? (
                <MenubarSub key={item.label}>
                  <MenubarSubTrigger icon={item.icon || <Globe />}>
                    {item.label}
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarRadioGroup
                      value={language}
                      onValueChange={setLanguage}
                    >
                      {item.submenu.map((sub) => (
                        <MenubarRadioItem
                          key={sub.value}
                          value={sub.value}
                          checked={language === sub.value}
                          onClick={() => setLanguage(sub.value)}
                        >
                          {sub.label}
                        </MenubarRadioItem>
                      ))}
                    </MenubarRadioGroup>
                  </MenubarSubContent>
                </MenubarSub>
              ) : (
                <MenubarItem
                  key={item.label}
                  icon={item.icon}
                  as={item.as}
                  to={item.to}
                  tooltip={item.tooltip}
                  shortcut={item.shortcut}
                  disabled={item.disabled}
                  onClick={item.onClick}
                >
                  {item.label}
                </MenubarItem>
              )
            )}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}

// ---------------------- التصدير ----------------------

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
  AppMenubar, // مكون مثال كامل
};

/* ---------------------- شرح سريع ----------------------
- AppMenubar: مكون عملي وجاهز يعرض شريط قوائم ديناميكي بمميزات متقدمة.
- يمكن تعديل menuData لإضافة أو إزالة عناصر أو تغيير الترتيب أو المحتوى.
- يدعم أيقونات، اختصارات، روابط، عناصر فرعية، حالات تفعيل وتعطيل، وتغيير اللغة.
- تم تصحيح اسم displayName.
- يدعم Tooltips وروابط React Router.
- يدعم الديناميكية والتخصيص الكامل.
------------------------------------------------------- */
