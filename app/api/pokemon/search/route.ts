import { NextResponse } from "next/server";
import {ITEMS_LIMIT, parsePokemonList, POKEAPI_BASE_URL} from "@/lib/pokemon-utils";

const CACHE_CONTROL_HEADER = "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("name") || "";
    const offset = parseInt(searchParams.get("offset") || "0");

    try {
        if (!search || search.trim().length < 2) {
            return NextResponse.json(
                {
                    error: "Search query must be at least 2 characters long",
                    count: 0,
                    pokemons: []
                },
                { status: 400 }
            );
        }

        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=10000&offset=0`, {
            next: { revalidate: 3600 }
        });

        const data: { count: number; results: { name: string; url: string }[] } = await response.json();

        const filteredData = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
        const totalCount = filteredData.length;

        const paginatedResults = filteredData.slice(offset, offset + ITEMS_LIMIT);

        const parsedResults = parsePokemonList({ results: paginatedResults });


        return NextResponse.json(
            { count: totalCount, pokemons: parsedResults },
            { status: 200, headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch from PokeAPI" }, { status: 500 });
    }
}
