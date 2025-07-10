// @/components/ui/context-menu.tsx - The Knoux Legacy UI Context Menu Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide context-sensitive menus accessible via right-click or similar gestures,
// offering quick actions like formatting text, managing book settings, accessing AI tools,
// or performing library operations.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a seamless and powerful user interaction.

import * as React from "react";
// Importing Radix UI primitives as the base for context menu functionality.
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
// Importing icons. Ideally, Knoux's custom icons would be used for brand adherence.
import {
  Check,
  ChevronRight,
  Circle,
  MoreHorizontal,
  Search,
} from "lucide-react"; // Placeholder icons.

// Importing the essential `cn` utility for composable class names, ensuring adherence
// to the strict Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Context Menu Components ---

/**
 * @KnouxContextMenu
 * The root component that provides context for the menu. Manages menu state.
 */
const KnouxContextMenu = ContextMenuPrimitive.Root;
KnouxContextMenu.displayName = "KnouxContextMenu";

/**
 * @KnouxContextMenuTrigger
 * The element that triggers the context menu (e.g., right-clicking on a book item).
 * Styling will be applied to the element triggering the menu, not this primitive directly.
 */
const KnouxContextMenuTrigger = ContextMenuPrimitive.Trigger;

/**
 * @KnouxContextMenuGroup
 * Groups related menu items for better organization and visual clarity.
 */
const KnouxContextMenuGroup = ContextMenuPrimitive.Group;

/**
 * @KnouxContextMenuPortal
 * Renders menu content in a portal, ensuring proper stacking context and Z-index.
 */
const KnouxContextMenuPortal = ContextMenuPrimitive.Portal;

/**
 * @KnouxContextMenuSub
 * Provides functionality for nested sub-menus.
 */
const KnouxContextMenuSub = ContextMenuPrimitive.Sub;

/**
 * @KnouxContextMenuRadioGroup
 * Organizes items that represent choices within a radio group.
 */
const KnouxContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/**
 * @KnouxContextMenuSubTrigger
 * Trigger for opening a sub-menu. Features interactive feedback and a chevron icon.
 * Styled with Knoux's hover and focus states.
 */
const KnouxContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean; // Property to indicate indentation for sub-menu items.
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    // Styling: Applies premium Knoux styling for interactive elements.
    // Features indented options (`inset`), clear text with gold hover states, and animated chevron.
    className={cn(
      "group flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm font-sans font-medium outline-none",
      "text-slate-gray transition-colors duration-300", // Base text and transitions.
      // Interactive states with subtle Glassmorphism effects and gold accents.
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg",
      "data-[state=open]:bg-navy-800/50 data-[state=open]:text-gold-400 data-[state=open]:backdrop-blur-lg", // Open state styling.
      inset && "pl-8", // Indentation for inset items.
      className
    )}
    {...props}
  >
    {children} {/* Content of the trigger. */}
    {/* Knoux-styled chevron icon, animated based on state. */}
    <ChevronRight className="ml-auto h-4 w-4 text-slate-gray transition-colors duration-300 group-hover:text-gold-400 group-data-[state=open]:text-gold-400" />
  </ContextMenuPrimitive.SubTrigger>
));
KnouxContextMenuSubTrigger.displayName = "KnouxContextMenuSubTrigger";

/**
 * @KnouxContextMenuSubContent
 * The content of a sub-menu. Styled with Glassmorphism and Knoux's color palette.
 */
const KnouxContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    // Styling: A premium, blurred container for the sub-menu, matching the main menu's aesthetic.
    className={cn(
      "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-navy-800/50 bg-navy-800/70 p-1.5 text-sm shadow-xl backdrop-blur-lg", // Enhanced glassmorphism styling.
      "animate-in fade-in-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Subtle animation.
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", // Zoom effect.
      // Positioning logic based on where the sub-menu appears relative to its parent.
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
KnouxContextMenuSubContent.displayName = "KnouxContextMenuSubContent";

/**
 * @KnouxContextMenuContent
 * The main menu container. Styled with Glassmorphism, brand colors, and refined animations.
 * This is where users find actions contextually relevant to the clicked element.
 */
const KnouxContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal> {/* Ensures portal for correct layering. */}
    <ContextMenuPrimitive.Content
      ref={ref}
      // Styling: Applies the core Knoux Glassmorphism card style for the main menu.
      // Includes all standard animations for a smooth user experience.
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-navy-800/50 bg-navy-800/70 p-2 text-base shadow-2xl backdrop-blur-lg", // Premium Glassmorphism styling.
        "animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Subtle fade animation.
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", // Subtle zoom animation.
        // Positioning adjustments based on cursor/trigger position.
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
KnouxContextMenuContent.displayName = "KnouxContextMenuContent";

/**
 * @KnouxContextMenuItem
 * An individual actionable item within the context menu. Styled for clarity, interaction, and Knoux branding.
 * Features custom icons and `inset` property for hierarchical menus.
 */
const KnouxContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean; // Property to indent items (e.g., next to a submenu trigger).
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    // Styling: Combines premium item styling with clear feedback on selection or disabled state.
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-1.5 text-sm outline-none transition-colors duration-300", // Knoux item styling: rounded, spaced, and with smooth transitions.
      // Hover and focus states using brand colors and glass effects.
      "text-slate-gray hover:bg-navy-800/50 hover:text-gold-400 hover:backdrop-blur-lg",
      // Apply indentation if `inset` prop is true.
      inset && "pl-9",
      // Styling for disabled items.
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = "KnouxContextMenuItem";

/**
 * @KnouxContextMenuCheckboxItem
 * A menu item representing a boolean toggle (checkbox). Includes a checkmark indicator.
 * Styled according to Knoux standards for interactive elements.
 */
const KnouxContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    // Styling: Incorporates Knoux's item styling and specific styling for checkboxes.
    // Includes positioning for the indicator checkmark and clear feedback states.
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-9 pr-2 text-sm font-sans outline-none", // Knoux item styling with indentation and font.
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg", // Hover/focus styling.
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Disabled state.
      className
    )}
    checked={checked}
    {...props}
  >
    {/* Indicator container for the checkmark, styled for visibility. */}
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gold-400 bg-navy-800/70 text-navy-900 backdrop-blur-sm data-[state=checked]:bg-gold-400">
      <ContextMenuPrimitive.ItemIndicator>
        {/* Knoux checkmark icon, styled to fit the checkbox. */}
        <Check className="h-3.5 w-3.5 text-navy-900" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Content of the checkbox item. */}
  </ContextMenuPrimitive.CheckboxItem>
));
KnouxContextMenuCheckboxItem.displayName = "KnouxContextMenuCheckboxItem";

