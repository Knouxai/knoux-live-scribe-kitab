// @/components/ui/command.tsx - The Knoux Legacy UI Command Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide a powerful, customizable command palette and search interface,
// enabling users to quickly access features, templates, books, or specific functions
// within the application with a sleek, modern, and highly responsive UI.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a seamless and efficient user experience.

import * as React from "react";
// Importing Radix UI primitives as the base for command and dialog functionalities.
import * as CommandPrimitive from "cmdk";
// Importing icons. Ideally, Knoux's custom icons would be used here for brand consistency.
import { Search, ChevronRight, MoreHorizontal, X } from "lucide-react"; // Placeholder icons.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";
// Importing Knoux's custom Dialog and Button variants to integrate command palette styling seamlessly.
import { KnouxDialog, KnouxDialogContent } from "@/components/ui/dialog"; // Assuming custom dialog components.
import { knouxButtonVariants } from "@/components/ui/button"; // Importing custom button styles.

// --- Knoux-Branded Command Components ---

/**
 * @KnouxCommand
 * The root component for the command palette. It wraps the `cmdk` primitive
 * and applies Knoux's global styling for this component, including Glassmorphism effects.
 */
const KnouxCommand = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Root>, // Type correctly as CommandPrimitive.Root
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Root
    ref={ref}
    // Styling: Base styles for the command palette container, creating a Glassmorphic popover effect.
    className={cn(
      // Knoux's signature glass card styling.
      "flex h-full w-full flex-col overflow-hidden rounded-3xl border border-navy-800/50 bg-navy-800/60 p-4 backdrop-blur-lg shadow-2xl shadow-navy-900/70 text-off-white",
      // Specific overrides for cmdk elements within Knoux context.
      "[&_[cmdk-input-wrapper]_svg]:text-slate-gray [&_[cmdk-input-wrapper]_svg]:opacity-70 [&_[cmdk-input]]:text-off-white",
      "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-gray", // Styling for group headings.
      "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-2", // Spacing between groups.
      "[&_[cmdk-group]]:px-1", // Padding for command groups.
      "[&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2 [&_[cmdk-item]]:text-base [&_[cmdk-item]]:rounded-lg", // Styling for command items.
      "[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", // Sizing for icons within items.
      "[&_[cmdk-item][data-selected=true]]:bg-gold-400/30 [&_[cmdk-item][data-selected=true]]:text-gold-400", // Knoux selection highlight.
      "[&_[cmdk-separator]]:my-1 [&_[cmdk-separator]]:h-px [&_[cmdk-separator]]:bg-navy-800/50", // Knoux separator style.
      className
    )}
    {...props}
  />
));
KnouxCommand.displayName = "KnouxCommand"; // Explicitly branded display name.

// Props interface for CommandDialog, inheriting DialogProps for external control.
interface KnouxCommandDialogProps extends DialogProps {
  /**
   * @children - Content to be placed inside the command palette.
   */
  children: React.ReactNode;
}

/**
 * @KnouxCommandDialog
 * Wraps the command palette within a dialog. This component manages the dialog's
 * presentation, using Knoux's custom Dialog and DialogContent styling.
 * Ideal for feature search, global shortcuts, or command menus.
 */
const KnouxCommandDialog = ({ children, ...props }: KnouxCommandDialogProps) => {
  return (
    <KnouxDialog {...props}> {/* Using the custom Knoux Dialog. */}
      {/* Applying specific Knoux styling to the dialog content for a seamless fit. */}
      <KnouxDialogContent className="overflow-hidden p-0 shadow-2xl shadow-navy-900/70" /* Premium shadow */ >
        {/* Nesting the core command component with enhanced accessibility and styling overrides. */}
        <KnouxCommand>
          {children}
        </KnouxCommand>
      </KnouxDialogContent>
    </KnouxDialog>
  );
};
KnouxCommandDialog.displayName = "KnouxCommandDialog"; // Explicitly branded display name.

/**
 * @KnouxCommandInput
 * Input field for the command palette. Integrates search icon and is styled
 * according to Knoux's input field guidelines (Glassmorphism, brand colors).
 */
const KnouxCommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  // Wrapper div for input, including search icon and border, with Knoux styling.
  <div
    cmdk-input-wrapper="" // Internal attribute for cmdk styling.
    // Knoux input wrapper styling: Glassmorphism background, border, and Knoux font.
    className={cn(
      "flex h-14 items-center gap-2.5 rounded-lg border border-navy-800/50 bg-navy-800/50 px-4 py-3 shadow-sm backdrop-blur-md",
      className // Allow additional class overrides.
    )}
  >
    {/* Search icon styled for prominence within the input field. */}
    <Search className="h-5 w-5 shrink-0 text-slate-gray" />
    <CommandPrimitive.Input
      ref={ref}
      // Input styling: Knoux text color, clear placeholder styling, and input size.
      className={cn(
        "flex h-12 w-full resize-none border-none bg-transparent px-0 py-3 text-base font-sans font-medium outline-none placeholder:text-slate-gray/70 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50", // Enhanced input styling.
        className
      )}
      {...props}
    />
  </div>
));
KnouxCommandInput.displayName = "KnouxCommandInput"; // Explicitly branded display name.

