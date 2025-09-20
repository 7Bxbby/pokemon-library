import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import React, {useState} from "react";
import {PokemonListItem as PokemonListItemType} from "@/types/pokemon";

type Props = {
    pokemon: PokemonListItemType,
    index: number
};

export default function PokemonListItem({pokemon, index}: Props) {
    const [loading, setLoading] = useState(false);
    return <Link
        href={`/pokemon/${pokemon.name}`}
        id={`pokemon-list-item-${index}`}
        className="flex flex-col justify-center items-center cursor-pointer pokemon-list-item"
        key={pokemon.name}
        onClick={() => setTimeout(() => setLoading(true), 300)}
    >
        <div
            className="group relative flex flex-col items-center fade-in-up"
            style={{animationDelay: `${index * 100}ms`}}
        >
            {!loading
                ?
                <>
                    <div className="absolute bottom-10 w-24 h-6 bg-gray-900/50 dark:bg-gray-100/20 rounded-full blur-md group-hover:bg-gray-900/30 dark:group-hover:bg-gray-100/50 transition-all duration-500"/>
                    <ImageWithFallback
                        id={pokemon.id}
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={180}
                        height={180}
                    />
                </>
                :
                <div className="animate-spin rounded-full size-32 border-b-2 border-white mx-auto"/>
            }

            <p className="mt-2 text-white font-bold text-center capitalize drop-shadow-md text-xl">
                {pokemon.name}
            </p>
        </div>
    </Link>
}