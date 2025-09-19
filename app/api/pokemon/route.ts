import { NextResponse } from "next/server";
import {ITEMS_LIMIT, parsePokemonList, POKEAPI_BASE_URL} from "@/lib/pokemon-utils";

const CACHE_CONTROL_HEADER = "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset") || "0";

    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${ITEMS_LIMIT}&offset=${offset}`);

        const data: { count: number; results: { name: string; url: string }[] } = await response.json();

        return NextResponse.json(
            { count: data.count, pokemons: parsePokemonList(data) },
            { status: 200, headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch from PokeAPI" }, { status: 500 });
    }
}
