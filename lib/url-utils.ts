import {ITEMS_LIMIT} from "@/lib/pokemon-utils";

export function resetPageAndSearch(searchParams: URLSearchParams, query?: string): URLSearchParams {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
        params.set("search", query);
    } else {
        params.delete("search");
    }

    params.delete("page");

    return params;
}

export function updatePageParam(searchParams: URLSearchParams, page: number): URLSearchParams {
    const params = new URLSearchParams(searchParams.toString());

    if (page > 1) {
        params.set("page", String(page));
    } else {
        params.delete("page");
    }

    return params;
}

export function buildApiUrl(page: number = 1, searchQuery: string = ""): string {
    const offset = (page - 1) * ITEMS_LIMIT;

    if (searchQuery) {
        return `/api/pokemon/search?name=${encodeURIComponent(searchQuery)}&offset=${offset}`;
    }

    return `/api/pokemon?offset=${offset}`;
}
