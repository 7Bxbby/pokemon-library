'use client'

import React, {use, useCallback, useEffect, useRef, useState} from "react";
import { Heart, Star, Wind, Swords, Shield, Activity} from 'lucide-react';
import { Pokemon } from "@/types/pokemon";
import ImageWithFallback from "@/components/ImageWithFallback";
import StatRow from "@/components/StatRow";
import Image from "next/image";
import ErrorImage from '@/public/pokemon-placeholder.webp';
import Link from "next/link";
import PokemonAbilities from "@/components/PokemonAbilities";
import PokemonTypes from "@/components/PokemonTypes";


export default function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const detailsRef = useRef<HTMLDivElement | null>(null);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPokemonDetails = useCallback(async (name: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`/api/pokemon/${name}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Pokémon not found");
                } else {
                    setError("Failed to fetch Pokémon details");
                }
                return;
            }
            const data: Pokemon = await response.json();
            setPokemon(data);
        } catch (e: unknown) {
            setPokemon(null);
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
        void fetchPokemonDetails(name);
    }, [name, fetchPokemonDetails]);

    useEffect(() => {
        if (!loading && pokemon) {
            detailsRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [loading, pokemon]);


    if (loading) {
        return (
            <div className="mt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4 text-white text-xl">Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
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
        <div className="min-h-screen max-[450px]:px-0 px-4 pb-8 text-white scroll-m-6" ref={detailsRef}>
            <div className="mx-auto max-w-[1100px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-[450px]:px-1 p-8">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-4 hidden lg:block">
                            <div className="flex items-center gap-3">
                                <h1 className="text-5xl font-extrabold capitalize tracking-tight">{pokemon.name}</h1>
                            </div>

                            <PokemonTypes types={pokemon.types} />

                            <p className="max-w-prose text-white/70">
                                A balanced Pokémon with versatile moves and solid survivability.
                            </p>
                        </div>
                        <div>
                            <div className="mb-6 px-4 flex items-center gap-3">
                                <Star className="size-7" />
                                <h2 className="text-3xl font-bold">Base Stats</h2>
                            </div>
                            <div className="space-y-4 px-4">
                                <StatRow label="HP" icon={<Heart className="size-4 text-emerald-300" />} value={pokemon.stats.hp} />
                                <StatRow label="Attack" icon={<Swords className="size-4 text-rose-300" />} value={pokemon.stats.attack}/>
                                <StatRow label="Defense" icon={<Shield className="size-4 text-sky-300" />} value={pokemon.stats.defense}/>
                                <StatRow label="Sp. Attack" icon={<Activity className="size-4 text-amber-300" />} value={pokemon.stats.specialAttack}/>
                                <StatRow label="Sp. Defense" icon={<Shield className="size-4 text-violet-300" />} value={pokemon.stats.specialDefense}/>
                                <StatRow label="Speed" icon={<Wind className="size-4 text-yellow-300" />} value={pokemon.stats.speed}/>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <StatRow label="Total Stats" icon={<Star className="size-4 text-yellow-300" />} value={pokemon.stats.total} max={720} />

                            <div className="mt-8">
                                <p className="mb-2 text-white/70 text-sm">Base Experience</p>
                                <div className={'h-3 w-full rounded-full bg-black/20 dark:bg-white/10 overflow-hidden'}>
                                    <div
                                        className={`w-0 h-full rounded-full transition-[width] duration-700 ease-out bg-yellow-400`}
                                    />
                                </div>
                                <div className="mt-2 text-right font-semibold">{pokemon.baseExperience} XP</div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex flex-col order-1 lg:order-2">
                        <div className="space-y-4 block lg:hidden min-w-0">
                            <div className="flex items-center">
                                <h1 className="max-[280px]:text-2xl mx-auto text-center text-4xl font-extrabold capitalize tracking-tight">{pokemon.name}</h1>
                            </div>

                            <PokemonTypes types={pokemon.types} />

                            <div className="text-white/70 text-center px-1 break-words">
                                A balanced Pokémon with versatile moves and solid survivability.
                            </div>
                        </div>
                        <div className="relative group pb-24 mt-8 min-w-[390px]:mt-0 flex items-center justify-center">
                            <div className="rotate-x-180 rotate-90 rotate-y-80 absolute max-[360px]:bottom-0 -bottom-5 left-1/2 -translate-x-1/2 max-[360px]:h-40 max-[360px]:w-35 h-70 w-60 rounded-full bg-gray-900/50 dark:bg-gray-100/20 blur-md group-hover:bg-gray-900/30 dark:group-hover:bg-gray-100/50 transition-all duration-500" />
                            <ImageWithFallback
                                id={pokemon.id}
                                src={pokemon.image}
                                alt={pokemon.name}
                                width={360}
                                height={360}
                            />
                        </div>
                        <div className="border-t border-white/10 p-4 -mt-12">
                            <h3 className="mb-6 text-2xl font-bold">Abilities</h3>
                            <div className="flex flex-col gap-4">
                                <PokemonAbilities abilities={pokemon.abilities} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
