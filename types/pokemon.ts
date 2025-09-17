// Raw data from API
export interface PokemonRaw {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: Array<{
        slot: number;
        type: {
            name: string;
        };
    }>;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Array<{
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
        };
    }>;
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
        };
    }>;
}

// Processed data
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    abilities: Array<{
        name: string;
        isHidden: boolean;
    }>;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
        total: number;
    };
    height: number;
    weight: number;
    baseExperience: number;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}