import React from "react";

type StatRowProps = {
    label: string;
    icon: React.ReactNode;
    value: number;
    max?: number;
};

const MAX_BASE_STAT = 150;
const pct = (v: number, max = MAX_BASE_STAT) => Math.min(100, Math.round((v / max) * 100));

const statColor = (n: number) =>
    n >= 90 ? "bg-emerald-500"
        : n >= 60 ? "bg-amber-500"
            : n >= 30 ? "bg-orange-500"
                : "bg-rose-500";

export default function StatRow({ label, icon, value, max }: StatRowProps) {
    return (
        <div className="flex max-[450px]:items-start items-center max-[450px]:flex-col flex-row max-[450px]:gap-0.5 gap-4">
            <div className="flex w-36 items-center gap-2 text-white/90">
                <span>{icon}</span>
                <span className="font-semibold">{label}</span>
            </div>
            <div className="flex items-center flex-1 w-full">
                <div className={'h-3 w-full rounded-full bg-black/20 dark:bg-white/10 overflow-hidden'}>
                    <div
                        className={`h-full rounded-full transition-[width] duration-700 ease-out ${statColor(value)}`}
                        style={{ width: `${pct(value, max)}%` }}
                    />
                </div>
                <div className="w-12 text-right font-bold">{value}</div>
            </div>
        </div>
    );
}