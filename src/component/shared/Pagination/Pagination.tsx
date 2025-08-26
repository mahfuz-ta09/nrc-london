import '../../../css/shared/Pagination/Pagination.css'

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max))

const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const Pagination: React.FC<PaginationProps> = ({totalPages,currentPage,onPageChange,siblingCount = 1,className = ""}) => {
    if (totalPages <= 1) return null

    const DOTS = "…"


    const buildPages = () => {
        const firstPage = 1;
        const lastPage = totalPages;
        const leftSibling = Math.max(currentPage - siblingCount, firstPage);
        const rightSibling = Math.min(currentPage + siblingCount, lastPage);

        const showLeftDots = leftSibling > firstPage + 1;
        const showRightDots = rightSibling < lastPage - 1;

        if (!showLeftDots && showRightDots) {
            const leftRange = range(firstPage, 2 + 2 * siblingCount);
            return [...leftRange, DOTS, lastPage];
        } else if (showLeftDots && !showRightDots) {
            const rightRange = range(lastPage - (2 + 2 * siblingCount), lastPage);
            return [firstPage, DOTS, ...rightRange];
        } else if (showLeftDots && showRightDots) {
            const middleRange = range(leftSibling, rightSibling);
            return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
        }
        // no dots needed
        return range(firstPage, lastPage);
    }

    const pages = buildPages();

    const goTo = (page: number) => {
        const p = clamp(page, 1, totalPages)
        if (p !== currentPage) onPageChange(p)
    }


    return (
        <nav
            className={`pg-wrap ${className}`}
            role="navigation"
            aria-label="Pagination Navigation">
            <button
                className="pg-btn"
                onClick={() => goTo(1)}
                disabled={currentPage === 1}
                aria-label="First page"
            >
                «
            </button>
            <button
                className="pg-btn"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
            ‹
            </button>

            <ul className="pg-list" role="list">
                {pages.map((p, idx) =>
                p === DOTS ? (
                    <li key={`dots-${idx}`} className="pg-dots" aria-hidden="true">
                    {DOTS}
                    </li>
                ) : (
                    <li key={p}>
                    <button
                        className={`pg-num ${p === currentPage ? "is-active" : ""}`}
                        aria-current={p === currentPage ? "page" : undefined}
                        onClick={() => goTo(p as number)}
                    >
                        {p}
                    </button>
                    </li>
                )
                )}
            </ul>

            <button
                className="pg-btn"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                ›
            </button>
            <button
                className="pg-btn"
                onClick={() => goTo(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
            >
                »
            </button>
        </nav>
    )
}

export default Pagination
