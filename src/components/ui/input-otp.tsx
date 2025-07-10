// @/components/ui/input-otp.tsx - The Knoux Legacy UI OTP Input Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide a sophisticated and secure way for users to input One-Time Passwords (OTP)
// or verification codes, integrating seamlessly with Knoux's premium interface,
// featuring Glassmorphism effects, brand color accents (especially gold for emphasis),
// and subtle animations for a smooth, high-tech user experience.
// Crucial for security steps like verifying new logins, password resets, or transaction confirmations.

import * as React from "react";
// Importing Radix UI primitives for OTP input functionality.
import { OTPInput, OTPInputContext } from "input-otp";
// Importing icons. Ideally, Knoux's custom icons would be used here.
import { Dot, Lock } from "lucide-react"; // Placeholder icons: Lock for security context, Dot for separator.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Input OTP Components ---

/**
 * @KnouxInputOTP
 * The root component for the OTP input. Wraps the Radix OTPInput primitive
 * and applies Knoux's global styling for inputs, including Glassmorphism and brand colors.
 * It manages the overall layout of the OTP slots and container.
 */
const KnouxInputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    // Styling: Applying Knoux's signature Glassmorphism to the container.
    // Borders, background, and spacing are aligned with Knoux's UI guidelines.
    containerClassName={cn(
      "flex items-center gap-2.5", // Increased gap for better spacing between slots.
      // Applied Glassmorphism to the container to provide a soft backdrop.
      "rounded-xl border border-navy-800/50 bg-navy-800/60 p-4 shadow-inner backdrop-blur-lg",
      "has-[:disabled]:opacity-50", // Disabled state styling.
      containerClassName
    )}
    // Styling for the input elements themselves (individual slots).
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
KnouxInputOTP.displayName = "KnouxInputOTP"; // Explicitly branded display name.

/**
 * @KnouxInputOTPGroup
 * Groups individual OTP slots together visually. Provides alignment and spacing.
 * Styled to complement the main InputOTP container.
 */
const KnouxInputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: Basic flex alignment for input slots.
    className={cn("flex items-center", className)}
    {...props}
  />
));
KnouxInputOTPGroup.displayName = "KnouxInputOTPGroup"; // Explicitly branded display name.

/**
 * @KnouxInputOTPSlot
 * Represents a single character input field for the OTP.
 * Highly styled with Glassmorphism, brand colors for states (active, focused),
 * and a custom animated caret for a premium typing experience.
 */
const KnouxInputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  // Accessing context to get character, caret status, and active state for styling.
  const inputOTPContext = React.useContext(OTPInputContext);
  // Guarding against context being undefined.
  if (!inputOTPContext) {
    throw new Error("InputOTPSlot must be used within InputOTP component.");
  }
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      // Styling: The core visual element of the OTP. Rounded corners, premium borders,
      // focused state with gold ring, and animated caret.
      className={cn(
        // Base slot appearance: Knoux's semi-transparent glass background, defined borders, and neutral text color.
        "relative flex h-11 w-11 items-center justify-center border-y border-r border-navy-800/50 text-lg font-serif font-medium text-off-white", // Enhanced size and typography.
        "first:rounded-l-xl first:border-l first:border-navy-800/50", // First slot gets left border/radius.
        "last:rounded-r-xl", // Last slot gets right radius.
        // Active/Focused state: Highlighting the input with a gold ring and shadow for active interaction.
        isActive &&
          "z-10 ring-2 ring-gold-400 ring-offset-2 ring-offset-navy-800 shadow-glow-gold-300", // Knoux focus state with gold glow.
        className
      )}
      {...props}
    >
      {/* Display the character entered by the user. */}
      {char}
      {/* The fake caret, animated to blink when the slot is active. */}
      {hasFakeCaret && isActive && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Blinking caret animation, colored with brand's gold for visibility. */}
          <div className="h-5 w-px animate-caret-blink bg-gold-400 duration-700" />
        </div>
      )}
    </div>
  );
});
KnouxInputOTPSlot.displayName = "KnouxInputOTPSlot"; // Explicitly branded display name.

/**
 * @KnouxInputOTPSeparator
 * A visual separator between OTP groups (e.g., between sets of numbers).
 * Styled subtly with a brand-aligned element.
 */
const KnouxInputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator" // Semantic role for accessibility.
    // Styling: A subtle separator using Knoux's brand elements, like a dot or thin line.
    className={cn("flex items-center justify-center text-slate-gray", className)} // Centered element, muted color.
    {...props}
  >
    {/* Default separator: A custom Knoux dot icon, or a simple dash. */}
    <Dot className="h-3 w-3" />
  </div>
));
KnouxInputOTPSeparator.displayName = "KnouxInputOTPSeparator"; // Explicitly branded display name.

// --- Exporting Knoux Branded Input OTP Components ---
// Exporting all components with standard names for broad compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  KnouxInputOTP as InputOTP,
  KnouxInputOTPGroup as InputOTPGroup,
  KnouxInputOTPSlot as InputOTPSlot,
  KnouxInputOTPSeparator as InputOTPSeparator,
};
