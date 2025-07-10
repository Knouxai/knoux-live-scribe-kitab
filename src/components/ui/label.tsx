// @/components/ui/label.tsx - The Knoux Legacy UI Label Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide clear, accessible, and beautifully styled labels for form elements,
// options, or interactive components. Labels are critical for user guidance and usability,
// and thus, must adhere to Knoux's premium design standards for clarity, hierarchy, and aesthetic appeal.
// Styled to embody Knoux's premium aesthetic, leveraging its characteristic color palette
// (deep navy blues, luxurious golds, subtle grays), and refined typography for a seamless experience.

import * as React from "react";
// Importing Radix UI primitives as the base for label functionality.
import * as LabelPrimitive from "@radix-ui/react-label";
// Importing Slot for potential advanced usage, though standard label usage is primary.
import { Slot } from "@radix-ui/react-slot";

// Importing the essential `cn` utility for composable class names, ensuring adherence
// to the strict Knoux Tailwind theme and design system.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Label Variants Definition ---
// Defining base variants and styles for labels according to Knoux's design system.
// This includes font choices, color hierarchy, and subtle interactive states.
const knouxLabelVariants = cva(
  // Base styles: Apply premium font, medium weight, clear spacing, and responsive text size.
  "block text-base font-serif font-medium leading-none transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-60", // Using serif font for titles and labels for premium feel.
  {
    variants: {
      // --- Variants for specific label purposes ---

      // `default`: The standard label for most form elements.
      variant: {
        default: "text-off-white", // Primary white text for primary labels.
        // `muted`: For less emphasized labels, e.g., secondary info.
        muted: "text-slate-gray", // Secondary gray text for secondary labels.
        // `destructive`: For labels associated with error states or warnings.
        // Uses the brand's signature gold color to denote importance or error.
        destructive: "text-gold-400", // Prominent gold for destructive labels.
        // `highlighted`: For labels that need to stand out, e.g., in active states or crucial settings.
        highlighted: "text-gold-400 font-semibold", // Gold with bold weight for emphasis.
      },
    },
    defaultVariants: {
      variant: "default", // Default label is the primary text color.
    },
  }
);

// --- Knoux-Branded Label Props Interface ---
// Defining the props for the custom Label component, inheriting from Radix and variant props.
export interface KnouxLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof knouxLabelVariants> {
  /**
   * @asChild - When true, builds a string input so that the child can be rendered natively. This is important for direct rendering with native HTML elements.
   */
  asChild?: boolean;
}

// --- Knoux-Branded Label Component Implementation ---

/**
 * @KnouxLabel
 * The primary component for all labels within the Knoux BookSmith Ultra™ application.
 * It wraps Radix's Label primitive and applies Knoux's exclusive styling, ensuring
 * all labels are accessible, informative, and visually consistent with the premium interface.
 * Supports associating labels with form inputs using the `htmlFor` attribute.
 *
 * Usage examples:
 * - `<KnouxLabel htmlFor="book-title">Book Title</KnouxLabel>`
 * - `<KnouxLabel htmlFor="author-name" variant="muted">Author</KnouxLabel>`
 * - `<KnouxFormLabel htmlFor="warning-flag" variant="destructive">Apply Warning</KnouxFormLabel>` (When used within Form)
 */
const KnouxLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  KnouxLabelProps
>(({ className, variant, asChild, ...props }, ref) => {
  // Determine the rendering component: Slot for `asChild`, otherwise the primitive label.
  const Comp = asChild ? Slot : LabelPrimitive.Root;

  return (
    // Applying Knoux variants and any custom classes.
    <Comp
      ref={ref}
      // Applying Knoux label variants, plus any additional custom classes for further styling.
      // Font family and base styling are set within `knouxLabelVariants`.
      className={cn(knouxLabelVariants({ variant }), className)}
      {...props}
    />
  );
});
KnouxLabel.displayName = "KnouxLabel"; // Explicitly branded display name.

// --- Exporting Knoux Branded Label Component ---
// Exporting the custom label component with its standard name for compatibility,
// ensuring it's recognized by the project's existing structure (e.g., FormLabel).
export {
  KnouxLabel as Label, // Exporting the custom label as 'Label'.
};
