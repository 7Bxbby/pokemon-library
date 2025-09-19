import { NextResponse } from "next/server";
import {parsePokemonList, POKEAPI_BASE_URL} from "@/lib/pokemon-utils";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset") || "0";

    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=12&offset=${offset}`);

        if (!response.ok) {
            throw new Error(`PokeAPI error: ${response.status}`);
        }

        const data: { count: number; results: { name: string; url: string }[] } = await response.json();

        const headers = new Headers({
            "Cache-Control": "public, max-age=3600 s-maxage=3600, stale-while-revalidate=3600",
        });

        return NextResponse.json(
            { count: data.count, pokemons: parsePokemonList(data) },
            { status: 200, headers }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch from PokeAPI" }, { status: 500 });
    }
}
