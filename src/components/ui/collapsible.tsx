// @/components/ui/collapsible.tsx - The Knoux Legacy UI Collapsible Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide expandable sections for content within the application's interface,
// such as toggling detailed views of book chapters, managing project settings,
// or revealing extended information in the library or user profiles.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds, subtle grays),
// and refined typography for a sophisticated and intuitive user experience.

import * as React from "react";
// Importing Radix UI primitives as the base for the collapsible functionality.
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
// Importing necessary icons, ideally from a Knoux custom icon library for brand adherence.
// Example: import { KnouxChevronDownIcon } from "@/components/ui/KnouxIcons";
import { ChevronDown } from "lucide-react"; // Placeholder for custom icon.

// Importing the essential `cn` utility for composable class names, ensuring adherence
// to the strict Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Collapsible Components ---

/**
 * @KnouxCollapsible
 * The root component that wraps the collapsible section, managing its state and structure.
 * Applied with a subtle container style to integrate it seamlessly within the Knoux UI.
 */
const KnouxCollapsible = CollapsiblePrimitive.Root;
KnouxCollapsible.displayName = "KnouxCollapsible"; // Explicitly branded display name.

/**
 * @KnouxCollapsibleTrigger
 * The button or element that toggles the collapsible section's visibility.
 * Styled for interactive feedback with Knoux's premium hover states and typography.
 * Includes an animated icon to visually indicate expansion/collapse.
 */
const KnouxCollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    // Styling: Enhancing the trigger with brand elements.
    // Using premium sans-serif font, subtle interactive background effects (glassmorphism on hover),
    // and animated icon to indicate state change.
    className={cn(
      "flex w-full items-center justify-between space-x-2 py-3 font-sans font-medium",
      "text-slate-gray transition-all duration-300", // Base text color and transition.
      // Hover states applying Knoux's gold accent and subtle blur.
      "hover:text-gold-400 hover:bg-navy-800/50 hover:backdrop-blur-lg",
      // Animated chevron icon based on state.
      "[&[data-state=open]>svg]:rotate-180",
      className // Allow additional classes.
    )}
    {...props}
  >
    {props.children} {/* Content of the trigger (e.g., Chapter Title) */}
    {/* The animated chevron icon indicating the collapsible state. */}
    <ChevronDown className="h-5 w-5 shrink-0 text-slate-gray transition-transform duration-300" />
  </CollapsiblePrimitive.CollapsibleTrigger>
));
KnouxCollapsibleTrigger.displayName = "KnouxCollapsibleTrigger"; // Explicitly branded display name.

/**
 * @KnouxCollapsibleContent
 * The content area that is revealed or hidden. Styled for optimal readability
 * and animated to appear smoothly when the trigger is activated.
 */
const KnouxCollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    // Styling: Smooth animation for expanding/collapsing content.
    // Padding is applied to ensure content has breathing room.
    className={cn(
      "overflow-hidden text-base font-sans text-slate-gray", // Knoux default text styling for content.
      "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down", // Animation for show/hide.
      className
    )}
    {...props}
  >
    {/* Container for the actual content with specific padding for better readability within the collapsible section. */}
    <div className={cn("pt-3 pb-4", className)}>{children}</div>
  </CollapsiblePrimitive.CollapsibleContent>
));
KnouxCollapsibleContent.displayName = "KnouxCollapsibleContent"; // Explicitly branded display name.

// --- Exporting Knoux Branded Collapsible Components ---
// Exporting components with standard names for broader compatibility within the project,
// ensuring that all uses implicitly leverage the deeply customized Knoux implementations.
export {
  KnouxCollapsible as Collapsible, // Exporting the custom collapsible with the standard name.
  KnouxCollapsibleTrigger as CollapsibleTrigger, // Exporting the custom trigger.
  KnouxCollapsibleContent as CollapsibleContent, // Exporting the custom content.
};
