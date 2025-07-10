// @/components/ui/breadcrumb.tsx - The Knoux Legacy UI Breadcrumb Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide users with context and navigation cues within the application's hierarchical structure,
// guiding them through different sections like book templates, library categories, or project settings.
// Styled to seamlessly integrate with the Knoux design system, featuring premium typography, brand colors, and smooth transitions.

import * as React from "react";
import * as BreadcrumbPrimitive from "@radix-ui/react-breadcrumb";
import { Slot } from "@radix-ui/react-slot";
// Importing Knoux's preferred separator and ellipsis icons for a consistent brand look.
// Ideally, these would be from a dedicated KnouxIcons library.
// Example: import { KnouxChevronRightIcon, KnouxMoreHorizontalIcon } from "@/components/ui/KnouxIcons";
import { ChevronRight, MoreHorizontal } from "lucide-react"; // Using Lucide as a fallback, but emphasizing custom icon usage.

// Essential utility for composable class names, ensuring adherence to our strict Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Breadcrumb Components ---

/**
 * @KnouxBreadcrumb
 * The main container for the breadcrumb navigation. Establishes the semantic context.
 * Styled for subtle integration with the page layout, providing a stable navigation anchor.
 */
const KnouxBreadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    /**
     * @separator - Allows custom separator nodes, typically for brand-specific icons.
     * If not provided, it defaults to a Knoux-styled separator.
     */
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => (
  // Using semantic HTML `nav` for accessibility, and setting aria-label for clarity.
  <nav
    ref={ref}
    aria-label="breadcrumb"
    // Base Knoux styling for breadcrumbs: elegant typography and clear structure.
    className="text-lg font-serif text-slate-gray" // Primary font and color for the breadcrumb as a whole.
    {...props}
  />
));
KnouxBreadcrumb.displayName = "KnouxBreadcrumb"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbList
 * The ordered list that holds all breadcrumb items.
 * Styled for proper spacing and alignment within the Knoux design.
 */
const KnouxBreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    // Styling: Enhancing spacing between items and separators for better readability.
    // Utilizes Knoux's color palette for subtle hierarchy and premium feel.
    className={cn(
      "flex flex-wrap items-center break-words", // Core Radix styles for flexibility.
      "gap-2.5", // Generous spacing between items.
      "text-slate-gray font-sans", // Using sans-serif font for main list elements, supporting readability.
      // If specific backdrop styling is needed, it would be added here: e.g., "bg-navy-800/40 backdrop-blur-sm p-2 rounded-md"
      className
    )}
    {...props}
  />
));
KnouxBreadcrumbList.displayName = "KnouxBreadcrumbList"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbItem
 * Represents an individual item in the breadcrumb path.
 * Container for links or pages, and often includes the separator.
 */
const KnouxBreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    // Styling: Simple inline flex for alignment.
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
KnouxBreadcrumbItem.displayName = "KnouxBreadcrumbItem"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbLink
 * The clickable part of a breadcrumb item, representing a navigation step.
 * Features elegant hover states and options for `asChild` rendering.
 */
const KnouxBreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    /**
     * @asChild - Allows the link to be rendered as a different component (e.g., `Link` from `react-router-dom`).
     */
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      // Styling: Smooth transitions, hover effect using Knoux's gold accent, and clear font.
      className={cn(
        "text-slate-gray font-sans transition-colors duration-300", // Base text color and smooth transition.
        "hover:text-gold-400", // Prominent hover effect with brand gold.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900", // Knoux focus state for accessibility.
        className
      )}
      {...props}
    />
  );
});
KnouxBreadcrumbLink.displayName = "KnouxBreadcrumbLink"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbPage
 * Represents the current, active page in the breadcrumb path.
 * Clearly differentiated from links, indicating it's the final destination.
 */
const KnouxBreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    // Styling: Clearly marked as the current page, distinct from links.
    // Uses Knoux's main text color and serif font for emphasis on being the final destination.
    role="link" // Accessibility role, though non-interactive.
    aria-disabled="true" // Indicate it's not a link.
    aria-current="page" // Standard ARIA attribute for current page.
    className={cn(
      "font-serif font-semibold text-off-white", // Serif font and primary white text for emphasis.
      className
    )}
    {...props}
  />
));
KnouxBreadcrumbPage.displayName = "KnouxBreadcrumbPage"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbSeparator
 * Displays the visual separator between breadcrumb items. Defaults to Knoux's custom chevron icon.
 */
const KnouxBreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation" // Indicate it's purely decorative.
    aria-hidden="true"
    // Styling: Using a subtle grey for separators, with optional Knoux icon for enhanced branding.
    className={cn("[&>svg]:size-3.5 [&>svg]:text-slate-gray", className)} // Defaulting to grey icon, customizable via className.
    {...props}
  >
    {/* If `children` are provided, use them; otherwise, default to a Knoux-branded separator icon. */}
    {children ?? <ChevronRight className="h-4 w-4 text-slate-gray" />}
  </li>
);
KnouxBreadcrumbSeparator.displayName = "KnouxBreadcrumbSeparator"; // Explicitly branded display name.

/**
 * @KnouxBreadcrumbEllipsis
 * Represents omitted breadcrumb items, typically used for long paths.
 * Styled as a subtle visual cue.
 */
const KnouxBreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation" // Purely decorative.
    aria-hidden="true"
    // Styling: Subtle ellipsis container with Knoux's subtle grey tones.
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-md bg-navy-800/40", // Subtle backdrop for the ellipsis.
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 text-slate-gray" /> {/* Default ellipsis icon */}
    <span className="sr-only">More</span> {/* Accessibility text */}
  </span>
);
KnouxBreadcrumbEllipsis.displayName = "KnouxBreadcrumbEllipsis"; // Explicitly branded display name.

// --- Exporting Knoux Branded Breadcrumb Components ---
// Exporting all components with their standard names for compatibility,
// ensuring they are the fully customized Knoux implementations internally.
export {
  KnouxBreadcrumb as Breadcrumb,
  KnouxBreadcrumbList as BreadcrumbList,
  KnouxBreadcrumbItem as BreadcrumbItem,
  KnouxBreadcrumbLink as BreadcrumbLink,
  KnouxBreadcrumbPage as BreadcrumbPage,
  KnouxBreadcrumbSeparator as BreadcrumbSeparator,
  KnouxBreadcrumbEllipsis as BreadcrumbEllipsis,
};
