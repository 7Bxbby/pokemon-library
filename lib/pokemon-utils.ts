import {Pokemon, PokemonListItem, PokemonRaw} from "@/types/pokemon";

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
export const ITEMS_LIMIT = 12;

export function parsePokemonList(data: { results: { name: string; url: string }[] }): PokemonListItem[] {
    return data.results.map((p) => {
        const id = Number(p.url.split("/").filter(Boolean).pop());
        return {
            id: id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });
}

export function transformPokemonData(pokemonRaw: PokemonRaw): Pokemon {
    const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonRaw.id}.png`;

    const abilities = pokemonRaw.abilities.map(ability => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden
    }));

    const statsMap: Record<string, number> = {};
    pokemonRaw.stats.forEach(stat => {
        statsMap[stat.stat.name] = stat.base_stat;
    });

    const stats = {
        hp: statsMap['hp'] || 0,
        attack: statsMap['attack'] || 0,
        defense: statsMap['defense'] || 0,
        specialAttack: statsMap['special-attack'] || 0,
        specialDefense: statsMap['special-defense'] || 0,
        speed: statsMap['speed'] || 0,
        total: pokemonRaw.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
    };

    const types = pokemonRaw.types.map(type => type.type.name);

    return {
        id: pokemonRaw.id,
        name: pokemonRaw.name.replace('-', ' '),
        image: pokemonRaw.sprites.other["official-artwork"].front_default || officialArtworkUrl,
        types,
        abilities,
        stats,
        height: pokemonRaw.height,
        weight: pokemonRaw.weight / 10,
        baseExperience: pokemonRaw.base_experience || 0
    };
}

