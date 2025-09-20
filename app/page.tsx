import PokemonListSection from '@/components/PokemonListSection';
import PokemonListDisplaySkeleton from '@/components/skeleton/PokemonListDisplaySkeleton';
import {Suspense} from "react";

export default function Home() {
    return (
        <Suspense fallback={
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 px-0 sm:px-8 md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1350px]">
                <PokemonListDisplaySkeleton />
            </div>
        }>
            <PokemonListSection />
        </Suspense>
    );
}