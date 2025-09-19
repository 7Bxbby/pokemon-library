'use client';

import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import PokemonListDisplay from "@/components/PokemonListDisplay";
import PokemonListDisplaySkeleton from "@/components/skeleton/PokemonListDisplaySkeleton";
import { PokemonListItem, PokemonListResponse } from "@/types/pokemon";
import { ITEMS_LIMIT } from "@/lib/pokemon-utils";
import {useSearchParams} from "next/navigation";

interface PokemonListSectionProps {
    onPageChange: (page: number) => void;
}

export default function PokemonListSection({ onPageChange }: PokemonListSectionProps) {

    const searchParams = useSearchParams();
    const initialPage = Number(searchParams.get("page") ?? "1");

    const [searchHolder, setSearchHolder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const clearSearch = () => {
        setSearchHolder('');
        setSearchQuery('');
        setPage(1);
    }

    const fetchPokemonList = useCallback(async (pageToLoad: number, sq: string) => {
        try {
            setLoading(true);
            setError('');
            const offset = (pageToLoad - 1) * ITEMS_LIMIT;

            const response = sq ? await fetch(`/api/pokemon/search?name=${sq}&offset=${offset}`) : await fetch(`/api/pokemon?offset=${offset}`);

            const data: PokemonListResponse = await response.json();
            setPokemonList(data.pokemons);
            setTotalPages(Math.max(1, Math.ceil(data.count / ITEMS_LIMIT)));
        } catch (e: unknown) {
            setPokemonList([]);
            setTotalPages(1);
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
        if(!searchHolder && searchQuery) setSearchQuery('');
    }, [searchHolder, searchQuery]);

    useEffect(() => {
        void fetchPokemonList(page, searchQuery);
    }, [page, fetchPokemonList, searchQuery]);

    return (
        <div className="flex flex-col justify-center items-center pb-16">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 px-0 sm:px-8 md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1350px]">
                <div className="col-span-full gap-4 sm:gap-16 flex-col sm:flex-row sm:justify-between flex -mb-5 max-[537px]:mt-0 max-[640px]:mt-8 sm:mt-10">
                    <label className="group relative block mx-3 sm:mx-0 max-w-xs">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white opacity-80">
                            <Search className="w-6 h-6" />
                        </span>
                        <input
                            type="text"
                            value={searchHolder}
                            onChange={(e) => setSearchHolder(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onPageChange(1);
                                    setPage(1);
                                    setSearchQuery(searchHolder);
                                }
                            }}
                            placeholder="Search Pokémon..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_6px_20px_rgba(0,0,0,0.25)] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition"
                        />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-focus-within:ring-2 ring-white/40 transition" />
                    </label>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        loading={loading}
                        onPageChangeAction={(newPage) => {
                            setPage(newPage);
                            onPageChange(newPage);
                        }}
                    />
                </div>

                {loading ? (
                    <PokemonListDisplaySkeleton />
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <PokemonListDisplay clearSearch={clearSearch} pokemonList={pokemonList} />
                )}

            </div>
        </div>
    );
}