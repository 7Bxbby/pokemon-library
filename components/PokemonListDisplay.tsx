import Image from "next/image";
import Link from "next/link";
import { PokemonListItem } from "@/types/pokemon";
import {useState} from "react";

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
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={180}
                    height={180}
                />

                <p className="mt-2 text-white font-bold capitalize drop-shadow-md text-xl">
                    {pokemon.name.replace('-', ' ')}
                </p>
            </div>
        </Link>
    ));
}

function ImageWithFallback({
                               src,
                               alt,
                               width,
                               height,
                           }: {
    src: string;
    alt: string;
    width: number;
    height: number;
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <Image
            src={imageError ? "/pokemon-placeholder.png" : src}
            width={width}
            height={height}
            alt={alt}
            onError={() => setImageError(true)}
            loading="lazy"
            sizes="(max-width: 768px) 33vw, 180px"
            className="relative z-10 transition-transform group-hover:-translate-y-3 duration-500
                 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.1)]"
        />
    );
}
