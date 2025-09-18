import Image from "next/image";
import {PokemonListItem} from "@/types/pokemon";

type Props = {
    pokemonList: PokemonListItem[]
}
export default function PokemonListDisplay({pokemonList}: Props) {
    return pokemonList.map((pokemon) => (
            <a
                href={`/pokemon/${pokemon.name}`}
                className="flex flex-col justify-center items-center cursor-pointer"
                key={pokemon.name}>
                <div className="group relative flex flex-col items-center">
                    <div className="absolute bottom-10 w-24 h-6 bg-gray-900/50 dark:bg-gray-100/20 rounded-full blur-md group-hover:bg-gray-900/30 dark:group-hover:bg-gray-100/50 transition-all duration-500"/>
                    <Image
                        src={pokemon.image}
                        width={180}
                        height={180}
                        alt={pokemon.name}
                        className="relative z-10 transition-transform group-hover:-translate-y-3 duration-500
                       drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                       dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.1)]"
                    />
                    <p className="mt-2 text-white font-bold capitalize drop-shadow-md text-xl">
                        {pokemon.name}
                    </p>
                </div>
            </a>
        ))
}