/**
 * @KnouxContextMenuRadioItem
 * A menu item representing a choice within a radio group. Includes a radio button indicator.
 * Styled similarly to checkbox items but with a distinct circular indicator.
 */
const KnouxContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    // Styling: Consistent item styling with a specific radio button indicator.
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm font-sans outline-none", // Knoux item styling with indentation.
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg", // Hover/focus styling.
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Disabled state.
      className
    )}
    {...props}
  >
    {/* Indicator container for the radio button, styled for visual distinction. */}
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-full border border-gold-400 bg-navy-800/70 data-[state=checked]:border-gold-400 data-[state=checked]:bg-gold-400">
      <ContextMenuPrimitive.ItemIndicator>
        {/* Radio button inner dot, styled with brand color. */}
        <Circle className="h-2 w-2 fill-navy-900" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Content of the radio item. */}
  </ContextMenuPrimitive.RadioItem>
));
KnouxContextMenuRadioItem.displayName = "KnouxContextMenuRadioItem";

/**
 * @KnouxContextMenuLabel
 * A label for a group of menu items, providing context or section title.
 * Styled for clarity and hierarchy.
 */
const KnouxContextMenuLabel = React.forwardRef<
  HTMLDivElement, // Use div for label container flexibility
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean; // Property to indicate indentation for labels.
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    // Styling: Clear, bold label using Knoux's premium serif font and primary text color.
    className={cn(
      "select-none px-2 py-1.5 text-sm font-serif font-semibold",
      "text-off-white", // Primary white text for labels.
      inset && "pl-9", // Indentation for inset labels.
      className
    )}
    {...props}
  />
));
KnouxContextMenuLabel.displayName = "KnouxContextMenuLabel";

/**
 * @KnouxContextMenuSeparator
 * Visual divider between menu items or groups. Styled with Knoux's subtle border palette.
 */
const KnouxContextMenuSeparator = React.forwardRef<
  HTMLDivElement, // Use div for separator container flexibility
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    // Styling: A subtle separator using Knoux's muted navy border for visual separation without harsh lines.
    className={cn("mx-1.5 my-1 h-px bg-navy-800/50", className)}
    {...props}
  />
));
KnouxContextMenuSeparator.displayName = "KnouxContextMenuSeparator";

/**
 * @KnouxContextMenuShortcut
 * Displays keyboard shortcuts associated with menu items. Styled subtly to complement, not distract.
 */
const KnouxContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      // Styling: Positioned to the right, using Knoux's secondary text color and mono font for precision.
      className={cn(
        "ml-auto text-xs font-mono font-medium tracking-widest opacity-70", // Knoux font styling for shortcuts.
        className
      )}
      {...props}
    />
  );
};
KnouxContextMenuShortcut.displayName = "KnouxContextMenuShortcut";

// --- Exporting Knoux Branded Context Menu Components ---
// Exporting all components with standard names for broader compatibility within the project,
// ensuring they are the fully customized Knoux implementations internally.
export {
  KnouxContextMenu as ContextMenu, // Exporting the custom context menu.
  KnouxContextMenuTrigger as ContextMenuTrigger,
  KnouxContextMenuContent as ContextMenuContent,
  KnouxContextMenuItem as ContextMenuItem,
  KnouxContextMenuCheckboxItem as ContextMenuCheckboxItem,
  KnouxContextMenuRadioItem as ContextMenuRadioItem,
  KnouxContextMenuLabel as ContextMenuLabel,
  KnouxContextMenuSeparator as ContextMenuSeparator,
  KnouxContextMenuShortcut as ContextMenuShortcut,
  KnouxContextMenuGroup as ContextMenuGroup,
  KnouxContextMenuPortal as ContextMenuPortal,
  KnouxContextMenuSub as ContextMenuSub,
  KnouxContextMenuSubContent as ContextMenuSubContent,
  KnouxContextMenuSubTrigger as ContextMenuSubTrigger,
  KnouxContextMenuRadioGroup as ContextMenuRadioGroup,
};
