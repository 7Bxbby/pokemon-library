import { NextResponse } from "next/server";
import {POKEAPI_BASE_URL} from "@/lib/pokemon-utils";

export async function GET(_request: Request, { params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;

    if (!type) {
        return NextResponse.json({ error: "No Pokémon type provided" }, { status: 400 });
    }

    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/type/${type}`);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Pokémon type '${type}' not found` },
                { status: 404 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching Pokémon type:", error);
        return NextResponse.json(
            { error: "Failed to fetch Pokémon type data" },
            { status: 500 }
        );
    }
}