import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1 select-none", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  isDisabled?: boolean
  tooltip?: string
  asChild?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, isDisabled, size = "icon", tooltip, children, ...props }, ref) => (
    <a
      ref={ref}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      title={tooltip}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        isDisabled && "pointer-events-none opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  isDisabled,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    isDisabled={isDisabled}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  isDisabled,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    isDisabled={isDisabled}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
  className,
  isDisabled,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to first page"
    size="default"
    className={cn("gap-1 px-2", className)}
    isDisabled={isDisabled}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" />
    <span className="sr-only">First</span>
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
  className,
  isDisabled,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to last page"
    size="default"
    className={cn("gap-1 px-2", className)}
    isDisabled={isDisabled}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" />
    <span className="sr-only">Last</span>
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// منطق توليد الصفحات مع الإليبسيس (مناسب للصفحات الكبيرة)
function usePagination({
  total,
  current,
  max = 7,
}: {
  total: number
  current: number
  max?: number // كم صفحة تظهر كحد أقصى
}) {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const side = Math.floor((max - 3) / 2)
  let pages = [1]
  let left = Math.max(2, current - side)
  let right = Math.min(total - 1, current + side)
  if (left > 2) pages.push("ellipsis-left")
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push("ellipsis-right")
  pages.push(total)
  return pages
}

// مكون جاهز للاستخدام الفعلي مع منطق كامل
export function PaginationBar({
  page,
  setPage,
  totalPages,
  maxButtons = 7,
  onPageChange,
  className
}: {
  page: number
  setPage: (n: number) => void
  totalPages: number
  maxButtons?: number
  onPageChange?: (p: number) => void
  className?: string
}) {
  const pages = usePagination({ total: totalPages, current: page, max: maxButtons })
  const goTo = (n: number) => {
    if (n < 1 || n > totalPages || n === page) return
    setPage(n)
    onPageChange?.(n)
  }
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst isDisabled={page === 1} onClick={() => goTo(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious isDisabled={page === 1} onClick={() => goTo(page - 1)} />
        </PaginationItem>
        {pages.map((p, i) =>
          typeof p === "number" ? (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onClick={() => goTo(p)}
                aria-label={`Go to page ${p}`}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={p + i}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext isDisabled={page === totalPages} onClick={() => goTo(page + 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast isDisabled={page === totalPages} onClick={() => goTo(totalPages)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

// --- التصدير الكامل ---
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  usePagination,
  PaginationBar, // مكون عملي جاهز
}

/*
مميزات النسخة:
- دعم أول وآخر صفحة.
- دعم الإليبسيس التلقائي للصفحات الطويلة.
- دعم تعطيل الأزرار عند الضرورة.
- دعم التفاعل الكامل وتغيير الصفحة.
- يمكن تخصيص maxButtons لعدد صفحات الزر المرئية حول الصفحة الحالية.
- يمكنك ربطه مع state أو أي منطق بيانات آخر مباشرة.
- كل شيء جاهز للاستخدام العملي في أي مشروع.
*/
