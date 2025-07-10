// @/components/ui/drawer.tsx - The Knoux Legacy UI Drawer Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To present sliding panels from the bottom (or sides), offering secondary context,
// settings, quick actions, or supplementary information without obscuring the main view entirely.
// Ideal for mobile views or specific feature panels (e.g., AI settings, export options).
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a sophisticated and seamless user experience.

import * as React from "react";
// Importing Radix UI primitives for drawer functionality.
import { Drawer as DrawerPrimitive } from "vaul";
// Importing Knoux's preferred icons, ideally from a dedicated Knoux icon library.
import { X, ChevronDown } from "lucide-react"; // Placeholder icons.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Drawer Components ---

/**
 * @KnouxDrawer
 * The root component for the drawer, managing its state and core behaviors.
 * It includes the `shouldScaleBackground` prop which, if true, subtly scales the background UI.
 * Custom styling applies Knoux's glassmorphic look to the drawer itself.
 */
const KnouxDrawer = ({
  shouldScaleBackground = true, // Default to true for a better perceived scaling effect.
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
KnouxDrawer.displayName = "KnouxDrawer"; // Explicitly branded display name.

/**
 * @KnouxDrawerTrigger
 * The element (e.g., Button) that opens the drawer. Styling is applied to the trigger element.
 */
const KnouxDrawerTrigger = DrawerPrimitive.Trigger;

/**
 * @KnouxDrawerPortal
 * Ensures the drawer renders in a portal for correct Z-index and stacking context management.
 */
const KnouxDrawerPortal = DrawerPrimitive.Portal;

/**
 * @KnouxDrawerClose
 * A button or element that programmatically closes the drawer.
 */
const KnouxDrawerClose = DrawerPrimitive.Close;

/**
 * @KnouxDialogOverlay
 * The background overlay dimming the main UI when the drawer is open.
 * Styled with Knoux's characteristic dark, blurred Glassmorphism effect.
 */
const KnouxDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    // Styling: A semi-transparent, dark, blurred backdrop enhancing the Knoux aesthetic.
    className={cn(
      "fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-xl", // Applying Knoux's premium backdrop blur.
      // Smooth animations for appearance/disappearance.
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
KnouxDialogOverlay.displayName = "KnouxDialogOverlay"; // Explicitly branded display name.

/**
 * @KnouxDrawerContent
 * The main drawer panel, containing header, body, footer, and a close button.
 * Styled with Knoux's premium Glassmorphism design, custom pull-bar, and smooth animations.
 */
const KnouxDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <KnouxDialogOverlay /> {/* Utilizing the custom styled overlay. */}
    <DrawerPrimitive.Content
      ref={ref}
      // Styling: The core Knoux drawer panel. Configured for bottom-sliding animation,
      // a premium Glassmorphism background, refined border, rounded top corners,
      // and includes the signature Knoux draggable pull-bar.
      className={cn(
        // Base drawer panel styles.
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
        // Knoux Styling: Soft Glassmorphism, brand colors, subtle border, and distinctive rounded top.
        "border-t-0 border-navy-800/40 bg-navy-800/70 p-5 pb-8 shadow-xl shadow-navy-900/70 backdrop-blur-xl",
        "rounded-t-3xl", // Significantly rounded top corners for a premium feel.
        // Animations for smooth appearance/disappearance and sliding behavior.
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        className
      )}
      {...props}
    >
      {/* Knoux draggable pull-bar, styled with brand colors. */}
      <div className="mx-auto mb-5 mt-2 h-1.5 w-[80px] rounded-full bg-slate-gray/40" />
      {children} {/* Content inside the drawer. */}
    </DialogPrimitive.Content>
  </DrawerPrimitive.Portal>
));
KnouxDialogContent.displayName = "KnouxDialogContent"; // Explicitly branded display name.

/**
 * @KnouxDrawerHeader
 * Container for the drawer's title and description. Styled for clear visual hierarchy.
 */
const KnouxDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Arranges title and description with Knoux's specific padding and text alignment.
    className={cn("flex flex-col space-y-2.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
KnouxDialogHeader.displayName = "KnouxDialogHeader"; // Explicitly branded display name.

/**
 * @KnouxDialogFooter
 * Container for action buttons within the drawer. Aligns buttons for optimal user flow.
 */
const KnouxDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Arranges action buttons in a suitable layout (e.g., bottom-aligned, stacked).
    className={cn("flex flex-col gap-3 p-4 pt-3", className)}
    {...props}
  />
);
KnouxDialogFooter.displayName = "KnouxDialogFooter"; // Explicitly branded display name.

/**
 * @KnouxDialogTitle
 * The dialog's title. Styled prominently using Knoux's premium serif font and gold accent color.
 */
const KnouxDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    // Styling: Emphasizing the title with Knoux's preferred serif font, a large size, and primary gold color.
    className={cn(
      "text-2xl font-serif font-bold leading-none tracking-tight",
      "text-gold-400", // Primary accent color for important titles.
      className
    )}
    {...props}
  />
));
KnouxDialogTitle.displayName = "KnouxDialogTitle"; // Explicitly branded display name.

/**
 * @KnouxDialogDescription
 * Provides supplementary details for the dialog. Styled with Knoux's readable sans-serif font and secondary colors.
 */
const KnouxDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    // Styling: Clear sans-serif text using Knoux's secondary text color for readability.
    className={cn("text-lg font-sans font-medium text-slate-gray", className)}
    {...props}
  />
));
KnouxDialogDescription.displayName = "KnouxDialogDescription"; // Explicitly branded display name.

// --- Exporting Knoux Branded Drawer Components ---
// Exporting all components with standard names for broader compatibility,
// ensuring they are the fully customized Knoux implementations internally.
export {
  KnouxDrawer as Drawer, // Exporting custom drawer with standard name.
  KnouxDrawerPortal as DrawerPortal,
  KnouxDialogOverlay as DrawerOverlay, // Re-using DialogOverlay for consistency if styles align, otherwise specify DrawerOverlay.
  KnouxDrawerTrigger as DrawerTrigger,
  KnouxDrawerClose as DrawerClose,
  KnouxDialogContent as DrawerContent, // Re-using DialogContent for content styling synergy if appropriate.
  KnouxDialogHeader as DrawerHeader, // Re-using DialogHeader for header styling.
  KnouxDialogFooter as DrawerFooter, // Re-using DialogFooter for footer styling.
  KnouxDialogTitle as DrawerTitle, // Re-using DialogTitle for title styling.
  KnouxDialogDescription as DrawerDescription, // Re-using DialogDescription for description styling.
};