/**
 * @KnouxCommandList
 * Handles the scrolling and display of command items. Styled for a seamless viewing experience.
 */
const KnouxCommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    // Styling: Provides a scrollable area with smooth scrollbar integration and defined max height.
    className={cn(
      "max-h-[300px] overflow-y-auto overflow-x-hidden px-1.5 py-2", // Padding for scrollbar and content.
      className
    )}
    {...props}
  />
));
KnouxCommandList.displayName = "KnouxCommandList"; // Explicitly branded display name.

/**
 * @KnouxCommandEmpty
 * Message displayed when no results are found. Styled with appropriate text and centering.
 */
const KnouxCommandEmpty = React.forwardRef<
  HTMLDivElement, // Use div for container flexibility
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  // Styling: Centered message with Knoux's secondary text color and font.
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-lg font-sans text-slate-gray", props.className)}
    {...props}
  />
));
KnouxCommandEmpty.displayName = "KnouxCommandEmpty"; // Explicitly branded display name.

/**
 * @KnouxCommandGroup
 * Organizes command items into sections with clear headings. Styled for visual separation and hierarchy.
 */
const KnouxCommandGroup = React.forwardRef<
  HTMLDivElement, // Use div for group container flexibility
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    // Styling: Applies spacing and text styling to group headings, consistent with Knoux's premium design.
    className={cn(
      "overflow-hidden [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-gray", // Styling for the group header text.
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = "KnouxCommandGroup"; // Explicitly branded display name.

/**
 * @KnouxCommandSeparator
 * Visual separator between command groups. Styled with Knoux's subtle border palette.
 */
const KnouxCommandSeparator = React.forwardRef<
  HTMLDivElement, // Use div for separator container flexibility
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    // Styling: A subtle, translucent separator matching Knoux's border aesthetic.
    className={cn("my-1.5 h-px bg-navy-800/50", className)} // Using navy-800 border for a subtle look.
    {...props}
  />
));
CommandSeparator.displayName = "KnouxCommandSeparator"; // Explicitly branded display name.

/**
 * @KnouxCommandItem
 * Represents a single commandable item within the palette. Styled for interactivity,
 * clear display of information (text, icons), and visual feedback on selection.
 */
const KnouxCommandItem = React.forwardRef<
  HTMLDivElement, // Use div for item container flexibility
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    // Styling: Enhancing the item's appearance for user interaction.
    // Focusable and selected states use Knoux's gold accents for clarity.
    // Base styling provides spacing and maintains item integrity.
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-300", // Knoux-styled item with rounding, padding, and smooth transitions.
      // States for disabled items.
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      // Selected item styles: Prominent gold background and text.
      "data-[selected=true]:bg-gold-400/20 data-[selected=true]:text-gold-400 data-[selected=true]:font-medium", // Using semi-transparent gold for selection.
      // Hover effect for enhanced interaction.
      "hover:bg-navy-800/50 hover:text-off-white hover:backdrop-blur-sm", // Glassmorphism hover effect.
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "KnouxCommandItem"; // Explicitly branded display name.

/**
 * @KnouxCommandShortcut
 * Displays keyboard shortcuts associated with command items. Styled subtly to not distract.
 */
const KnouxCommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      // Styling: Positioned to the right, using Knoux's secondary text color and subtle styling.
      className={cn(
        "ml-auto text-xs font-mono tracking-tight text-slate-gray", // Knoux typography for shortcuts.
        className
      )}
      {...props}
    />
  );
};
KnouxCommandShortcut.displayName = "KnouxCommandShortcut"; // Explicitly branded display name.

// --- Exporting Knoux Branded Command Components ---
// Exporting all components with standard names for broad compatibility within the project,
// while ensuring they are fully customized Knoux implementations internally.
export {
  KnouxCommand as Command, // Exporting the custom command with the standard name.
  KnouxCommandDialog as CommandDialog, // Exporting the custom dialog.
  KnouxCommandInput as CommandInput, // Exporting the custom input.
  KnouxCommandList as CommandList, // Exporting the custom list.
  KnouxCommandEmpty as CommandEmpty, // Exporting the custom empty state.
  KnouxCommandGroup as CommandGroup, // Exporting the custom group.
  KnouxCommandItem as CommandItem, // Exporting the custom item.
  KnouxCommandShortcut as CommandShortcut, // Exporting the custom shortcut.
  CommandPrimitive.Separator as CommandSeparator, // Exporting separator as is or branded if needed.
};
