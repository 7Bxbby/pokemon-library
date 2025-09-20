import Image from "next/image";
import Link from "next/link";
import {typesIconMap} from "@/lib/pokemon-utils";

interface PokemonTypesProps {
    types: string[];
}

export default function PokemonTypes({ types }: PokemonTypesProps) {
    return (
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mt-2 ml-1">
            {types.map((type) => (
                <Link
                    href={`/pokemon/types/${type}`}
                    key={type}
                    className="flex items-center gap-1 font-semibold capitalize cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                    <Image
                        src={typesIconMap[type]}
                        alt={`${type} icon`}
                        width={20}
                        height={20}
                        className="group-hover:-rotate-6 transition-all duration-500"
                    />
                    <span>{type}</span>
                </Link>
            ))}
        </div>
    );
}
