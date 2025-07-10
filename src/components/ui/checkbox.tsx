// @/components/ui/checkbox.tsx - The Knoux Legacy UI Checkbox Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide interactive toggles for user settings, feature selections,
// confirmations within AI prompts, or options within the application's interface.
// Styled to embody Knoux's premium aesthetic, featuring Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds, subtle grays),
// and refined typography for a seamless and intuitive user experience.

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// Importing Knoux's preferred checkmark icon. For ultimate brand adherence,
// this should ideally be replaced with an icon from a dedicated Knoux icon library.
import { Check } from "lucide-react"; // Placeholder for a custom Knoux checkmark icon.

// Importing the essential `cn` utility for composable class names, ensuring adherence
// to the strict Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Checkbox Components ---

/**
 * @KnouxCheckbox
 * The root component for the checkbox, managing its state and interaction.
 * It's styled to integrate smoothly with the Knoux UI, offering a subtle Glassmorphism
 * effect for its unchecked and checked states, and prominent focus rings.
 */
const KnouxCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    // Styling: Applies Knoux's core checkbox design.
    // Base styling: Defines a distinct size, circular checkboxes by default unless overridden,
    // subtle border, and the core Glassmorphism backdrop blur.
    className={cn(
      // Standard square checkbox for clarity and usability across most UIs.
      "peer size-5 shrink-0 rounded-md border border-gold-400/40 bg-navy-800/60 text-transparent shadow-inner ring-offset-navy-900 transition-all duration-300 checked:border-gold-400 checked:bg-gold-400 checked:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      // Custom styling for unchecked and checked states.
      "data-[state=unchecked]:border-slate-gray/40 data-[state=unchecked]:bg-navy-800/40 data-[state=unchecked]:text-transparent", // Unchecked state: subtle grey border, muted navy background.
      "data-[state=checked]:bg-gold-400 data-[state=checked]:text-navy-900", // Checked state: vibrant gold background, navy foreground (checkmark).
      className // Allow for any additional custom classes.
    )}
    {...props}
  >
    {/* The indicator component, housing the checkmark itself. */}
    <CheckboxPrimitive.Indicator
      // Styling: Center the checkmark perfectly within the checkbox, applying brand color.
      className={cn(
        "flex items-center justify-center text-navy-900 transition-all duration-300", // Center the icon, use brand's dark color for contrast.
        // Styling applied directly on the indicator for checked state color.
        "data-[state=checked]:text-navy-900" // Checkmark color when checked.
      )}
    >
      {/* The checkmark icon. */}
      <Check className="h-4 w-4" /> {/* Placeholder for custom Knoux checkmark icon */}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
KnouxCheckbox.displayName = "KnouxCheckbox"; // Explicitly branded display name.

// --- Exporting Knoux Branded Checkbox Components ---
// Exporting the component with its standard name for compatibility,
// while ensuring the internal implementation is fully customized for Knoux.
export {
  KnouxCheckbox as Checkbox, // Exporting the custom checkbox with the standard name.
};
