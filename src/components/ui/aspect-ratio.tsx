// @/components/ui/aspect-ratio.tsx - The Knoux Legacy UI Aspect Ratio Component
// Exclusively designed for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To ensure visual elements (images, placeholders, embedded media) maintain their
// aspect ratio consistently across various displays and within the structured layouts of Knoux books.
// This guarantees a professional and visually appealing presentation, essential for book covers,
// internal illustrations, and preview windows.

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// Importing the cn utility from the Knoux library for composable class names.
// This ensures all styling adheres strictly to the Knoux Tailwind theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded AspectRatio Components ---

/**
 * @KnouxAspectRatio
 * The root component that wraps content to enforce a specific aspect ratio.
 * This is crucial for maintaining visual integrity and adherence to design standards within Kitāb al-Mubīn™.
 * Ensures images for book covers, illustrations within chapters, or preview windows are displayed correctly.
 */
const KnouxAspectRatio = AspectRatioPrimitive.Root;
KnouxAspectRatio.displayName = "KnouxAspectRatio"; // Explicitly branding the component.

// --- Exporting Knoux-Branded AspectRatio Component ---
// Exporting it with the standard name 'AspectRatio' for compatibility,
// but with the understanding that this is the Knoux-specific, highly tuned implementation.
export {
  KnouxAspectRatio as AspectRatio,
};
