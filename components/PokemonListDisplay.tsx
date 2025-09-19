import Link from "next/link";
import {PokemonListItem} from "@/types/pokemon";
import ImageWithFallback from "@/components/ImageWithFallback";
import Image from "next/image";
import ErrorImage from "@/public/pokemon-placeholder.webp";
import React from "react";

type Props = {
    pokemonList: PokemonListItem[],
    clearSearch: () => void
};

export default function PokemonListDisplay({pokemonList, clearSearch}: Props) {
    if (pokemonList.length === 0)
        return <div className="mt-12 flex items-center col-span-full flex-col gap-4 justify-center text-center">
            <Image src={ErrorImage} alt="Error Image" width={180} height={180}/>
            <p className="text-white font-bold text-xl mb-4">We couldn&#39;t find this pokémon...</p>
            <button
                onClick={()=>clearSearch()}
                className="border-1 border-white cursor-pointer text-gray-100 px-6 py-3 rounded-lg transition-colors backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
                Clear Searchbar
            </button>
        </div>
    return pokemonList.map((pokemon, i) => (
        <Link
            href={`/pokemon/${pokemon.name}`}
            className="flex flex-col justify-center items-center cursor-pointer"
            key={pokemon.name}
        >
            <div
                className="group relative flex flex-col items-center fade-in-up"
                style={{animationDelay: `${i * 100}ms`}}
            >
                <div
                    className="absolute bottom-10 w-24 h-6 bg-gray-900/50 dark:bg-gray-100/20 rounded-full blur-md group-hover:bg-gray-900/30 dark:group-hover:bg-gray-100/50 transition-all duration-500"/>

                <ImageWithFallback
                    id={pokemon.id}
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={180}
                    height={180}
                />

                <p className="mt-2 text-white font-bold text-center capitalize drop-shadow-md text-xl">
                    {pokemon.name}
                </p>
            </div>
        </Link>
    ));
}
