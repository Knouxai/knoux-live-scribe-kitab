// @/components/ui/avatar.tsx - The Knoux Legacy UI Avatar Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To display user profiles, author photos, or icons representing entities within the app.
// This component is styled to integrate seamlessly with the Knoux design system,
// offering a clean, professional, and on-brand visual representation.
// Specifically, it enhances the fallback display for a premium feel,
// even when no image is present, reflecting the app's meticulous attention to detail.

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
// Ideally, for ultimate brand adherence, custom Knoux icons would be used here instead of standard ones.
// Example: import { KnouxUserIcon } from "@/components/ui/KnouxIcons";
import { User } from "lucide-react"; // Placeholder for a potential custom user icon.

// Importing the essential cn utility for composable class names, ensuring adherence to our strict Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Avatar Components ---

/**
 * @KnouxAvatar
 * The root component that wraps the avatar image and fallback.
 * Provides the essential container styling for the circular shape and overflow handling.
 * Tuned for Knoux's premium aesthetic, ensuring clean edges and appropriate spacing.
 */
const KnouxAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    // Base Styling: Defines the core circular shape, removes overflow artifacts, and sets a base size.
    // Enhanced with Knoux branding: A subtle, thin border for definition and refined spacing.
    className={cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full", // Slightly larger default size for premium feel, subtle border added below
      // Placeholder for a potential subtle border if desired: 'border-2 border-gold-400/30'
      className
    )}
    {...props}
  />
));
KnouxAvatar.displayName = "KnouxAvatar"; // Explicitly branded display name.

/**
 * @KnouxAvatarImage
 * Displays the user's avatar image. Ensures the image covers the circular area nicely.
 * Leverages Knoux's aspect ratio handling for perfect display.
 */
const KnouxAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    // Styling: Ensures the image fills its container square and maintains aspect ratio, crucial for circles.
    // The default styling from Radix is usually sufficient here, but can be augmented with Knoux styles.
    className={cn("aspect-square h-full w-full object-cover", className)} // Using object-cover for robust image handling.
    {...props}
  />
));
KnouxAvatarImage.displayName = "KnouxAvatarImage"; // Explicitly branded display name.

/**
 * @KnouxAvatarFallback
 * Displays initials or a default icon when the image cannot be loaded.
 * This component is styled to embody the Knoux brand's sophisticated fallback, using brand colors and fonts.
 */
const KnouxAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    // Styling: This is where Knoux branding truly shines for fallbacks.
    // A semi-transparent navy background with a subtle blur, Knoux's secondary text color for initials,
    // and the elegant sans-serif font for legibility. A default placeholder icon (like user or AI symbol) would be ideal here.
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-navy-800/70 backdrop-blur-lg", // Premium glassmorphic fallback background.
      "font-sans text-xl font-semibold text-slate-gray", // Using sans-serif font and Knoux's secondary text color.
      className
    )}
    {...props}
  />
));
KnouxAvatarFallback.displayName = "KnouxAvatarFallback"; // Explicitly branded display name.

// --- Exporting Knoux Branded Avatar Components ---
// Exported with standard names for broader component compatibility within the app,
// but these are the fully customized Knoux implementations.
export {
  KnouxAvatar as Avatar,
  KnouxAvatarImage as AvatarImage,
  KnouxAvatarFallback as AvatarFallback,
};
