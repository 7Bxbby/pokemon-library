"use client";

type Props = {
    page: number;
    totalPages: number;
    loading?: boolean;
    onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, loading, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    const windowSize = 0;
    const start = Math.max(1, page - windowSize);
    const end = Math.min(totalPages, page + windowSize);
    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);

    const go = (p: number) => {
        if (!loading && p >= 1 && p <= totalPages && p !== page) onPageChange(p);
    };

    const baseBtn =
        "px-3 py-2 rounded-lg cursor-pointer text-xs min-[300px]:text-md min-[400px]:text-lg border border-white/20 text-white/90 hover:bg-white/10 transition disabled:opacity-50 disabled:pointer-events-none";
    const activeBtn =
        "px-3 py-2 rounded-lg cursor-default text-xs min-[300px]:text-md min-[400px]:text-lg bg-white/20 border border-white/20 text-white font-semibold";

    return (
        <nav className="flex items-center gap-0.5 min-[300px]:gap-2 justify-center select-none">
            <button className={baseBtn} onClick={() => go(page - 1)} disabled={loading || page === 1} aria-label="Previous page">
                ‹
            </button>

            {start > 1 && (
                <>
                    <button className={baseBtn} onClick={() => go(1)}>1</button>
                    {start > 2 && <span className="px-1 text-white/60">…</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    className={p === page ? activeBtn : baseBtn}
                    onClick={() => go(p)}
                    aria-current={p === page ? "page" : undefined}
                >
                    {p}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-1 text-white/60">…</span>}
                    <button className={baseBtn} onClick={() => go(totalPages)}>{totalPages}</button>
                </>
            )}

            <button className={baseBtn} onClick={() => go(page + 1)} disabled={loading || page === totalPages} aria-label="Next page">
                ›
            </button>
        </nav>
    );
}
