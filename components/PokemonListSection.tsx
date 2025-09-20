'use client';

import { Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import PokemonListDisplay from "@/components/PokemonListDisplay";
import PokemonListDisplaySkeleton from "@/components/skeleton/PokemonListDisplaySkeleton";
import {useRouter, useSearchParams} from "next/navigation";
import {usePokemonSearch} from "@/app/hooks/usePokemonSearch";
import React, {useState} from "react";
import { resetPageAndSearch, updatePageParam } from "@/lib/url-utils";

export default function PokemonListSection() {
    const { pokemonList, totalPages, loading, error } = usePokemonSearch();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");
    const currentPage = Number(searchParams.get("page") ?? "1");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            const updatedParams = resetPageAndSearch(searchParams, searchInput);
            push(`?${updatedParams.toString()}`);
        }
    };

    const handleSearchCancel = () => {
        setSearchInput("");
        const updatedParams = resetPageAndSearch(searchParams, "");
        push(`?${updatedParams.toString()}`);
    };


    const handlePageChange = (newPage: number) => {
        const updatedParams = updatePageParam(searchParams, newPage);
        push(`?${updatedParams.toString()}`);
    };


    return (
        <div className="flex flex-col justify-center items-center pb-16">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 px-0 sm:px-8 md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1350px]">
                <div className="col-span-full gap-4 sm:gap-16 flex-col sm:flex-row sm:justify-between flex -mb-5 max-[537px]:mt-0 max-[640px]:mt-8 sm:mt-10">
                    <label className="group relative block mx-3 sm:mx-0 max-w-xs">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white opacity-80">
                            <Search className="w-6 h-6" />
                        </span>
                        <input
                            type="search"
                            enterKeyHint="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleSearch}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (target.value === "") {
                                    handleSearchCancel();
                                }
                            }}

                            placeholder="Search Pokémon..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_6px_20px_rgba(0,0,0,0.25)] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition"
                        />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-focus-within:ring-2 ring-white/40 transition" />
                    </label>

                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        loading={loading}
                        onPageChangeAction={handlePageChange}
                    />
                </div>

                {loading ? (
                    <PokemonListDisplaySkeleton />
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <PokemonListDisplay clearSearch={()=>{}} pokemonList={pokemonList} />
                )}

            </div>
        </div>
    );
}