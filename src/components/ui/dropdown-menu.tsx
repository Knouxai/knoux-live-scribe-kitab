// @/components/ui/dropdown-menu.tsx - The Knoux Legacy UI Dropdown Menu Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To offer context-specific action menus, providing quick access to functionalities
// like formatting options, saving settings, exporting book sections, or contextual actions within the library.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds, subtle grays),
// and refined typography for a sophisticated and seamless user experience.

import * as React from "react";
// Importing Radix UI primitives as the base for dropdown menu functionality.
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// Importing icons. Ideally, Knoux's custom icons would be used for brand consistency.
import {
  Check,
  ChevronRight,
  Circle,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react"; // Placeholder icons for items and submenus.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Dropdown Menu Components ---

/**
 * @KnouxDropdownMenu
 * The root component that provides context for the entire dropdown menu.
 */
const KnouxDropdownMenu = DropdownMenuPrimitive.Root;
KnouxDropdownMenu.displayName = "KnouxDropdownMenu";

/**
 * @KnouxDropdownMenuTrigger
 * The element (e.g., Button, Icon) that opens the dropdown menu. Styling is applied to the trigger itself.
 */
const KnouxDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * @KnouxDropdownMenuGroup
 * Groups related menu items for better organization and visual clarity.
 */
const KnouxDropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * @KnouxDropdownMenuPortal
 * Renders menu content in a portal, ensuring proper stacking context and Z-index management.
 */
const KnouxDropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * @KnouxDropdownMenuSub
 * Provides functionality for nested sub-menus, allowing for hierarchical actions.
 */
const KnouxDropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * @KnouxDropdownMenuRadioGroup
 * Organizes items that represent choices within a radio button group.
 */
const KnouxDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * @KnouxDropdownMenuSubTrigger
 * Trigger for opening a sub-menu. Styled with Knoux's hover/focus states and an animated chevron.
 */
const KnouxDropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean; // Property to indent sub-menu triggers.
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    // Styling: Applies premium Knoux interactive item styling with elegant hover and open states.
    // Features indentation (`inset`) and a subtle animated chevron for clear state indication.
    className={cn(
      "group flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-sans font-medium outline-none",
      "text-slate-gray transition-colors duration-300", // Base text and smooth transition.
      // Interactive states applying Knoux's gold accent and subtle glass effects.
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg",
      "data-[state=open]:bg-navy-800/50 data-[state=open]:text-gold-400 data-[state=open]:backdrop-blur-lg",
      inset && "pl-9", // Indentation for nested items.
      className
    )}
    {...props}
  >
    {children} {/* Content of the trigger (e.g., "Format"). */}
    {/* Knoux styled chevron icon, animated based on state changes. */}
    <ChevronRight className="ml-auto h-4 w-4 text-slate-gray transition-colors duration-300 group-hover:text-gold-400 group-data-[state=open]:text-gold-400" />
  </DropdownMenuPrimitive.SubTrigger>
));
KnouxDropdownMenuSubTrigger.displayName = "KnouxDropdownMenuSubTrigger";

/**
 * @KnouxDropdownMenuSubContent
 * The content of a sub-menu. Styled with Glassmorphism and Knoux's distinctive color palette.
 */
const KnouxDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    // Styling: A premium container for sub-menus with smooth animations and Knoux's Glassmorphism.
    // Applies sophisticated entrance and exit animations.
    className={cn(
      "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-navy-800/50 bg-navy-800/70 p-1.5 text-sm shadow-xl backdrop-blur-lg", // Knoux Glassmorphism styling.
      "animate-in fade-in-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Entrance/exit animations.
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", // Zoom effect.
      // Positioning based on the trigger's position for seamless display.
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
KnouxDropdownMenuSubContent.displayName = "KnouxDropdownMenuSubContent";

/**
 * @KnouxDropdownMenuContent
 * The main dropdown menu container. Styled with Glassmorphism, brand colors, and refined animations.
 * Houses all menu items, checkboxes, radio buttons, labels, and separators.
 */
const KnouxDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal> {/* Ensures portal rendering for proper stacking. */}
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset} // Default offset for dropdown placement.
      // Styling: The core Knoux styled menu container with Glassmorphism and smooth animations.
      className={cn(
        "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-navy-800/50 bg-navy-800/70 p-2 text-base shadow-xl backdrop-blur-lg", // Premium Knoux styling.
        "animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Subtle entrance animation.
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", // Subtle zoom effect.
        // Positioning logic.
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
KnouxDropdownMenuContent.displayName = "KnouxDropdownMenuContent";

/**
 * @KnouxContextMenuItem
 * An individual actionable item within the dropdown menu. Styled for clear interaction and visual feedback.
 * Supports `inset` property for hierarchical display.
 */
const KnouxContextMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean; // Property for indentation.
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    // Styling: Applies Knoux's premium item styling with interactive states and distinct fonts.
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-sans font-medium outline-none",
      "text-slate-gray transition-colors duration-300", // Base text and smooth transitions.
      // Interactive states with Knoux's gold accents and glassmorphism hover.
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg",
      "data-[highlighted=true]:bg-navy-800/50 data-[highlighted=true]:text-gold-400 data-[highlighted=true]:backdrop-blur-lg", // Highlight state for active item.
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Disabled state styling.
      inset && "pl-9", // Indentation.
      className
    )}
    {...props}
  />
));
KnouxContextMenuItem.displayName = "KnouxContextMenuItem";

