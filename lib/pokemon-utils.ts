import {PokemonListItem} from "@/types/pokemon";

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export function parsePokemonList(data: { results: { name: string; url: string }[] }): PokemonListItem[] {
    return data.results.map((p) => {
        const id = Number(p.url.split("/").filter(Boolean).pop());
        return {
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });
}

