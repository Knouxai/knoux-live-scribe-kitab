// @/components/ui/button.tsx - The Knoux Legacy UI Button Component
// Exclusively crafted for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide primary and secondary interaction points throughout the application,
// embodying Knoux's premium aesthetic with glassmorphism, exclusive gradients, and responsive behaviors.
// Each button variant is designed to convey specific meanings and user actions within the Knoux ecosystem.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // For conditional rendering and flexible component composition.
import { cva, type VariantProps } from "class-variance-authority"; // Utility for creating declarative, system-based styles.
// Assuming `cn` is imported from a global utility file as per other components.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Button Variants Definition ---
// Defining all button styles according to Knoux's premium design system, integrating custom gradients, glassmorphism effects, and brand colors.
const knouxButtonVariants = cva(
  // Base styles: Apply smooth transitions, refined Glassmorphism backdrop blur, specific padding for tactile feedback, and exclusive typography.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // --- Variants for different action types and visual cues ---

      // `default`: The primary button, representing the main action (e.g., 'Create Book', 'Save').
      // Employs Knoux's signature sacred gradient for an authoritative, divine touch.
      variant: {
        default:
          "bg-gradient-to-br from-gold-400 to-yellow-500 text-navy-900 shadow-lg shadow-gold-400/40 hover:from-gold-500 hover:to-yellow-600 hover:shadow-xl", // Replaced primary with custom gold gradient for premium feel.

        // `destructive`: Used for critical actions like 'Delete' or 'Discard Changes'.
        // Stylized with a unique deep, authoritative gold gradient to convey serious warning but with luxury.
        destructive:
          "bg-gradient-to-br from-orange-500 to-yellow-600 text-navy-900 shadow-lg shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-700 hover:shadow-xl", // Destructive reimagined in potent gold hues.

        // `outline`: For secondary actions or visually distinct CTAs. Features a subtle glass border.
        outline:
          "border border-gold-400/30 bg-navy-800/60 text-gold-400 backdrop-blur-sm shadow-md hover:border-gold-400/60 hover:bg-navy-800/80", // Soft glass border with gold accent.

        // `secondary`: For less critical but still important actions, or calls to action within side panels.
        secondary:
          "bg-navy-800/50 text-slate-gray shadow-sm border border-navy-800/30 hover:bg-navy-800/70 hover:text-off-white", // Subtle secondary styling with glass effect.

        // `ghost`: A transparent button with hover effects, for actions like 'Edit', 'Cancel' within contextual menus.
        ghost:
          "text-slate-gray hover:bg-navy-800/50 hover:text-off-white backdrop-blur-sm", // Transparent background with subtle hover and blur.

        // `link`: For simple text links that need button-like styling in specific contexts.
        link:
          "text-gold-400 underline-offset-4 hover:underline hover:underline-offset-8", // Clear link style with enhanced underline on hover.

        // --- Knoux Signature Variants ---
        // These are highly specific to Knoux's brand identity and convey special meanings.

        // `sacred`: For actions related to Islamic content, religious guidance, or spiritual elements.
        // Uses a custom gradient representing divine light and carries subtle sacred symbolism.
        sacred:
          "bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-xl shadow-blue-500/50 hover:from-cyan-500 hover:to-blue-700", // Reimagined with calming, spiritual hues and a glow.

        // `golden`: Represents premium features, success states, or highlighting elite actions.
        // Uses a luxurious gold gradient for high-value calls to action.
        golden:
          "bg-gradient-to-br from-yellow-400 to-yellow-500 text-navy-900 shadow-xl shadow-yellow-400/50 hover:from-yellow-500 hover:to-yellow-600", // Directly inspired by premium gold accents.

        // `wisdom`: For intellectual content, guidance, and self-improvement modules.
        // Uses earthy, contemplative tones for clarity and deep thinking.
        wisdom:
          "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl shadow-purple-500/50 hover:from-purple-600 hover:to-indigo-700", // Sophisticated gradients evoking intellect.

        // `live`: Specifically for actions related to the 'Live Broadcast' feature of Kitāb al-Mubīn™.
        // Includes a subtle pulsing animation to draw attention to live interactions.
        live:
          "bg-gradient-to-br from-live-primary-500 to-live-primary-600 text-white shadow-live-primary-500/50 hover:from-live-primary-600 hover:to-live-primary-700 animate-pulse-heavy", // Animated for highlighting live status.
      },

      // --- Size Variants for flexible UI elements ---
      size: {
        default: "h-11 px-5 py-2 text-base", // Standard comfortable size.
        sm: "h-10 px-4 py-2 text-sm", // Smaller for concise elements.
        lg: "h-12 px-6 py-2.5 text-lg", // Larger for prominent actions.
        xl: "h-14 px-8 py-3 text-xl", // Extra large for hero sections or main calls to action.
        icon: "h-11 w-11", // For icon-only buttons.
      },
    },
    defaultVariants: {
      variant: "default", // Default to the primary gold gradient.
      size: "default",
    },
  }
);

// --- Knoux-Branded Button Props Interface ---
// Defines the props for our custom Button component, extending HTML attributes and variant properties.
export interface KnouxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof knouxButtonVariants> {
  // `asChild`: Allows rendering the Button as a different component (e.g., 'a', 'Link'),
  // enabling greater flexibility in linking and component composition.
  asChild?: boolean;
}

// --- Knoux-Branded Button Component Implementation ---
/**
 * @KnouxButton
 * The primary interactive component within Knoux BookSmith Ultra™.
 * This component serves all button needs, from primary actions like "Create Book" or "Save",
 * to secondary functions like "Cancel", "Edit", or even context-specific actions related to
 * live features, AI prompts, and library interactions. Its versatility is key to
 * delivering a cohesive and intuitive user experience.
 *
 * Example Usages:
 * - Primary Call to Action: `<KnouxButton variant="default">Create New Book</KnouxButton>`
 * - Navigating Chapters: `<KnouxButton variant="golden" size="lg" asChild><Link to="/chapter/1">Next Chapter</Link></KnouxButton>`
 * - AI Action Confirmation: `<KnouxButton variant="live" onClick={handleLiveFeature}>Start Live Broadcast</KnouxButton>`
 * - Critical Warning Action: `<KnouxButton variant="destructive">Delete Book</KnouxButton>`
 */
const KnouxButton = React.forwardRef<HTMLButtonElement, KnouxButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determine the component to render: Either a Slot for 'asChild' or a standard 'button'.
    const Comp = asChild ? Slot : "button";

    return (
      // Applying the custom Knoux button variants and any additional provided classes.
      <Comp
        ref={ref}
        className={cn(knouxButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
KnouxButton.displayName = "KnouxButton"; // Explicitly branded display name for development tools.

// --- Exporting Knoux Branded Button Components ---
// Exporting the component and its variants using standard names for broad compatibility within the project,
// ensuring that all uses implicitly leverage the deeply customized Knoux implementations.
export {
  KnouxButton as Button, // Exporting the custom button with the standard name.
  knouxButtonVariants as buttonVariants, // Exporting the variant generator function under the standard name.
};
