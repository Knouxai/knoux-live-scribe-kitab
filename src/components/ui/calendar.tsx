// @/components/ui/calendar.tsx - The Knoux Legacy UI Calendar Component
// Exclusively crafted for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To provide a sophisticated and intuitive date selection interface for users,
// allowing them to input dates for book creation timelines, event scheduling, or referencing specific historical dates within religious texts.
// This component is styled to match Knoux's premium aesthetic, featuring glassmorphism, custom typography,
// and carefully selected color palettes that complement the overall user experience.

import * as React from "react";
// Importing specific navigation icons from Lucide, with a note to consider Knoux custom icons for full branding.
// Example: import { KnouxChevronLeftIcon, KnouxChevronRightIcon } from "@/components/ui/KnouxIcons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";

// Importing utility classes for styling and the custom Knoux button variants for navigation controls.
import { cn } from "@/lib/utils";
// Importing our own branded button styles for navigation elements within the calendar.
import { knouxButtonVariants } from "@/components/ui/button"; // Ensure this points to the custom button variants.

// Defining the props for the Calendar component, extending Radix DayPicker's props.
export type KnouxCalendarProps = React.ComponentProps<typeof DayPicker> & {
  /**
   * @customClassNames - Allows for injecting additional classNames specific to the Knoux theme for finer control.
   */
  customClassNames?: Partial<
    React.ComponentProps<typeof DayPicker>["classNames"]
  >;
};

/**
 * @KnouxCalendar
 * The primary component for date selection within Knoux BookSmith Ultra™.
 * This component is a highly customized wrapper around `react-day-picker`,
 * styled with Knoux's signature Glassmorphism, premium fonts (serif for titles/months, sans-serif for dates/navigation),
 * and a palette featuring deep navy blues, luxurious golds, and subtle grays.
 * It's designed for clarity, ease of use, and seamless integration into the app's workflow,
 * particularly when referencing historical dates or scheduling publication.
 *
 * Features include:
 * - Glassmorphic caption and navigation buttons.
 * - Knoux button variants for navigation.
 * - Themed text for dates, headers, and disabled cells.
 * - Custom icons for navigation.
 */
const KnouxCalendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: KnouxCalendarProps) => {
  return (
    // Base container for the calendar, with basic padding and potential overall container styles.
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 rounded-xl border border-navy-800/50 bg-navy-800/60 backdrop-blur-lg shadow-xl", className)} // Applying Knoux's core container styling
      classNames={{
        // --- Knoux Theming for DayPicker Components ---

        // `months`: Arranges months side-by-side or stacked, with theme-appropriate spacing and blur.
        months: "flex flex-col sm:flex-row gap-8 sm:gap-12 py-4", // Increased spacing for better air.
        // `month`: Styles a single month block.
        month: "space-y-6", // More vertical space within a month's view.
        // `caption`: The header bar of the month (month name, year, navigation buttons).
        caption: "flex justify-between items-center pt-3 relative", // Position for navigation buttons.
        // `caption_label`: The displayed month and year. Uses Knoux's premium serif font.
        caption_label: "text-xl font-serif font-semibold text-off-white",
        // `nav`: The container for the navigation buttons.
        nav: "space-x-3 flex items-center",
        // `nav_button`: Styles for the previous/next month buttons. Utilizes Knoux's `outline` button style for consistency.
        nav_button: cn(
          // Using Knoux's `outline` button style, but sized smaller and made transparent for navigation.
          knouxButtonVariants({ variant: "outline", size: "sm" }),
          "h-9 w-9 bg-navy-800/50 border-navy-800/30 text-slate-gray hover:bg-navy-800/70 hover:text-gold-400", // Glassy, gold-hovered navigation buttons.
          "focus-visible:ring-gold-400" // Applying Knoux focus state.
        ),
        // Positioning for the previous month button.
        nav_button_previous: "absolute left-3",
        // Positioning for the next month button.
        nav_button_next: "absolute right-3",
        // `table`: The main grid containing days and weekdays.
        table: "w-full border-collapse",
        // `head_row`: The row displaying weekdays (Sun, Mon, etc.).
        head_row: "flex",
        // `head_cell`: Individual weekday header. Uses Knoux's secondary font and color.
        head_cell:
          "text-slate-gray font-sans text-sm rounded-lg w-10 font-medium", // Sans-serif font for weekdays.
        // `row`: A row of days within the calendar grid.
        row: "flex w-full mt-3", // Slightly more spacing between rows.
        // `cell`: The individual day cell container. Styled for interactive states and hover effects.
        cell: cn(
          // Base styling for all cells.
          "relative p-0 text-center",
          // States for selected/hovered cells, including range middle/end.
          "before:absolute before:inset-0 before:rounded-full before:z-0", // Invisible overlay for selection/hover.
          "transition-colors duration-300", // Smooth transitions for all states.
          // Hover state for days
          "cursor-pointer",
          // Selection and range styles
          "[&>[aria-selected='true']]:bg-gold-400 [&>[aria-selected='true']]:text-navy-900 [&>[aria-selected='true']]:shadow-inner", // Selected day gets primary gold.
          // Range middle days: filled background
          "[&>[aria-selected='true'].day-range-middle]:bg-gold-400/50 [&>[aria-selected='true'].day-range-middle]:text-off-white", // Subtle gold fill for range middle.
          // Range end days: round corners
          "[&:has([aria-selected].day-range-end)]:rounded-r-full",
          "[&:has([aria-selected].day-range-start)]:rounded-l-full",
          // Focus state for accessibility, applying gold outline.
          "focus-within:relative focus-within:z-20 focus-within:[&>button]:ring-2 focus-within:[&>button]:ring-gold-400",
          // Outside days style
          "[&>.day-outside]:text-slate-gray/[.7] [&>.day-outside]:opacity-70 [&>.day-outside]:cursor-default", // Muted colors for outside days.
          // Hover for outside days (optional, if distinct hover is needed)
          // "[&>.day-outside:hover]:bg-transparent [&>.day-outside:hover]:text-slate-gray"
        ),
        // `day`: Styles for individual day buttons.
        day: cn(
          // Base styling from Knoux ghost button for a subtle, clean look.
          knouxButtonVariants({ variant: "ghost", size: "icon" }), // Using ghost variant, size icon for uniformity.
          "font-sans text-base font-medium", // Sans-serif for day numbers.
          "text-off-white", // Default text color for days.
          // Selected state, applying Knoux's primary gold and dark text for contrast.
          "aria-selected:bg-gold-400 aria-selected:text-navy-900 aria-selected:shadow-lg aria-selected:shadow-gold-400/30",
          // Today's date, highlighted with a subtle glass effect and gold border.
          " &[data-today=true]:bg-navy-800/[.5] !text-off-white [&[data-today=true]]:border-2 [&[data-today=true]]:border-gold-400", // Today gets subtle blur and gold border.
          // Disabled days: muted and non-interactive styling.
          "disabled:text-slate-gray/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-gray/40",
          // Specific day types for range selection, handled via parent `cell` or directly.
          // The range selection logic is usually applied by `react-day-picker`'s `day_range_middle`, `day_range_end` classes, which we then style here.
          "transition-colors duration-300"
        ),
        // `day_range_end`: Applied by `react-day-picker` for the last day in a range.
        day_range_end: "rounded-r-xl", // Ensuring the range selection has correct rounded corners.
        // `day_range_start`: Applied by `react-day-picker` for the first day in a range.
        day_range_start: "rounded-l-xl",
        // `day_selected`: For days that are actively selected (single date or part of a range).
        // These styles are now handled primarily in the `cell` and `day` direct styling to cover all cases, but kept here for clarity on the underlying classes.
        day_selected: "bg-gold-400 text-navy-900 shadow-lg shadow-gold-400/30", // Knoux's premium selection style.

        // `day_today`: Styles for the current day, if not selected.
        // These styles are applied inline on the day cell itself via `[data-today=true]` for precise control.

        // `day_outside`: Days from adjacent months. These are muted and visually distinct.
        day_outside:
          "text-slate-gray/70 opacity-60 cursor-default", // Muted appearance for outside days.

        // `day_disabled`: For days that cannot be selected.
        day_disabled: "text-slate-gray/50 opacity-50 cursor-not-allowed",

        // `day_range_middle`: For days in the middle of a selected range. These get a blended selection style.
        // These styles are applied inline on the day cell itself via `[aria-selected='true'].day-range-middle` for precise control.

        // `day_hidden`: For days that should not be visible (e.g., in compact views).
        day_hidden: "invisible",

        // Allow merging of custom classNames passed from props.
        ...classNames,
      }}
      // Customizing the navigation icons to match Knoux's icon style and branding.
      components={{
        IconLeft: ({ ..._props }) => (
          <ChevronLeft className="h-5 w-5 text-slate-gray hover:text-gold-400 transition-colors duration-300" /> // Knoux-styled ChevronLeft icon.
        ),
        IconRight: ({ ..._props }) => (
          <ChevronRight className="h-5 w-5 text-slate-gray hover:text-gold-400 transition-colors duration-300" /> // Knoux-styled ChevronRight icon.
        ),
      }}
      {...props}
    />
  );
};
KnouxCalendar.displayName = "KnouxCalendar"; // Explicitly branding the component's display name.

// --- Exporting Knoux-Branded Calendar Component ---
// Exporting the component with the standard name 'Calendar' for broader compatibility,
// ensuring it's the fully customized Knoux implementation.
export {
  KnouxCalendar as Calendar,
  // The underlying variant function is also exported if needed elsewhere, though its name is changed.
  knouxButtonVariants as buttonVariants,
};
