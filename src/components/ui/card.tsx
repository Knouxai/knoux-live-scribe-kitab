// @/components/ui/card.tsx - The Knoux Legacy UI Card Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To visually contain and present distinct sections of content, such as book templates,
// author profiles, user settings, or interactive features within the application.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds, subtle grays),
// and refined typography to create a sophisticated and cohesive user experience.

import * as React from "react";

// Importing the essential cn utility from the Knoux library for composable class names,
// ensuring all styling adheres strictly to the Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Card Components ---

/**
 * @KnouxCard
 * The root container component for a card. It establishes the foundational styling,
 * including Glassmorphism effect, subtle border, brand color background, and shadow.
 * Essential for grouping related content sections, providing visual separation and hierarchy.
 */
const KnouxCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: Applying Knoux's core card aesthetics.
    // Soft glass effect for the background, a subtle border to define edges,
    // rounded corners with a generous radius, and a premium shadow.
    className={cn(
      "rounded-3xl border border-navy-800/50 bg-navy-800/50 p-5 backdrop-blur-lg shadow-xl shadow-navy-900/60",
      className
    )}
    {...props}
  />
));
KnouxCard.displayName = "KnouxCard"; // Explicitly branded display name.

/**
 * @KnouxCardHeader
 * Container for the card's title and description. Styled to create clear visual hierarchy within the card.
 * Offers generous padding to allow content breathing room.
 */
const KnouxCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: Adjusting padding for a balanced look within the card's overall structure.
    className={cn("flex flex-col space-y-2 p-5 pb-0", className)}
    {...props}
  />
));
KnouxCardHeader.displayName = "KnouxCardHeader"; // Explicitly branded display name.

/**
 * @KnouxCardTitle
 * The title of the card. Uses Knoux's premium serif font and prominent text color for impact.
 * Clearly delineates the main topic of the card section.
 */
const KnouxCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    // Styling: Using Knoux's preferred serif font, elevated size, bold weight, and gold color for emphasis.
    className={cn(
      "text-2xl font-serif font-semibold leading-none tracking-tight",
      "text-gold-400", // Primary accent color for titles.
      className
    )}
    {...props}
  />
));
KnouxCardTitle.displayName = "KnouxCardTitle"; // Explicitly branded display name.

/**
 * @KnouxCardDescription
 * Provides supporting details for the card title. Uses Knoux's readable sans-serif font and secondary text color.
 * Ensures clarity without overpowering the title or content.
 */
const KnouxCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    // Styling: Utilizes the sans-serif font and Knoux's secondary text color for subtle yet clear description.
    className={cn("text-base font-sans text-slate-gray", className)}
    {...props}
  />
));
KnouxCardDescription.displayName = "KnouxCardDescription"; // Explicitly branded display name.

/**
 * @KnouxCardContent
 * The main body of the card where most content resides. Optimized for readability with appropriate padding.
 */
const KnouxCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // Styling: Padding applied to content for visual separation from headers/footers and card edges.
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
KnouxCardContent.displayName = "KnouxCardContent"; // Explicitly branded display name.

/**
 * @KnouxCardFooter
 * Contains actions or supporting information at the bottom of the card.
 * Styled for alignment and visual coherence with the rest of the card elements.
 */
const KnouxCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: Padding consistent with other sections, with alignment for actions or meta-info.
    className={cn("flex items-center p-5 pt-0", className)}
    {...props}
  />
));
KnouxCardFooter.displayName = "KnouxCardFooter"; // Explicitly branded display name.

// --- Exporting Knoux Branded Card Components ---
// Exporting all components with standard names for compatibility,
// but these are the fully customized Knoux implementations, intrinsically tied to the project's aesthetic.
export {
  KnouxCard as Card,
  KnouxCardHeader as CardHeader,
  KnouxCardFooter as CardFooter,
  KnouxCardTitle as CardTitle,
  KnouxCardDescription as CardDescription,
  KnouxCardContent as CardContent,
};
