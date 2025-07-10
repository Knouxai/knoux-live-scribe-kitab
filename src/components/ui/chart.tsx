// @/components/ui/chart.tsx - The Knoux Legacy UI Chart Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To visualize data elegantly within the application, whether it's
// analytics for book performance, progress tracking, or displaying data patterns
// relevant to user activities (e.g., writing pace, content popularity).
// Styled to seamlessly integrate with Knoux's premium aesthetic, utilizing Glassmorphism,
// brand color palette, and refined typography for a sophisticated and informative data display.

import * as React from "react";
// Importing Recharts primitives for charting capabilities.
import * as RechartsPrimitive from "recharts";
// Importing custom icons, ideally from a Knoux icon library, for enhanced branding.
// Example: import { KnouxChartIcon } from "@/components/ui/KnouxIcons";
import { User } from "lucide-react"; // Placeholder icon, assuming usage in Legend/Tooltip items.

// Importing essential utility classes for composable and theme-adherent styling.
import { cn } from "@/lib/utils";

// --- Knoux Chart Configuration ---
// Defining color themes for charts to be managed via CSS variables, linked to Knoux's palette.
const THEMES = {
  light: "", // Default theme prefix
  dark: ".dark", // Prefix for dark mode (if applicable globally).
} as const;

// Interface for Chart Configuration, allowing specification of labels, icons, and color mapping.
export type KnouxChartConfig = {
  [k in string]: {
    label?: React.ReactNode; // Custom label for legend/tooltip.
    icon?: React.ComponentType; // Custom icon from Knoux's library.
  } & (
    // Option 1: Direct color definition
    | { color?: string; theme?: never }
    // Option 2: Theme-specific colors mapped to CSS variables.
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

// Context for providing chart configuration down to tooltip/legend components.
type ChartContextProps = {
  config: KnouxChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

/**
 * @useKnouxChart
 * Hook to access the chart configuration context. Ensures components are nested correctly.
 * Throws an error if used outside a <ChartContainer>.
 */
function useKnouxChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

// --- Knoux-Branded Chart Components ---

/**
 * @KnouxChartContainer
 * The main wrapper for Recharts components, establishing the responsive container and applying core Knoux styles.
 * This component provides the canvas for the chart, including a glassmorphism backdrop,
 * essential resets, and injecting theme colors via CSS variables.
 */
const KnouxChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: KnouxChartConfig;
    /**
     * @children - Typically contains Recharts components like <LineChart>, <BarChart>, etc.
     */
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  // Generate a unique ID for the chart container for CSS variable scoping.
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      {/* Main container div for the chart, applying Knoux's overall aesthetic and specific chart resets. */}
      <div
        data-chart={chartId} // Data attribute for CSS selector targeting.
        ref={ref}
        // Core Styling: Applies essential chart resets, Knoux brand colors for default chart elements (axes, grids, dots),
        // and integrates the glassmorphism effect via backdrop-filter.
        className={cn(
          // Base Glassmorphism Card styling applied to the chart area.
          "relative flex aspect-video h-[350px] w-full justify-center overflow-hidden rounded-3xl border border-navy-800/50 bg-navy-800/50 p-6 py-4 shadow-xl shadow-navy-900/60 backdrop-blur-lg",
          // Recharts Primitive overrides and general chart styling for clean appearance.
          "[&_.recharts-cartesian-axis-tick_text]:fill-slate-gray [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-gold-400 [&_.recharts-dot[fill='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          // Knoux specific overrides: Using gold for crucial lines and keeping elements muted yet elegant.
          "[&_.recharts-axis-label]:text-slate-gray [&_.recharts-label]:text-slate-gray [&_.recharts-cartesian-grid]-[&>.recharts-grid-horizontal>&>.recharts-gridline]:border-t-[rgba(136,146,176,0.3)]", // Muted grid lines.
          className
        )}
        {...props}
      >
        {/* Dynamic CSS variables for colors are injected here. */}
        <KnouxChartStyle id={chartId} config={config} />
        {/* Recharts' responsive container ensures charts adapt to parent size. */}
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
KnouxChartContainer.displayName = "KnouxChartContainer"; // Explicitly branded display name.

/**
 * @KnouxChartStyle
 * Component to dynamically inject CSS variables into the SVG chart based on the provided config.
 * This allows charts to easily adopt the Knoux color theme programmatically.
 */
const KnouxChartStyle = ({ id, config }: { id: string; config: KnouxChartConfig }) => {
  // Filter entries that have color definitions.
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  // Render null if no colors are configured to avoid unnecessary DOM manipulation.
  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      // Dangerously set HTML to inject the CSS variables, scoped to the chart ID.
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] { // Scopes styles to the specific chart container.
${colorConfig
  .map(([key, itemConfig]) => {
    // Determine the color: priority to theme-specific color, then direct color.
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || // Theme-specific color.
      itemConfig.color; // Direct color.
    // If a color is found, define the CSS variable.
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// Recharts Tooltip and Legend components are used as base, with their usage managed via Knoux context.
const KnouxChartTooltip = RechartsPrimitive.Tooltip;
const KnouxChartLegend = RechartsPrimitive.Legend;

/**
 * @KnouxChartTooltipContent
 * Customizable tooltip for displaying data points.
 * Extends Recharts' Tooltip to include Knoux's branding, glassmorphism, and intelligent display logic.
 * Supports custom formatting and indicators.
 */
const KnouxChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  // Combining Recharts Tooltip props with custom div props and specific Knoux enhancements.
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean; // Option to hide the category label (e.g., date, name).
      hideIndicator?: boolean; // Option to hide the color indicator.
      indicator?: "line" | "dot" | "dashed"; // Style for the color indicator.
      nameKey?: string; // Key for the item name in payload.
      labelKey?: string; // Key for the label in payload.
    }
>(
  (
    {
      // Recharts props
      active,
      payload,
      formatter,
      color,
      label,
      labelFormatter,
      // Custom/Div props
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    // Accessing the chart configuration from context to map keys to labels and icons.
    const { config } = useKnouxChart();

    // Memoizing the tooltip label for performance and cleaner logic.
    const tooltipLabel = React.useMemo(() => {
      // If label is hidden, no payload, or no value found, return null.
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload; // Get the first item to extract label info.
      // Determine the key to look up config: labelKey > dataKey > name > default "value".
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      // Retrieve specific config item (label, icon) for this payload entry.
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      // Use the config's label if available, otherwise fallback to the payload's label.
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label // Use config label if found for the root label, else fallback.
          : itemConfig?.label; // Use item-specific label from config.

      // If a custom label formatter is provided, use it.
      if (labelFormatter) {
        return (
          <div className={cn("font-medium text-off-white", labelClassName)}> {/* Apply Knoux font and color */}
            {labelFormatter(value, payload)}
          </div>
        );
      }

      // If no value is found for the label, return null.
      if (!value) {
        return null;
      }

      // Return the extracted label, styled with Knoux's premium font and color.
      return <div className={cn("font-medium text-off-white", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]); // Dependencies for memoization.

    // If tooltip is inactive or has no payload, render nothing.
    if (!active || !payload.length) {
      return null;
    }

    // Check if the label is nested within items (payload length === 1) and indicator is not 'dot'.
    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        // Styling: The tooltip container is designed as a glassmorphic card with premium padding and subtle shadow.
        className={cn(
          "grid min-w-[10rem] items-start gap-2.5 rounded-xl border border-navy-800/50 bg-navy-800/70 px-3.5 py-2 text-xs shadow-xl backdrop-blur-lg", // Knoux card styling for tooltips.
          className // Allow external class overrides.
        )}
      >
        {/* Render the main category label if not nested. */}
        {!nestLabel ? tooltipLabel : null}
        {/* Render the list of payload items */}
        <div className="grid gap-1.5">
          {payload.map((item) => {
            // Determine the key for accessing item configuration (label, icon).
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            // Get color for the indicator, falling back to default color if not found.
            const indicatorColor = color || item.payload.fill || item.color || "var(--color-primary)"; // Fallback color for indicator.

            return (
              <div
                key={item.dataKey} // Use unique dataKey for React key.
                // Styling: Flexible item layout with spacing for icons, text, and values.
                className={cn(
                  "flex w-full flex-wrap items-center gap-2", // Layout for each item in the tooltip.
                  indicator === "dot" && "items-center" // Adjust alignment for dot indicators.
                )}
              >
                {/* Custom formatter function allows complete control over item display. */}
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  // Default rendering if no formatter is provided.
                  <>
                    {/* Render custom icon if available in config, otherwise fall back to indicator. */}
                    {itemConfig?.icon && !hideIndicator ? (
                      <itemConfig.icon className="h-4 w-4 text-gold-400" /> // Use config icon, applying gold color for emphasis.
                    ) : (
                      // Render the color indicator dot, line, or dashed line based on props.
                      !hideIndicator && (
                        <div
                          className={cn(
                            // Base styling for indicator based on type.
                            "shrink-0 rounded-[2px]",
                            {
                              "h-2.5 w-2.5": indicator === "dot", // Square dot for consistency.
                              "w-3 border-b-2": indicator === "line", // Line indicator.
                              "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", // Dashed indicator.
                            }
                          )}
                          // Applying color via CSS variables for dynamic theming.
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        // Grid for nesting label/name and value.
                        "flex flex-1 justify-between",
                        nestLabel ? "items-end" : "items-center" // Adjust vertical alignment if label is nested.
                      )}
                    >
                      {/* Label group: Contains category label (if nested) and item name/label. */}
                      <div className="grid gap-1.5">
                        {/* Render the main category label if it's nested. */}
                        {nestLabel ? tooltipLabel : null}
                        {/* Render the item name/label from config or payload. */}
                        <span className="text-slate-gray font-sans"> {/* Use sans-serif for labels. */}
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {/* Render the item value, styled as monospaced numbers for precision. */}
                      {item.value !== undefined && ( // Ensure value exists before rendering.
                        <span className="font-mono font-medium tabular-nums text-off-white"> {/* Knoux numbers styling. */}
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
KnouxChartTooltipContent.displayName = "KnouxChartTooltip"; // Explicitly branded display name.

/**
 * @KnouxChartLegend
 * Displays the legend for the chart, mapping data keys to their corresponding visual representations.
 * Leverages Knoux's theming for a visually consistent and informative legend.
 */
const KnouxChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Legend> & {
    // Extending Recharts Legend props with Knoux-specific options.
    hideIcon?: boolean; // Option to hide the color indicators.
    nameKey?: string; // Key to access item name from payload.
  }
>(({ className, ...props }, ref) => {
  // Using context to potentially influence legend behavior based on chart configuration.
  // const { config } = useKnouxChart(); // Not directly used here, but available for future enhancements.

  return (
    <RechartsPrimitive.Legend
      ref={ref}
      // Styling: Centered legend with generous spacing and optional icons.
      // Core layout styles are applied here.
      className={cn(
        "flex items-center justify-center gap-4 pt-4", // Centered layout, Knoux spacing.
        className
      )}
      {...props}
    />
  );
});
KnouxChartLegend.displayName = "KnouxChartLegend"; // Explicitly branded display name.


/**
 * @KnouxChartLegendContent
 * Customizable content for the legend items.
 * Displays icons (or color swatches) and labels for each data series, styled per Knoux theme.
 */
const KnouxChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean; // Option to hide icons.
      nameKey?: string; // Key for the item name.
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    // Accessing chart configuration from context to retrieve custom labels and icons.
    const { config } = useKnouxChart();

    // If no payload or configuration exists, render nothing.
    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        // Styling: A visually pleasing container for the legend, aligning items with Knoux's spacing and typography.
        className={cn(
          "flex items-center justify-center gap-4", // Centered layout with Knoux spacing.
          // Adjust vertical padding based on verticalAlign prop.
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
        {...props}
      >
        {/* Map over payload items to render each legend entry. */}
        {payload.map((item) => {
          // Determine the key for accessing item configuration.
          const key = `${nameKey || item.dataKey || "value"}`;
          // Retrieve the specific item configuration (label, icon, color) from the chart config.
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value} // Unique key for React rendering.
              // Styling: Each legend item styled for alignment and Knoux brand adherence.
              className={cn(
                "flex items-center gap-1.5", // Item layout.
                "[&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-slate-gray" // Styling for icons, using Knoux's grey for muted icons.
              )}
            >
              {/* Render custom icon if available in config and not hidden, otherwise render color swatch. */}
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon className="h-4 w-4 text-gold-400" /> // Render custom icon, with a gold accent.
              ) : (
                // Render a color swatch if no custom icon is available or shown.
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-[4px]" // Small, rounded color swatch.
                  style={{
                    // Apply color dynamically using CSS variables managed by KnouxChartStyle.
                    backgroundColor: item.color || itemConfig?.color || "var(--color-primary)", // Fallback color.
                  }}
                />
              )}
              {/* Display the label, ensuring it's formatted correctly according to config or item data. */}
              <span className="text-slate-gray font-sans text-sm"> {/* Knoux sans-serif font and secondary color for labels. */}
                {itemConfig?.label || item.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);
KnouxChartLegendContent.displayName = "KnouxChartLegendContent"; // Explicitly branded display name.

/**
 * Helper function to safely retrieve configuration details for a specific chart payload item.
 * Handles different ways of identifying the item and accessing its config.
 * @param config - The overall chart configuration.
 * @param payload - The chart payload item from Recharts.
 * @param key - The key used to identify the item in the config.
 * @returns The configuration object for the item, or undefined.
 */
function getPayloadConfigFromPayload(
  config: KnouxChartConfig,
  payload: unknown,
  key: string
) {
  // Basic type check for payload.
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  // Safely access nested payload data if present.
  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key; // Default to the initial key.

  // Try to find the actual label key from payload properties.
  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  // Return the configuration item from the main config based on the identified key,
  // or fallback to the main config key if the direct lookup fails.
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

// --- Exporting Knoux-Branded Chart Components ---
// Exporting components with standard names for broader compatibility,
// while ensuring internal implementation adheres strictly to Knoux's brand.
export {
  KnouxChartContainer as ChartContainer, // Exporting custom container as 'ChartContainer'.
  KnouxChartTooltip as ChartTooltip, // Exporting custom tooltip as 'ChartTooltip'.
  KnouxChartTooltipContent as ChartTooltipContent, // Exporting custom tooltip content.
  KnouxChartLegend as ChartLegend, // Exporting custom legend as 'ChartLegend'.
  KnouxChartLegendContent as ChartLegendContent, // Exporting custom legend content.
  KnouxChartStyle, // Exporting the styling utility.
};
