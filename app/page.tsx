'use client';

import { Suspense, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import PokemonListSection from '@/components/PokemonListSection';
import PokemonListDisplaySkeleton from '@/components/skeleton/PokemonListDisplaySkeleton';


function getUpdatedQueryString(searchParams: URLSearchParams, page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) params.delete('page');
    else params.set('page', String(page));
    return params.toString();
}

export default function Home() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = useCallback((page: number) => {
        const qs = getUpdatedQueryString(searchParams, page);
        replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, [replace, pathname, searchParams]);

    return (
        <Suspense fallback={<PokemonListDisplaySkeleton />}>
            <PokemonListSection onPageChange={handlePageChange} />
        </Suspense>
    );
}