import {PokemonListItem as PokemonListItemType} from "@/types/pokemon";
import Image from "next/image";
import ErrorImage from "@/public/pokemon-placeholder.webp";
import React from "react";
import PokemonListItem from "@/components/PokemonListItem";

type Props = {
    pokemonList: PokemonListItemType[],
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
        <PokemonListItem key={i} pokemon={pokemon} index={i}/>
    ));
}
