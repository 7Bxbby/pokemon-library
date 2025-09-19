import { NextResponse } from "next/server";
import {POKEAPI_BASE_URL, transformPokemonData} from "@/lib/pokemon-utils";
import {PokemonRaw} from "@/types/pokemon";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "No Pokémon ID provided" }, { status: 400 });
    }

    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
        return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
    }

    const rawData: PokemonRaw = await response.json();
    const transformedData = transformPokemonData(rawData);

    return NextResponse.json(transformedData, { status: 200 });
}