/**
 * @KnouxContextMenuCheckboxItem
 * A menu item representing a boolean toggle (checkbox). Includes a checkmark indicator.
 * Styled according to Knoux standards for interactive elements.
 */
const KnouxContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    // Styling: Applies Knoux's item styling with special styling for checkboxes.
    // Includes indicator positioning, brand colors for interaction states.
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm font-sans outline-none",
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg", // Hover/focus states.
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Disabled state.
      className
    )}
    checked={checked}
    {...props}
  >
    {/* Indicator container for the checkmark, styled for visibility within Knoux theme. */}
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gold-400 bg-navy-800/70 data-[state=checked]:border-gold-400 data-[state=checked]:bg-gold-400">
      <DropdownMenuPrimitive.ItemIndicator>
        {/* Knoux checkmark icon, styled to fit the checkbox. */}
        <Check className="h-3.5 w-3.5 text-navy-900" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Content of the checkbox item. */}
  </DropdownMenuPrimitive.CheckboxItem>
));
KnouxContextMenuCheckboxItem.displayName = "KnouxContextMenuCheckboxItem";

/**
 * @KnouxContextMenuRadioItem
 * A menu item representing a selection within a radio group. Includes a radio button indicator.
 * Styled similarly to checkbox items but with a distinct circular indicator.
 */
const KnouxContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    // Styling: Consistent item styling with a distinct radio button indicator.
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm font-sans outline-none",
      "focus:bg-navy-800/50 focus:text-gold-400 focus:backdrop-blur-lg", // Hover/focus states.
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Disabled state.
      className
    )}
    {...props}
  >
    {/* Indicator container for the radio button, styled for visual distinction. */}
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-full border border-gold-400 bg-navy-800/70 data-[state=checked]:border-gold-400 data-[state=checked]:bg-gold-400">
      <DropdownMenuPrimitive.ItemIndicator>
        {/* Knoux radio button inner dot, styled with brand color. */}
        <Circle className="h-2 w-2 fill-navy-900" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Content of the radio item. */}
  </DropdownMenuPrimitive.RadioItem>
));
KnouxContextMenuRadioItem.displayName = "KnouxContextMenuRadioItem";

/**
 * @KnouxContextMenuLabel
 * A label for menu item groups, providing context or section titles. Styled for clarity and hierarchy.
 */
const KnouxContextMenuLabel = React.forwardRef<
  HTMLDivElement, // Use div for label container flexibility
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean; // Property to indent labels.
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    // Styling: Clear, prominent label using Knoux's preferred serif font and primary text color.
    className={cn(
      "select-none px-2 py-1.5 text-sm font-serif font-semibold",
      "text-off-white", // Primary white text for labels.
      inset && "pl-9", // Indentation for labels.
      className
    )}
    {...props}
  />
));
KnouxContextMenuLabel.displayName = "KnouxContextMenuLabel";

/**
 * @KnouxContextMenuSeparator
 * A visual divider between menu items or groups. Styled with Knoux's subtle border palette.
 */
const KnouxContextMenuSeparator = React.forwardRef<
  HTMLDivElement, // Use div for separator container flexibility
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    // Styling: Subtle separator using Knoux's muted navy border for visual distinction without harshness.
    className={cn("mx-1.5 my-1.5 h-px bg-navy-800/50", className)} // Adjusted spacing for consistency.
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
        "ml-auto text-xs font-mono font-medium tracking-widest opacity-70", // Knoux typography for shortcuts.
        className
      )}
      {...props}
    />
  );
};
KnouxContextMenuShortcut.displayName = "KnouxContextMenuShortcut";

// --- Exporting Knoux Branded Context Menu Components ---
// Exporting all components with standard names for broader compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  KnouxDropdownMenu as DropdownMenu, // Exporting the custom context menu.
  KnouxDropdownMenuTrigger as DropdownMenuTrigger,
  KnouxDropdownMenuContent as DropdownMenuContent,
  KnouxContextMenuItem as ContextMenuItem,
  KnouxContextMenuCheckboxItem as ContextMenuCheckboxItem,
  KnouxContextMenuRadioItem as ContextMenuRadioItem,
  KnouxContextMenuLabel as ContextMenuLabel,
  KnouxContextMenuSeparator as ContextMenuSeparator,
  KnouxContextMenuShortcut as ContextMenuShortcut,
  KnouxDropdownMenuGroup as DropdownMenuGroup,
  KnouxDropdownMenuPortal as DropdownMenuPortal,
  KnouxDropdownMenuSub as DropdownMenuSub,
  KnouxDropdownMenuSubContent as DropdownMenuSubContent,
  KnouxDropdownMenuSubTrigger as DropdownMenuSubTrigger,
  KnouxDropdownMenuRadioGroup as DropdownMenuRadioGroup,
};
