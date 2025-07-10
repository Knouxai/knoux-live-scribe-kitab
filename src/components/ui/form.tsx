// @/components/ui/form.tsx - The Knoux Legacy UI Form Component Suite
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide a structured, user-friendly, and visually cohesive way
// to handle user input, forms, and data validation, integrating seamlessly with
// Knoux's premium design aesthetic (Glassmorphism, brand colors, refined typography).
// This suite ensures a consistent and intuitive experience for all user interactions
// related to input fields, confirmations, and data submission.

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label"; // Base for form labels.
import { Slot } from "@radix-ui/react-slot"; // Allows the use of custom components as input wrappers.
// react-hook-form for powerful form state management, validation, and integration.
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

// Importing Knoux's essential utility for composable class names and custom styles.
import { cn } from "@/lib/utils";
// Importing Knoux's customized Label component to maintain visual consistency.
import { KnouxLabel } from "@/components/ui/label"; // Assuming a custom KnouxLabel exists.

// --- Knoux Form System Base ---

// The `Form` component is a React Context Provider for react-hook-form.
// It doesn't need extensive Knoux styling itself but ensures its children inherit the form context.
const Form = FormProvider;

// Context to pass down the form field's name and ID properties.
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * @KnouxFormField
 * Wrapper component for individual form fields. It utilizes react-hook-form's Controller
 * and passes down context related to the field's name and generated ID for accessibility.
 * The main styling (space-y) is applied here, conforming to Knoux's layout principles.
 */
const KnouxFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// Custom hook to access field-related context: name, IDs, and validation states.
const useKnouxFormField = () => {
  // Retrieve context from FormField and FormItem.
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext(); // Access form state and helpers from react-hook-form.

  // Get the current state of the field (error, touched, etc.).
  const fieldState = getFieldState(fieldContext.name, formState);

  // Ensure the hook is used within the correct hierarchy.
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Combine IDs for accessibility - linking label, input, description, and message.
  const { id } = itemContext; // ID provided by FormItem.

  return {
    id, // Unique ID for the FormItem.
    name: fieldContext.name, // The name of the field from react-hook-form.
    formItemId: `${id}-form-item`, // ID for the input element.
    formDescriptionId: `${id}-form-item-description`, // ID for the description element.
    formMessageId: `${id}-form-item-message`, // ID for the validation message element.
    ...fieldState, // Spread the error, dirty, touched state.
  };
};

// Context for passing down the unique ID generated for each FormItem.
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

/**
 * @KnouxFormItem
 * A container for a form field, providing layout and accessibility linkage.
 * Generates a unique ID for its children. Styled with Knoux's standard spacing.
 */
const KnouxFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Generate a unique ID for accessibility (linking label, input, description, message).
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      {/* Base container for the form item, applying Knoux's vertical spacing. */}
      <div
        ref={ref}
        className={cn("space-y-2.5", className)} // Increased vertical spacing for better air.
        {...props}
      />
    </FormItemContext.Provider>
  );
});
KnouxFormItem.displayName = "KnouxFormItem"; // Explicitly branded display name.

/**
 * @KnouxFormLabel
 * Label for a form field. Connects to the input via the `formItemId`.
 * Styles are driven by validation state (error color). Uses Knoux's Label component.
 */
const KnouxFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Uses Radix Label primitive as base.
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Access form field state to determine if an error exists.
  const { error, formItemId } = useKnouxFormField();

  return (
    <KnouxLabel // Utilizing the custom Knoux Label component for consistent styling.
      ref={ref}
      htmlFor={formItemId} // Linking label to the input element for accessibility.
      // Styling: Error state dynamically changes label color to destructive (gold accent).
      className={cn(error && "text-gold-400", className)}
      {...props}
    />
  );
});
KnouxFormLabel.displayName = "KnouxFormLabel"; // Explicitly branded display name.

/**
 * @KnouxFormControl
 * Wrapper for the actual form input (Input, Select, etc.).
 * Connects input attributes (`id`, `aria-describedby`, `aria-invalid`)
 * to the context derived from `useFormField`.
 */
const KnouxFormControl = React.forwardRef<
  // Using `Slot` allows replacing this div with the actual input element if needed.
  // The ref will be forwarded to the slotted component.
  HTMLDivElement, // Type remains div but handles forwarding to different elements.
  React.ComponentPropsWithoutRef<typeof Slot> // Accepts props for the slotted element.
>(({ ...props }, ref) => {
  // Retrieve field state for accessibility attributes.
  const { error, formItemId, formDescriptionId, formMessageId } = useKnouxFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId} // Set the ID for the input element.
      // aria-describedby links the input to its description and error message.
      aria-describedby={
        !error
          ? `${formDescriptionId}` // Only include description ID if no error.
          : `${formDescriptionId} ${formMessageId}` // Include both if there's an error.
      }
      aria-invalid={!!error} // Mark input as invalid if there's an error.
      {...props}
    />
  );
});
KnouxFormControl.displayName = "KnouxFormControl"; // Explicitly branded display name.

/**
 * @KnouxFormDescription
 * Provides a description for a form field. Styled with Knoux's muted secondary text.
 */
const KnouxFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  // Get the ID for the description from the field context.
  const { formDescriptionId } = useKnouxFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId} // Link description to input via ID.
      // Styling: Subtle text using Knoux's secondary color and font for clarity.
      className={cn("text-sm font-sans text-slate-gray", className)}
      {...props}
    />
  );
});
KnouxFormDescription.displayName = "KnouxFormDescription"; // Explicitly branded display name.

/**
 * @KnouxFormMessage
 * Displays validation error messages. Styled prominently with Knoux's destructive (gold) color.
 */
const KnouxFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // Get the error and message ID from field context.
  const { error, formMessageId } = useKnouxFormField();
  // Determine the message content: use error message from react-hook-form, or children prop if provided.
  const body = error ? String(error?.message) : children;

  // If there's no message content, don't render anything.
  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId} // Link message to input via ID.
      // Styling: Distinctive destructive styling (gold color) for error messages.
      className={cn(
        "text-sm font-serif font-medium", // Using serif for error titles for prominence.
        "text-gold-400", // Using Knoux's premium gold for error emphasis.
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "KnouxFormMessage"; // Explicitly branded display name.

// --- Exporting Knoux Branded Form Components ---
// Exporting all form components with their standard names for broad compatibility,
// ensuring that the internal implementation is fully customized for Knoux's aesthetic and function.
export {
  useKnouxFormField as useFormField, // Exporting custom hook.
  Form, // Re-exporting FormProvider.
  KnouxFormItem as FormItem, // Exporting custom form item.
  KnouxFormLabel as FormLabel, // Exporting custom label.
  KnouxFormControl as FormControl, // Exporting custom form control wrapper.
  KnouxFormDescription as FormDescription, // Exporting custom description.
  FormMessage as KnouxFormMessage, // Exporting custom message.
  KnouxFormField as FormField, // Exporting custom field.
};
