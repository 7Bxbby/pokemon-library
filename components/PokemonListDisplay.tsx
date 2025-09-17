import Image from "next/image";
import {PokemonListItem} from "@/types/pokemon";

type Props = {
    pokemonList: PokemonListItem[]
}
export default function PokemonListDisplay({pokemonList}: Props) {
    return pokemonList.map((pokemon) => (
            <a
                href={`/pokemon/${pokemon.name}`}
                className="flex flex-col text-white justify-center items-center cursor-pointer"
                key={pokemon.name}>
                <div className="group relative flex flex-col items-center">
                    <div className="absolute bottom-10 w-24 h-6 bg-black/40 rounded-full blur-md group-hover:bg-black/25 transition-all duration-500"/>
                    <Image
                        src={pokemon.image}
                        width={180}
                        height={180}
                        alt={pokemon.name}
                        className="relative z-10 transition-transform group-hover:-translate-y-3 drop-shadow-lg duration-500"/>
                    <p className="mt-2 text-white font-bold capitalize drop-shadow-md text-xl">
                        {pokemon.name}
                    </p>
                </div>
            </a>
        ))
}