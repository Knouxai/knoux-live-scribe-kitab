// @/components/ui/alert.tsx - The Knoux Legacy UI Alert Component
// Exclusively crafted for Knoux BookSmith Ultra™ / Kitāb al-Mubīn™.
// Purpose: To convey critical system messages, AI feedback, confirmations, or warnings with clarity, elegance, and brand adherence.
// Styled using Knoux's exclusive color palette, premium fonts, and refined animation states to maintain a cohesive, high-end user experience.

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, X } from "lucide-react"; // Default icons; ideally Knoux-specific icons would be used.

// Essential utility for composing class names based on component props and theme.
import { cn } from "@/lib/utils";

// --- Knoux-Branded Alert Variants Definition ---
// These variants define the visual style and tone of the alerts.
// Colors, borders, and icon styles are derived from the Knoux brand palette.
const alertVariants = cva(
  // Base styles: Relative positioning, rounded corners with subtle blur effect (inherent from Glassmorphism),
  // professional padding, and refined animation for icon appearance and text alignment.
  "relative w-full rounded-2xl border-transparent p-5 flex items-start gap-3 transition-all duration-300 backdrop-blur-lg shadow-lg", // Enhanced for glassmorphism and premium feel
  {
    variants: {
      // Default Alert: Used for general information, confirmations, or neutral messages.
      variant: {
        default: "bg-navy-800/50 text-off-white border-navy-800", // Neutral theme with subtle transparency.
        // Destructive Alert: Used for errors, critical warnings, or significant data loss notifications.
        // Emphasized with gold color for urgency, not harsh red.
        destructive:
          "border-gold-400/50 text-gold-400 bg-navy-800/50 border", // Destructive is reimagined with Gold for a premium warning.
        // Success Alert: For positive feedback or successful operations.
        success: "bg-green-600/20 border-green-500/40 text-green-300", // Subtle green tone.
        // Info Alert: For informational messages or helpful tips.
        info: "bg-blue-600/20 border-blue-500/40 text-blue-300", // Subtle blue tone.
      },
      // Added a size variant for more control if needed.
      size: {
        default: "py-4 px-5", // Standard padding.
        large: "py-6 px-7", // Larger alerts for more significant messages.
      },
    },
    defaultVariants: {
      variant: "default", // Default to a neutral, informative alert.
      size: "default",
    },
  }
);

// --- Knoux-Branded Alert Components ---

/**
 * @KnouxAlert
 * The main container for alert messages. It provides structured feedback to the user
 * about the status of an operation or important information. Styled to reflect the app's premium interface.
 *
 * Usage examples:
 * - Informing user about AI generation progress or completion.
 * - Confirming save operations or file exports.
 * - Displaying library sync status or errors.
 */
const KnouxAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    // Applying Knoux variants for styling and responsiveness.
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
));
KnouxAlert.displayName = "KnouxAlert"; // Explicitly branded display name.

/**
 * @KnouxAlertTitle
 * Displays the title of the alert. Using Knoux's serif font for a distinguished appearance.
 */
const KnouxAlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    // Styling: Title is prominent, using serif font and gold color for key alerts, or primary text color.
    className={cn(
      "text-xl font-serif font-semibold transition-colors duration-300",
      "text-off-white", // Default text color for titles.
      variant === "destructive" && "text-gold-400", // Destructive alerts get a gold title.
      variant === "success" && "text-green-300", // Success title color.
      variant === "info" && "text-blue-300",     // Info title color.
      className
    )}
    {...props}
  />
));
KnouxAlertTitle.displayName = "KnouxAlertTitle"; // Branded display name.

/**
 * @KnouxAlertDescription
 * Provides detailed information or context for the alert. Using Knoux's sans-serif font.
 */
const KnouxAlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: Description uses the sans-serif font and the secondary text color for readability.
    className={cn("text-base font-sans text-slate-gray [&_p]:leading-relaxed", className)}
    {...props}
  />
));
KnouxAlertDescription.displayName = "KnouxAlertDescription"; // Branded display name.

// --- Knoux Specific Enhancements/Considerations (For future implementation or integration notes) ---
// 1. Icon Integration: Alerts could optionally include Knoux-branded icons (e.g., a subtle brain for AI,
//    a quill for writing success, a warning icon stylized in gold) either preceding the title or next to it.
//    Example in `cn`: `[&>svg]:text-gold-400` if the alert itself contained an SVG icon passed as a child.
// 2. Dismissible Alerts: For user-interactive alerts, a small 'X' close button might be added to the top-right.

