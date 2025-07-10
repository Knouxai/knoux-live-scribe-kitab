// @/components/ui/badge.tsx - The Knoux Legacy UI Badge Component
// Exclusively crafted for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To visually categorize content, indicate status (e.g., "Draft", "AI-Generated"),
// or highlight key attributes within the application's interface.
// Styled to embody Knoux's premium aesthetic, using glassmorphism elements and the brand's distinctive color palette.

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// Assuming `cn` is imported from a global utility file as per other components.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Badge Variants Definition ---
// These variants are designed to seamlessly integrate with the Knoux design system,
// providing visual cues for different types of badges used within the application.
const knouxBadgeVariants = cva(
  // Base styles for all badges: Applying glassmorphism effect, refined padding, subtle border, and Knoux-specific font styles.
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300 backdrop-blur-sm shadow-sm",
  {
    variants: {
      // Primary Badge: Used for core statuses or prominent tags like 'Featured', 'New'.
      variant: {
        default:
          "border-gold-400/30 bg-navy-800/70 text-gold-400 backdrop-blur-sm hover:bg-navy-800/90", // Primary premium feel with gold accents.
        // Secondary Badge: For less critical or secondary information.
        secondary:
          "border-slate-gray/40 bg-navy-800/50 text-slate-gray hover:bg-navy-800/70", // Softer, more subtle look.
        // Destructive/Warning Badge: For alerts or critical notifications, re-imagined with premium gold for urgency.
        destructive:
          "border-gold-400/50 bg-gold-400/10 text-gold-400 hover:bg-gold-400/20", // Using gold as a warning, less harsh.
        // Outline Badge: For neutral tags, possibly status indicators like 'Draft' or 'Published'.
        outline:
          "border-navy-800/50 bg-transparent text-slate-gray hover:bg-navy-800/40", // Clear, text-focused badge with a subtle border.
        // Info Badge: For informational tips or suggestions.
        info:
          "border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20", // Gentle blue for informational cues.
        // Success Badge: For confirmation of successful operations.
        success:
          "border-green-500/40 bg-green-500/10 text-green-300 hover:bg-green-500/20", // Gentle green for positive reinforcement.
      },
      // Size variants for flexibility (e.g., small tag vs. larger status indicator).
      size: {
        default: "px-3 py-1 text-xs", // Standard size for tags.
        large: "px-4 py-1.5 text-sm", // Larger for more significant status indicators.
      },
    },
    defaultVariants: {
      variant: "default", // Default to the primary premium badge style.
      size: "default",
    },
  }
);

// --- Knoux-Branded Badge Props Interface ---
// Defining the props for our custom Badge component, inheriting from VariantProps and standard HTML attributes.
export interface KnouxBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof knouxBadgeVariants> {}

// --- Knoux-Branded Badge Component Implementation ---

/**
 * @KnouxBadge
 * The primary component for displaying badges within Knoux BookSmith Ultra™.
 * This component is designed to be versatile, visually appealing, and contextually relevant
 * for highlighting content statuses, categories, or special attributes of books and features.
 *
 * Usage examples:
 * - Tagging a book template as 'New' or 'Featured' (variant: default).
 * - Indicating a chapter status as 'Draft' (variant: outline).
 * - Marking an AI-generated section (variant: destructive/gold or info).
 * - Categorizing books by genre (variant: secondary/info/success depending on genre).
 */
const KnouxBadge = React.forwardRef<HTMLDivElement, KnouxBadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    // Merging custom Knoux badge variants with any additional user-provided classes.
    return (
      <div
        ref={ref}
        // Applying the custom Knoux variants and any provided className.
        className={cn(knouxBadgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
KnouxBadge.displayName = "KnouxBadge"; // Explicitly branding the component's display name.

// --- Exporting Knoux-Branded Badge Components ---
// Exporting the component and its variants with standard names for compatibility,
// while internally ensuring they are the fully customized Knoux implementations.
export {
  KnouxBadge as Badge, // Exporting the custom badge as 'Badge'.
  knouxBadgeVariants as badgeVariants, // Exporting the variant function under the standard name.
};
