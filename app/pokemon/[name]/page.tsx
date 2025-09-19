'use client'

import {use, useCallback, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Heart, Ruler, Weight, Star, Zap } from 'lucide-react';
import { Pokemon } from "@/types/pokemon";
import ThemeToggle from "@/components/ThemeToggle";

export default function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const router = useRouter();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(async (name: string) => {
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
            console.log(data);
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
        void load(name);
    }, [name, load]);

    // Helper function for type colors
    const getTypeColor = (type: string): string => {
        const typeColors: Record<string, string> = {
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            grass: 'bg-green-500',
            electric: 'bg-yellow-500',
            psychic: 'bg-pink-500',
            ice: 'bg-cyan-300',
            dragon: 'bg-purple-600',
            dark: 'bg-gray-800',
            fairy: 'bg-pink-300',
            normal: 'bg-gray-400',
            fighting: 'bg-red-600',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-blue-300',
            bug: 'bg-green-400',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-400',
            steel: 'bg-gray-500',
        };
        return typeColors[type] || 'bg-gray-500';
    };

    // Helper function for stat colors
    const getStatColor = (value: number): string => {
        if (value >= 100) return 'bg-green-500';
        if (value >= 70) return 'bg-yellow-500';
        if (value >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    if (loading) {
        return (
            <div className="min-h-screen poke-bg flex items-center justify-center">
                <ThemeToggle />
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white dark:border-black mx-auto"></div>
                    <p className="mt-4 text-white dark:text-black text-xl">Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="min-h-screen poke-bg flex items-center justify-center">
                <ThemeToggle />
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">Error: {error}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen poke-bg">
            <ThemeToggle />

            {/* Header with back button */}
            <div className="container mx-auto px-4 pt-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white dark:text-black hover:opacity-80 transition-opacity mb-6"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span className="text-lg font-semibold">Back to Pokédex</span>
                </button>

                {/* Main Pokemon Info */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        {/* Pokemon Image & Basic Info */}
                        <div className="flex flex-col lg:flex-row items-center p-8">
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl lg:text-6xl font-bold text-white capitalize mb-4">
                                    {pokemon.name}
                                </h1>
                                <p className="text-2xl text-white/80 mb-6">
                                    #{pokemon.id.toString().padStart(3, '0')}
                                </p>

                                {/* Types */}
                                <div className="flex gap-3 justify-center lg:justify-start mb-6">
                                    {pokemon.types.map((type) => (
                                        <span
                                            key={type}
                                            className={`${getTypeColor(type)} text-white px-4 py-2 rounded-full text-lg font-semibold capitalize`}
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>

                                {/* Basic Stats */}
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    <div className="bg-white/20 dark:bg-black/20 rounded-xl p-4 text-center">
                                        <Ruler className="w-6 h-6 mx-auto mb-2 text-white" />
                                        <p className="text-white/80  text-sm">Height</p>
                                        <p className="text-white text-xl font-bold">
                                            {pokemon.height} m
                                        </p>
                                    </div>
                                    <div className="bg-white/20 dark:bg-black/20 rounded-xl p-4 text-center">
                                        <Weight className="w-6 h-6 mx-auto mb-2 text-white" />
                                        <p className="text-white/80 text-sm">Weight</p>
                                        <p className="text-white text-xl font-bold">
                                            {pokemon.weight} kg
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pokemon Image */}
                            <div className="lg:w-1/2 flex justify-center">
                                <div className="relative">
                                    <div className="absolute bottom-8 w-48 h-12 bg-black/20 dark:bg-white/20 rounded-full blur-xl"></div>
                                    <Image
                                        src={pokemon.image}
                                        alt={pokemon.name}
                                        width={300}
                                        height={300}
                                        className="relative z-10 drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="px-8 pb-8">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <Zap className="w-8 h-8" />
                                Base Stats
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Individual Stats */}
                                <div className="space-y-4">
                                    {[
                                        { name: 'HP', value: pokemon.stats.hp },
                                        { name: 'Attack', value: pokemon.stats.attack },
                                        { name: 'Defense', value: pokemon.stats.defense },
                                        { name: 'Sp. Attack', value: pokemon.stats.specialAttack },
                                        { name: 'Sp. Defense', value: pokemon.stats.specialDefense },
                                        { name: 'Speed', value: pokemon.stats.speed },
                                    ].map((stat) => (
                                        <div key={stat.name} className="flex items-center gap-4">
                                            <div className="w-24 text-white font-semibold">
                                                {stat.name}
                                            </div>
                                            <div className="flex-1 bg-white/20 dark:bg-black/20 rounded-full h-4 overflow-hidden">
                                                <div
                                                    className={`h-full ${getStatColor(stat.value)} transition-all duration-1000 ease-out`}
                                                    style={{ width: `${Math.min((stat.value / 200) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <div className="w-12 text-white font-bold text-right">
                                                {stat.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total Stats */}
                                <div className="bg-white/20 dark:bg-black/20 rounded-xl p-6">
                                    <div className="text-center">
                                        <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                                        <p className="text-white/80 text-lg">Total Stats</p>
                                        <p className="text-white text-4xl font-bold">
                                            {pokemon.stats.total}
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-white/80 text-sm mb-2">Base Experience</p>
                                        <p className="text-white text-2xl font-bold">
                                            {pokemon.baseExperience} XP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abilities Section */}
                        <div className="px-8 pb-8">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <Heart className="w-8 h-8" />
                                Abilities
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pokemon.abilities.map((ability, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl border-2 ${
                                            ability.isHidden
                                                ? 'bg-yellow-500/20 border-yellow-400 dark:bg-yellow-600/20'
                                                : 'bg-white/20 border-white/30 dark:bg-black/20 dark:border-black/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-white font-semibold capitalize">
                                                {ability.name}
                                            </h3>
                                            {ability.isHidden && (
                                                <span className="bg-yellow-500 px-2 py-1 rounded-full text-xs font-bold">
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}