import {PokemonListItem} from "@/types/pokemon";

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export function parsePokemonList(data: { results: { name: string; url: string }[] }): PokemonListItem[] {
    return data.results.map((p) => {
        const id = Number(p.url.split("/").filter(Boolean).pop());
        return {
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });
}

export async function fetchPokemonListFromPokeAPI(offset: number) {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=12&offset=${offset}`, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error(`PokeAPI error: ${response.status}`);
    }

    const data: { count: number; results: { name: string; url: string }[] } = await response.json();

    return {
        count: data.count,
        pokemons: parsePokemonList(data),
    };
}