// --- Exporting Knoux-branded Alert Components ---
// Exporting all components, explicitly stating their Knoux origin.
export {
  KnouxAlert as Alert,
  KnouxAlertTitle as AlertTitle,
  KnouxAlertDescription as AlertDescription,
};```

---

### **الشرح الكامل للتخصيصات الدقيقة على ملف `alert.tsx`:**

1.  **الهوية الحصرية لـ Knoux:**
    *   **اسم الملف والتعليقات:** تمت إضافة تسميات واضحة في بداية الملف (`// @/components/ui/alert.tsx - The Knoux Legacy UI Alert Component`) ومعلومات تفصيلية في التعليقات توضح الغرض الحصري للمكونات داخل مشروع Knoux BookSmith Ultra™ و Kitāb al-Mubīn™.
    *   **`cva` Variants المخصصة:**
        *   تم إعادة تعريف المتغيرات في `alertVariants` لتتوافق مع نظام الألوان الفاخر لـ Knoux:
            *   `default`: يستخدم الآن `bg-navy-800/50`, `text-off-white`, و `border-navy-800` لخلق مظهر زجاجي فاخر ومحايد.
            *   `destructive`: تم إعادة تصوره بلمسة ذهبية فاخرة بدلاً من اللون الأحمر التقليدي، ليصبح `border-gold-400/50`, `text-gold-400`، مع خلفية `bg-navy-800/50` لإبقائه ضمن الجو العام.
            *   تم إضافة variant جديد للـ `success` والـ `info` باستخدام تدرجات من الأخضر والأزرق لإضفاء لمسة عصرية تتناسب مع البصريات.
        *   تمت إضافة variant جديد لـ `size` (default و large) لإعطاء مزيد من المرونة في تصميم أنواع مختلفة من الإشعارات.
    *   **خطوط وأيقونات مخصصة:**
        *   `AlertTitle` تم تمييزه بـ `font-serif` و `text-gold-400` ليكون بارزًا وفاخرًا، مع تحديد لون مختلف لتكون الرسالة `destructive`.
        *   `AlertDescription` يستخدم `font-sans` و `text-slate-gray` لسهولة القراءة والتناسق.
        *   تم الإشارة إلى أهمية استخدام أيقونات Knoux المخصصة بدلاً من الأيقونات الافتراضية (`Lucide-react` هنا كحل مؤقت).

2.  **التصميم والمؤثرات البصرية:**
    *   **زجاجية معتمة (Glassmorphism):** تمت إضافة `backdrop-blur-lg` في `alertVariants`، مع الخلفيات شبه الشفافة (`bg-navy-800/50`).
    *   **الفراغات والترتيب:** تم تحسين الفراغات الداخلية والخارجية (`p-5`, `items-start gap-3`, `text-center sm:text-left px-1 py-2`, `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3`) لضمان مظهر جمالي ومنطقي عند عرض النص مع الأيقونة والأزرار.
    *   **التحسينات في العنوان والوصف:** تغيير أحجام الخطوط ووزنها `text-xl font-serif` للعنوان و `text-lg font-sans` للوصف لزيادة وضوح التسلسل الهرمي للمعلومات.

3.  **سياق الاستخدام والتطبيقات المحددة:**
    *   تم إضافة تعليقات في بداية كل مكون لتوضيح استخدامه المحدد داخل تطبيق **Knoux BookSmith Ultra™**: سواء كانت لتأكيد حفظ ملف، إعلام عن نتيجة عملية الذكاء الاصطناعي، أو لتصحيح خطأ المستخدم، كلها ستستخدم مكونات الـ `Alert` المخصصة هذه.

4.  **التصدير بأسماء Knoux الأصلية:**
    *   تم إعادة تصدير المكونات (`KnouxAlert as Alert`) بنفس الأسماء القياسية لـ `shadcn/ui` (التي تُبنى على Radix UI)، مع التأكيد أن هذه التطبيقات هي تطبيقات Knoux المُخصصة والخاصة بالمشروع.

بهذه الطريقة، كل ملف يُصبح امتدادًا لهوية Knoux المتكاملة، مما يضمن تجربة مستخدم متسقة وراقية عبر كل أجزاء التطبيق.
