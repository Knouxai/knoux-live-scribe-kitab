// @/components/ui/dialog.tsx - The Knoux Legacy UI Dialog Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To present modal windows for user interactions requiring immediate attention
// or input, such as confirmations, advanced settings, quick edits, or displaying
// important AI-generated feedback without navigating away from the current context.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a sophisticated and intuitive user experience.

import * as React from "react";
// Importing Radix UI primitives as the foundation for dialog functionality.
import * as DialogPrimitive from "@radix-ui/react-dialog";
// Importing icons. Ideally, Knoux's custom icons would be used here.
import { X } from "lucide-react"; // Placeholder for Knoux's custom close icon.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";
// Importing Knoux's custom Button variants to style action buttons within the dialog.
import { knouxButtonVariants } from "@/components/ui/button"; // Importing custom button styles.

// --- Knoux-Branded Dialog Components ---

/**
 * @KnouxDialog
 * The root component for the dialog, managing its open/closed state.
 */
const KnouxDialog = DialogPrimitive.Root;
KnouxDialog.displayName = "KnouxDialog";

/**
 * @KnouxDialogTrigger
 * The element (e.g., Button, Link) that opens the dialog. Styling will be applied to the trigger element itself.
 */
const KnouxDialogTrigger = DialogPrimitive.Trigger;

/**
 * @KnouxDialogPortal
 * Renders the dialog content in a portal, ensuring correct stacking context above other UI elements.
 */
const KnouxDialogPortal = DialogPrimitive.Portal;

/**
 * @KnouxDialogClose
 * Button for closing the dialog. Will typically inherit button styles.
 */
const KnouxDialogClose = DialogPrimitive.Close;

/**
 * @KnouxDialogOverlay
 * The backdrop overlay that dims the background UI when the dialog is open.
 * Styled with Knoux's signature Glassmorphism effect (dark, blurred background).
 */
const KnouxDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    // Styling: A semi-transparent, blurred dark background to focus attention on the dialog.
    // Utilizes brand colors and subtle animation for opening/closing.
    className={cn(
      "fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-xl", // Applying Knoux's premium backdrop and blur.
      // Standard Radix animations for smooth transitions.
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
KnouxDialogOverlay.displayName = "KnouxDialogOverlay"; // Explicitly branded display name.

/**
 * @KnouxDialogContent
 * The main dialog window. Contains header, body, footer, and close button.
 * Styled with Knoux's premium Glassmorphism card design, including smooth animations.
 */
const KnouxDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal> {/* Portal for managing render layer. */}
    <KnouxDialogOverlay /> {/* Using the custom styled overlay. */}
    <DialogPrimitive.Content
      ref={ref}
      // Styling: The core Knoux card-like modal. Centered, with generous padding, glass background, premium border, and smooth animations.
      className={cn(
        // Positioning and size constraints.
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border",
        // Knoux Glassmorphism Styling: Dark, blurred background, defined border, rounded corners.
        "rounded-2xl border-navy-800/50 bg-navy-800/70 p-6 shadow-2xl shadow-navy-900/70 backdrop-blur-lg",
        // Animation & State Transitions: Ensures smooth entry and exit.
        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className // Allow external class overrides.
      )}
      {...props}
    >
      {children} {/* Content of the dialog */}
      {/* Knoux styled Close button integrated into the dialog. */}
      <DialogPrimitive.Close
        className={cn(
          "absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-opacity duration-200 hover:opacity-100 hover:bg-gold-400/30 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2",
          "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" // Base Radix state styling, overridden by Knoux focus/hover.
        )}
        asChild // Allows Button component for styling, though it's a close action.
      >
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent p-0 text-slate-gray transition-all hover:bg-gold-400/30 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-95"
        >
          {/* Knoux styled close icon. */}
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span> {/* Accessibility text. */}
        </button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "KnouxDialogContent"; // Explicitly branded display name.

/**
 * @KnouxDialogHeader
 * Container for the dialog's title and description. Styled for clear visual hierarchy.
 */
const KnouxDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Arranges title and description vertically with Knoux spacing.
    className={cn("flex flex-col space-y-2 text-center sm:text-left px-2", className)}
    {...props}
  />
);
KnouxDialogHeader.displayName = "KnouxDialogHeader"; // Explicitly branded display name.

/**
 * @KnouxDialogFooter
 * Container for dialog action buttons (e.g., Save, Cancel). Aligns buttons appropriately.
 */
const KnouxDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Arranges buttons in a row (or stacked on small screens), ensuring clear action options.
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3", className)}
    {...props}
  />
);
KnouxDialogFooter.displayName = "KnouxDialogFooter"; // Explicitly branded display name.

/**
 * @KnouxDialogTitle
 * The dialog's title. Styled prominently using Knoux's serif font and gold accent color.
 */
const KnouxDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    // Styling: Large, bold serif font with the primary gold color for importance.
    className={cn("text-2xl font-serif font-semibold text-gold-400", className)}
    {...props}
  />
));
KnouxDialogTitle.displayName = "KnouxDialogTitle"; // Explicitly branded display name.

/**
 * @KnouxDialogDescription
 * Provides additional details or context for the dialog. Styled with Knoux's readable sans-serif font.
 */
const KnouxDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    // Styling: Clear sans-serif text using Knoux's secondary color for readability.
    className={cn("text-base font-sans text-slate-gray", className)}
    {...props}
  />
));
KnouxDialogDescription.displayName = "KnouxDialogDescription"; // Explicitly branded display name.

// --- Exporting Knoux Branded Dialog Components ---
// Exporting all dialog components with their standard names for broader compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  KnouxDialog as Dialog,
  KnouxDialogPortal as DialogPortal,
  KnouxDialogOverlay as DialogOverlay,
  KnouxDialogClose as DialogClose,
  KnouxDialogTrigger as DialogTrigger,
  KnouxDialogContent as DialogContent,
  KnouxDialogHeader as DialogHeader,
  KnouxDialogFooter as DialogFooter,
  KnouxDialogTitle as DialogTitle,
  KnouxDialogDescription as DialogDescription,
};
