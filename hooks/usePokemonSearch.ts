import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ITEMS_LIMIT } from "@/lib/pokemon-utils";
import { PokemonListItem, PokemonListResponse } from "@/types/pokemon";
import {buildApiUrl} from "@/lib/url-utils";

export function usePokemonSearch() {
    const searchParams = useSearchParams();
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const currentPage = Number(searchParams.get("page") ?? "1");
    const searchQuery = searchParams.get("search") ?? "";

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = buildApiUrl(currentPage, searchQuery);
                const response = await fetch(apiUrl);
                const data: PokemonListResponse = await response.json();

                setPokemonList(data.pokemons);
                setTotalPages(Math.max(1, Math.ceil(data.count / ITEMS_LIMIT)));
            } catch (e: unknown) {
                setPokemonList([]);
                setTotalPages(1);
                setError(e instanceof Error ? e.message : "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        void fetchPokemonList();
    }, [currentPage, searchQuery]);

    return {
        pokemonList,
        totalPages,
        loading,
        error,
    };
}