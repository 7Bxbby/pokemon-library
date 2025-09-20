import PokemonTypes from "@/components/PokemonTypes";
import React from "react";

export default function EffRow({ title, list }: { title: string; list: { name: string; url: string }[] }) {
    return (
        <div className="rounded-xl border flex flex-col gap-1 border-white/10 p-4">
            <h3 className="text-xl font-semibold pb-1  border-b-2 border-b-white/40 px-2">{title}</h3>
            {list.length ? (
                <div className={"grid grid-cols-1 gap-2"}>
                    <PokemonTypes types={list.map(l => l.name)} />
                </div>
            ) : (
                <p className="text-white/60 text-sm">—</p>
            )}
        </div>
    );
}