'use client'

import React, {use, useCallback, useEffect, useState} from "react";
import {PokemonTypeDetails} from "@/types/pokemon";
import Image from "next/image";
import ErrorImage from "@/public/pokemon-placeholder.webp";
import Link from "next/link";
import PokemonListItem from "@/components/PokemonListItem";
import {PokemonListItem as PokemonListItemType} from "@/types/pokemon";
import {typesIconMap} from "@/lib/pokemon-utils";
import EffRow from "@/components/EffRow";

export default function TypePage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const [pokemonTypeDetails, setPokemonTypeDetails] = useState<PokemonTypeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPokemonTypeDetails = useCallback(async (name: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`/api/pokemon/types/${name}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Pokémon not found");
                } else {
                    setError("Failed to fetch Pokémon details");
                }
                return;
            }
            const data: PokemonTypeDetails = await response.json();
            setPokemonTypeDetails(data);
        } catch (e: unknown) {
            setPokemonTypeDetails(null);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchPokemonTypeDetails(name);
    }, [name, fetchPokemonTypeDetails]);

    if (loading) {
        return (
            <div className="mt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4 text-white text-xl">Loading Pokémon Type Details...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemonTypeDetails) {
        return (
            <div className="mt-12 flex items-center flex-col gap-4 justify-center text-center">
                <Image src={ErrorImage} alt="Error Image" width={180} height={180}/>
                <p className="text-red-500 font-bold text-xl mb-4">{error}</p>
                <Link
                    href="/"
                    className="border-1 border-white cursor-pointer text-gray-100 px-6 py-3 rounded-lg transition-colors backdrop-blur-md hover:bg-white/10 hover:text-white"
                >
                    Back to List
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl mt-5 p-6 text-white">
            <h1 className="mx-auto text-4xl max-w-fit font-bold capitalize flex items-center gap-3 group cursor-pointer transition-all duration-500">
                <Image
                    src={typesIconMap[pokemonTypeDetails.name]}
                    alt={`${pokemonTypeDetails.name} icon`}
                    width={32}
                    height={32}
                    className="group-hover:-rotate-6 group-hover:scale-105 transition-all duration-500"
                />
                <span className={'group-hover:scale-105 transition-all duration-500'}>
                    {pokemonTypeDetails.name} type
                </span>
            </h1>
            <section className="mt-10">
                <h2 className="mx-auto text-center text-2xl font-semibold mb-4">
                    These are just some examples of {pokemonTypeDetails.name}-type Pokémons — in total, there are {pokemonTypeDetails.pokemon.length} of them!
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {pokemonTypeDetails.pokemon.slice(0, 12).map(({ pokemon: p }, i) => {

                        const id = Number(p.url.split("/").filter(Boolean).pop());
                        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                        const pokemon: PokemonListItemType = {
                            id: id,
                            name: p.name,
                            image: img,
                        };

                        return (
                            <PokemonListItem key={i} pokemon={pokemon} index={i}/>
                        );
                    })}
                </div>
            </section>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <EffRow title="Deals 2× Damage To" list={pokemonTypeDetails.damage_relations.double_damage_to}/>
                <EffRow title="Takes 2× Damage From" list={pokemonTypeDetails.damage_relations.double_damage_from}/>
                <EffRow title="Deals ½× Damage To" list={pokemonTypeDetails.damage_relations.half_damage_to}/>
                <EffRow title="Takes ½× Damage From" list={pokemonTypeDetails.damage_relations.half_damage_from}/>
                <EffRow title="Deals 0 Damage To" list={pokemonTypeDetails.damage_relations.no_damage_to}/>
                <EffRow title="Takes 0× Damage From" list={pokemonTypeDetails.damage_relations.no_damage_from}/>
            </section>
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Moves</h2>
                    <span className="text-white/70">{pokemonTypeDetails.moves.length} total</span>
                </div>
                <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {pokemonTypeDetails.moves.slice(0, 12).map(m => (
                        <li key={m.name} className="capitalize bg-white/10 rounded px-2 py-1 hover:bg-white/20 transition-all duration-500">{m.name}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
