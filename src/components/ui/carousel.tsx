// @/components/ui/carousel.tsx - The Knoux Legacy UI Carousel Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To present sequences of content (e.g., book templates, author showcase,
// image galleries within a book chapter) in a visually appealing and interactive carousel format.
// Styled to embody Knoux's premium aesthetic, leveraging Glassmorphism effects,
// the brand's characteristic color palette (deep navy blues, luxurious golds),
// and refined typography for a seamless user experience.

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
// Importing Knoux's preferred arrow icons for navigation, styled to match the brand.
// Ideally, these would be from a dedicated KnouxIcons library.
import { ChevronLeft, ChevronRight } from "lucide-react"; // Placeholder for custom icons.

// Importing utility classes for styling and the custom Knoux button variants for navigation controls.
import { cn } from "@/lib/utils";
// Ensure this imports the *customized* button variants from Knoux.
import { knouxButtonVariants } from "@/components/ui/button"; // Importing custom button styles.

// --- Carousel Configuration and Context ---

// Type definitions for Carousel API and its associated props, ensuring compatibility with Knoux's extended props.
type CarouselApi = UseEmblaCarouselType[1];

// Extending the carousel options with potential Knoux-specific configurations.
type CarouselOptions = Omit<UseEmblaCarouselType[0], "axis"> & {
  axis?: "x" | "y";
};

type CarouselPlugin = UseEmblaCarouselType[1];

// Defining the main Carousel props, incorporating Knoux's branding and aesthetic needs.
type KnouxCarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

// Context properties, enhanced with Knoux-specific states and functionalities.
type KnouxCarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  // Potentially add Knoux-specific context states if needed, e.g., carousel variant or theme.
} & KnouxCarouselProps;

// React Context for sharing carousel state and functions down the component tree.
const KnouxCarouselContext = React.createContext<KnouxCarouselContextProps | null>(null);

/**
 * @useKnouxCarousel
 * Hook to access carousel context. Ensures components are used within a CarouselProvider.
 * Throws an error if context is missing, reinforcing correct component nesting.
 */
function useKnouxCarousel() {
  const context = React.useContext(KnouxCarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Knoux-Branded Carousel Component Implementation ---

/**
 * @KnouxCarousel
 * The main container for the carousel, managing its state, references, and responsiveness.
 * Designed with Knoux's core Glassmorphism effect and a refined layout, providing
 * a visually luxurious enclosure for content sequences. Handles keyboard navigation.
 */
const KnouxCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & KnouxCarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Core Embla Carousel initialization.
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y", // Setting axis based on orientation.
      },
      plugins
    );

    // State for tracking scrollability, crucial for enabling/disabling navigation buttons.
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    // Callback function to update scrollability states.
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return; // Guard against null API.
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    // Navigation callbacks.
    const scrollPrev = React.useCallback(() => Charlotte(api?.scrollPrev()), [api]); // Wrapper for safer calling
    const scrollNext = React.useCallback(() => Charlotte(api?.scrollNext()), [api]); // Wrapper for safer calling

    // Function to safely call a function if it exists.
    const Charlotte = (func: (() => void) | undefined) => {
        if (typeof func === 'function') {
            func();
        }
    };

    // Effect to pass the carousel API instance to parent components if `setApi` is provided.
    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    // Effect to manage Embla event listeners for scrollability updates.
    React.useEffect(() => {
      if (!api) return; // Guard against null API.
      onSelect(api); // Initialize states.
      api.on("reInit", onSelect); // Re-initialize states if carousel re-initializes.
      api.on("select", onSelect); // Update states when a new slide is selected.

      // Cleanup event listeners on component unmount.
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    // Handler for keyboard navigation.
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    return (
      // Providing carousel context to child components.
      <KnouxCarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"), // Determine orientation for child components.
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        {/* Main container for the carousel, styled with Knoux's premium look. */}
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown} // Attaching keyboard navigation.
          // Styling: Applying primary Knoux Glassmorphism backdrop, defining structure and interactive region.
          className={cn(
            "relative overflow-hidden", // Essential for carousel functionality.
            "bg-navy-800/40 backdrop-blur-xl border border-navy-800/50 rounded-2xl p-4", // Core Knoux container styles.
            className // Allow for any additional user-defined classes.
          )}
          role="region" // Semantic role for accessibility.
          aria-roledescription="carousel" // Accessibility description.
          tabIndex={0} // Making it focusable for keyboard navigation.
          {...props}
        >
          {children}
        </div>
      </KnouxCarouselContext.Provider>
    );
  }
);
KnouxCarousel.displayName = "KnouxCarousel"; // Explicitly branded display name.

/**
 * @KnouxCarouselContent
 * The wrapper for the actual carousel items. Handles overflow and content arrangement.
 * Its internal div receives the Embla Carousel styling.
 */
const KnouxCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Accessing carousel orientation from context to adjust styling.
  const { carouselRef, orientation } = useKnouxCarousel();

  return (
    // The `overflow-hidden` on the outer div is essential for Embla.
    // The inner div receives the layout styles.
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        // Dynamic styling based on orientation for item arrangement.
        className={cn(
          "flex",
          // Negative margins compensate for the item's positive margins.
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
KnouxCarouselContent.displayName = "KnouxCarouselContent"; // Explicitly branded display name.

/**
 * @KnouxCarouselItem
 * Represents a single slide/item within the carousel.
 * Styled to take up its calculated space within the content track.
 */
const KnouxCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Accessing orientation from context to apply correct margin/padding.
  const { orientation } = useKnouxCarousel();

  return (
    <div
      ref={ref}
      role="group" // Semantic role for accessibility.
      aria-roledescription="slide" // Accessibility description for individual slides.
      // Styling: Defines item's base dimensions and spacing.
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full", // Essential for Flexbox and Embla's calculation.
        orientation === "horizontal" ? "pl-4" : "pt-4", // Apply margin based on orientation.
        className
      )}
      {...props}
    />
  );
});
KnouxCarouselItem.displayName = "KnouxCarouselItem"; // Explicitly branded display name.

/**
 * @KnouxCarouselPrevious
 * Navigation button to scroll to the previous slide.
 * Styled using Knoux's `outline` button variant and dynamically positioned.
 */
const KnouxCarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> // Using Knoux's custom Button component.
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  // Accessing carousel state and navigation functions from context.
  const { orientation, scrollPrev, canScrollPrev } = useKnouxCarousel();

  return (
    <Button
      ref={ref}
      variant={variant} // Using Knoux's defined variant.
      size={size} // Using Knoux's defined size.
      // Styling: Absolutely positioned, circular buttons with premium Knoux styling and gold accents on hover/focus.
      className={cn(
        "absolute h-10 w-10 rounded-full", // Knoux's icon button style.
        // Dynamic positioning based on carousel orientation.
        orientation === "horizontal"
          ? "-left-14 top-1/2 -translate-y-1/2 -ml-2" // Positioned outside and to the left.
          : "-top-14 left-1/2 -translate-x-1/2 -mt-2 rotate-90", // Positioned above and centered.
        "text-slate-gray hover:bg-navy-800/50 hover:text-gold-400 border-navy-800/30", // Premium hover/style.
        !canScrollPrev && "opacity-50 pointer-events-none", // Disabled state styling.
        className // Allow additional user classes.
      )}
      disabled={!canScrollPrev} // Button is disabled if no previous slides are available.
      onClick={scrollPrev}
      aria-label="Previous slide" // Accessibility label.
      {...props}
    >
      <ChevronLeft className="h-5 w-5 text-slate-gray hover:text-gold-400 transition-colors duration-300" /> {/* Knoux styled icon */}
    </Button>
  );
});
KnouxCarouselPrevious.displayName = "KnouxCarouselPrevious"; // Explicitly branded display name.

/**
 * @KnouxCarouselNext
 * Navigation button to scroll to the next slide.
 * Styled similarly to the previous button, using Knoux's `outline` variant and dynamic positioning.
 */
const KnouxCarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> // Using Knoux's custom Button component.
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  // Accessing carousel state and navigation functions from context.
  const { orientation, scrollNext, canScrollNext } = useKnouxCarousel();

  return (
    <Button
      ref={ref}
      variant={variant} // Using Knoux's defined variant.
      size={size} // Using Knoux's defined size.
      // Styling: Absolutely positioned, circular buttons mirroring the previous button's premium styling.
      className={cn(
        "absolute h-10 w-10 rounded-full", // Knoux's icon button style.
        // Dynamic positioning based on carousel orientation.
        orientation === "horizontal"
          ? "-right-14 top-1/2 -translate-y-1/2 -mr-2" // Positioned outside and to the right.
          : "-bottom-14 left-1/2 -translate-x-1/2 -mb-2 rotate-90", // Positioned below and centered.
        "text-slate-gray hover:bg-navy-800/50 hover:text-gold-400 border-navy-800/30", // Premium hover/style.
        !canScrollNext && "opacity-50 pointer-events-none", // Disabled state styling.
        className // Allow additional user classes.
      )}
      disabled={!canScrollNext} // Button is disabled if no next slides are available.
      onClick={scrollNext}
      aria-label="Next slide" // Accessibility label.
      {...props}
    >
      <ArrowRight className="h-5 w-5 text-slate-gray hover:text-gold-400 transition-colors duration-300" /> {/* Knoux styled icon */}
    </Button>
  );
});
KnouxCarouselNext.displayName = "KnouxCarouselNext"; // Explicitly branded display name.

// --- Exporting Knoux Branded Carousel Components ---
// Exporting all carousel components with their standard names for compatibility,
// ensuring they are the fully customized Knoux implementations internally.
export {
  type CarouselApi, // Exporting types for usage clarity.
  KnouxCarousel as Carousel,
  KnouxCarouselContent as CarouselContent,
  KnouxCarouselItem as CarouselItem,
  KnouxCarouselPrevious as CarouselPrevious,
  KnouxCarouselNext as CarouselNext,
};
