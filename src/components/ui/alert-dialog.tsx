// @/components/ui/alert-dialog.tsx - The Knoux Legacy UI AlertDialog Components
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To handle critical user confirmations, AI actions feedback, saving/exporting prompts,
// and system notifications with the elegance and clarity befitting Knoux's premium user experience.
// Each dialog is styled to blend seamlessly with the app's glassmorphism theme and brand color palette.

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { ChevronDown, AlertTriangle, X } from "lucide-react"; // Adding relevant icons if needed, but mainly focusing on button/background context for this dialog.

// Importing utility classes and Knoux button variants for a cohesive look and feel.
import { cn } from "@/lib/utils";
// Ensuring we use the specifically branded button variants from Knoux.
import { buttonVariants } from "@/components/ui/button";

// --- Knoux-branded AlertDialog Components ---

/**
 * @KnouxAlertDialogRoot
 * The root component that manages the alert dialog state.
 */
const KnouxAlertDialog = AlertDialogPrimitive.Root;
KnouxAlertDialog.displayName = "KnouxAlertDialogRoot"; // Explicitly branding the root component.

/**
 * @KnouxAlertDialogTrigger
 * A button or element that opens the dialog. Custom styling will be applied when used in context.
 */
const KnouxAlertDialogTrigger = AlertDialogPrimitive.Trigger;
// If specific trigger styling is needed beyond the button itself, it would be applied here or to the element passed as `asChild`.
// For example, `className="KnouxButtonStyling"`

/**
 * @KnouxAlertDialogPortal
 * Essential for managing z-index and overlay positioning, ensuring dialogs appear above other content.
 * Inherits global portal management from Radix.
 */
const KnouxAlertDialogPortal = AlertDialogPrimitive.Portal;

/**
 * @KnouxAlertDialogOverlay
 * The background overlay that dims the main UI when a dialog is active.
 * This is a prime element for our glassmorphism effect.
 */
const KnouxAlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    // Styling: Full screen overlay with a subtle dark blur, creating a premium depth effect.
    // Smooth fade animations are inherent from Radix's data states.
    className={cn(
      // Applying brand background color and sophisticated blur effect.
      "fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
KnouxAlertDialogOverlay.displayName = "KnouxAlertDialogOverlay"; // Branded display name.

/**
 * @KnouxAlertDialogContent
 * The main dialog window. Contains the header, body, and footer.
 * Designed with subtle glassmorphism, internal padding, and smooth, refined animations.
 */
const KnouxAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <KnouxAlertDialogOverlay /> {/* Utilizes our custom styled overlay */}
    <AlertDialogPrimitive.Content
      ref={ref}
      // Styling: Centered, card-like dialog with generous padding and premium blur.
      // Utilizes all the specified animations for entrance and exit for a smooth, professional feel.
      className={cn(
        // Base positioning and size. Max width for readability.
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border",
        // Core Knoux Glassmorphism styling: Semi-transparent background, blur, rounded corners.
        "bg-navy-800/70 backdrop-blur-xl rounded-xl border border-navy-800/50",
        // Padding and shadow for the modal body.
        "p-6 shadow-2xl shadow-navy-900/70",
        // Animations for state changes: fade, zoom, slide - all with smooth timing.
        "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className // Allow for any additional specific styling.
      )}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
));
KnouxAlertDialogContent.displayName = "KnouxAlertDialogContent"; // Branded display name.

/**
 * @KnouxAlertDialogHeader
 * Container for the dialog's title and description. Styled for clear visual hierarchy.
 */
const KnouxAlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Centers content within the header area, maintains spacing between title/description.
    className={cn(
      "flex flex-col space-y-3 text-center sm:text-left px-1 py-2", // Adjusted padding, more vertical space.
      className
    )}
    {...props}
  />
);
KnouxAlertDialogHeader.displayName = "KnouxAlertDialogHeader"; // Branded display name.

/**
 * @KnouxAlertDialogFooter
 * Container for action buttons (Save, Cancel, etc.). Provides layout for button alignment.
 */
const KnouxAlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Styling: Footer layout for buttons, with space between them for clarity and easy clicking.
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3", // Adjusted spacing for buttons.
      className
    )}
    {...props}
  />
);
KnouxAlertDialogFooter.displayName = "KnouxAlertDialogFooter"; // Branded display name.

/**
 * @KnouxAlertDialogTitle
 * The title of the dialog. Prominently displayed, using the premium serif font for authority.
 */
const KnouxAlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    // Styling: Emphasizing the title with Knoux's serif font, primary gold color for importance, and suitable size.
    className={cn("text-2xl font-serif font-semibold text-gold-400", className)}
    {...props}
  />
));
KnouxAlertDialogTitle.displayName = "KnouxAlertDialogTitle"; // Branded display name.

/**
 * @KnouxAlertDialogDescription
 * The body text of the dialog. Subtle, clear, and using brand secondary colors.
 */
const KnouxAlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    // Styling: Clear, readable text in Knoux's secondary color, slightly smaller than title for hierarchy.
    className={cn("text-lg font-sans text-slate-gray", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "KnouxAlertDialogDescription"; // Branded display name.

/**
 * @KnouxAlertDialogAction
 * The primary action button (e.g., "Save", "Confirm"). Uses the main brand button style.
 */
const KnouxAlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    // Using the primary gold button variant as the default for important actions.
    className={cn(buttonVariants({ variant: "default", size: "lg" }), "font-semibold", className)}
    {...props}
  />
));
AlertDialogAction.displayName = "KnouxAlertDialogAction"; // Branded display name.

/**
 * @KnouxAlertDialogCancel
 * The secondary action button (e.g., "Cancel"). Uses an outline style to differentiate from primary actions.
 */
const KnouxAlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    // Using the outline button variant for cancellation actions.
    // Applying some margin-top to prevent overlap issues on smaller screens.
    className={cn(
      buttonVariants({ variant: "outline", size: "lg" }),
      "mt-2 sm:mt-0 font-medium text-slate-gray", // Setting the text color to slate-gray for contrast.
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = "KnouxAlertDialogCancel"; // Branded display name.

// --- Final Exporting Knoux Branded Components ---
// Exporting all components with their original names, but ensuring that these *are* the Knoux branded implementations.
export {
  KnouxAlertDialog as AlertDialog,
  KnouxAlertDialogPortal as AlertDialogPortal,
  KnouxAlertDialogOverlay as AlertDialogOverlay,
  KnouxAlertDialogTrigger as AlertDialogTrigger,
  KnouxAlertDialogContent as AlertDialogContent,
  KnouxAlertDialogHeader as AlertDialogHeader,
  KnouxAlertDialogFooter as AlertDialogFooter,
  KnouxAlertDialogTitle as AlertDialogTitle,
  KnouxAlertDialogDescription as AlertDialogDescription,
  KnouxAlertDialogAction as AlertDialogAction,
  KnouxAlertDialogCancel as AlertDialogCancel,
};
