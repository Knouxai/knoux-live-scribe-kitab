// @/components/ui/hover-card.tsx - The Knoux Legacy UI HoverCard Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide supplementary information or context that appears on hover,
// such as author bios, feature explanations, or preview snippets of books,
// enriching the user experience without intrusive pop-ups.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a sophisticated and seamless display of additional content.

import * as React from "react";
// Importing Radix UI primitives as the base for hover card functionality.
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
// Importing icons. Ideally, Knoux's custom icons would be used here.
import { X } from "lucide-react"; // Placeholder icon for closing or more info if needed.

// Importing the essential `cn` utility for composable class names, ensuring adherence
// to the strict Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded HoverCard Components ---

/**
 * @KnouxHoverCard
 * The root component that wraps the hover card and its content.
 * Provides the foundational structure and manages its state.
 */
const KnouxHoverCard = HoverCardPrimitive.Root;
KnouxHoverCard.displayName = "KnouxHoverCard"; // Explicitly branded display name.

/**
 * @KnouxHoverCardTrigger
 * The element (e.g., Text, Avatar, Icon) that triggers the hover card when interacted with.
 * Styling is applied to the trigger element itself.
 */
const KnouxHoverCardTrigger = HoverCardPrimitive.Trigger;

/**
 * @KnouxHoverCardContent
 * The content panel that appears on hover. This component is heavily styled
 * to represent Knoux's premium Glassmorphism aesthetic. It uses brand colors,
 * smooth animations, and appropriate spacing.
 */
const KnouxHoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    // Styling: The core of Knoux's hover card design. It's a premium Glassmorphic panel
    // with rounded corners, subtle borders, brand color background, soft shadow,
    // and smooth entrance animations.
    className={cn(
      // Base Knoux card styling for modals/popups.
      "z-50 w-72 min-w-[10rem] overflow-hidden rounded-xl border border-navy-800/50 bg-navy-800/70 p-4 text-base font-sans text-slate-gray shadow-xl shadow-navy-900/70 backdrop-blur-lg",
      // Smooth transitions for appearance and disappearance.
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      // Positioning animations to match hover card behavior.
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
KnouxHoverCardContent.displayName = "KnouxHoverCardContent"; // Explicitly branded display name.

// --- Exporting Knoux Branded HoverCard Components ---
// Exporting all components with standard names for broader compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  KnouxHoverCard as HoverCard, // Exporting the custom hover card.
  KnouxHoverCardTrigger as HoverCardTrigger,
  KnouxHoverCardContent as HoverCardContent,
};
