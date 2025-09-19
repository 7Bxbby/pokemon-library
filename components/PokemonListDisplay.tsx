import Link from "next/link";
import { PokemonListItem } from "@/types/pokemon";
import ImageWithFallback from "@/components/ImageWithFallback";

type Props = { pokemonList: PokemonListItem[] };

export default function PokemonListDisplay({ pokemonList }: Props) {
    return pokemonList.map((pokemon, i) => (
        <Link
            href={`/pokemon/${pokemon.name}`}
            className="flex flex-col justify-center items-center cursor-pointer"
            key={pokemon.name}
        >
            <div
                className="group relative flex flex-col items-center fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
            >
                <div className="absolute bottom-10 w-24 h-6 bg-gray-900/50 dark:bg-gray-100/20 rounded-full blur-md group-hover:bg-gray-900/30 dark:group-hover:bg-gray-100/50 transition-all duration-500" />

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
