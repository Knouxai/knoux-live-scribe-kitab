// @/components/ui/input.tsx - The Knoux Legacy UI Input Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide a premium and intuitive text input interface for users,
// enabling them to enter data like book titles, descriptions, search queries,
// or user information within the application's various forms and modals.
// Styled to embody Knoux's signature Glassmorphism aesthetic, featuring
// brand color accents (deep navy blues, luxurious golds, subtle grays),
// and refined typography for a seamless and sophisticated user experience.

import * as React from "react";

// Importing the essential `cn` utility from the Knoux library for composable class names,
// ensuring all styling adheres strictly to the Knoux Tailwind theme and design system.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Input Component ---

/**
 * @KnouxInput
 * The primary component for text input fields within the Knoux BookSmith Ultra™ application.
 * This component provides a visually rich and interactive text field that integrates seamlessly
 * with Knoux's overall Glassmorphism design. It handles user input, validation states, and
 * interactive feedback with premium styling.
 *
 * Key Features and Styling:
 * - **Glassmorphism Background:** A subtly transparent, blurred navy background for the input field itself.
 * - **Premium Borders:** Defined borders using Knoux's color palette, which might subtly change on focus.
 * - **Elegant Typography:** Uses Knoux's primary sans-serif font for text and placeholder, with clear focus states.
 * - **Gold Accentuation:** A distinguished gold ring for focus states, highlighting interactivity and premium quality.
 * - **Smooth Transitions:** Animations applied to focus and hover states for a fluid user experience.
 * - **Disabled State:** Grayscale opacity for inputs that are not currently editable.
 */
const KnouxInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLInputElement>
>(({ type, className, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      // Applying Knoux's premium input field styling.
      // This includes Glassmorphism effect for the background, defined borders,
      // elegant typography, interactive focus states with gold accents, and consistent rounding.
      className={cn(
        // Base Input Styles with Knoux branding.
        // Font: Using Knoux's default sans-serif font for inputs.
        "flex w-full rounded-xl border px-4 py-3 text-base font-sans font-medium transition-all duration-300",
        // Background and Border: Semi-transparent navy glass effect with a subtle gold border.
        "border-gold-400/30 bg-navy-800/60 text-off-white placeholder:text-slate-gray/70 backdrop-blur-md",
        // Focus State: Prominent gold ring for active inputs, signifying interaction.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
        // Disabled state: Grayed out and non-interactive appearance.
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Specific styling for file inputs (handled transparently).
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder text styling.
        "placeholder:text-slate-gray/70",
        // Merging with any additional classes provided by the user.
        className
      )}
      {...props}
    />
  );
});
KnouxInput.displayName = "KnouxInput"; // Explicitly branded display name for developer tools and context.

// --- Exporting Knoux Branded Input Component ---
// Exporting the component with its standard name for broader compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  KnouxInput as Input, // Exporting the custom input component with the standard name.
};
