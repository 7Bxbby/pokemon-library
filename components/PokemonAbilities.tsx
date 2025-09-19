import React from "react";
import { Pokemon } from "@/types/pokemon";

interface PokemonAbilitiesProps {
    abilities: Pokemon["abilities"];
}


export default function PokemonAbilities({ abilities } : PokemonAbilitiesProps) {
    return <div className="flex flex-col gap-4">
        {abilities.map((a, i) => (
            <div
                key={`${a.name}-${i}`}
                className={`rounded-xl p-4 ring-1 ${
                    a.isHidden
                        ? "bg-amber-500/15 ring-amber-400/50"
                        : "bg-white/5 ring-white/10"
                }`}
            >
                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">{a.name}</span>
                    {a.isHidden && (
                        <span className="rounded-full bg-amber-400/90 px-2 py-0.5 text-xs font-bold text-black">
                            Hidden
                        </span>
                    )}
                </div>
            </div>
        ))}
    </div>
}