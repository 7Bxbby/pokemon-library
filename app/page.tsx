'use client'

import {Search} from 'lucide-react';
import Image from "next/image";
import logo from "@/public/logo.png";
import PokemonListDisplay from "@/components/PokemonListDisplay";
import PokemonListDisplaySkeleton from "@/components/skeleton/PokemonListDisplaySkeleton";
import ThemeToggle from "@/components/ThemeToggle";
import {useEffect, useMemo, useState} from "react";
import {fetchPokemonListFromPokeAPI} from "@/lib/pokemon-utils";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPage = useMemo(() => {
        const p = Number(searchParams.get("page"));
        return Number.isFinite(p) && p > 0 ? p : 1;
    }, [searchParams]);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [pokemonList, setPokemonList] = useState<{ name: string; image: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = async (pageToLoad: number) => {
        try {
            setLoading(true);
            setError('');
            const offset = (pageToLoad - 1) * 12;
            const data = await fetchPokemonListFromPokeAPI(offset);
            setPokemonList(data.pokemons);
            setTotalPages(Math.max(1, Math.ceil(data.count / 12)));
        } catch (e: unknown) {
            setPokemonList([]);
            setTotalPages(1);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Something went wrong!");
            }
        } finally {
            const params = new URLSearchParams(searchParams.toString());
            if (page === 1) {
                params.delete("page");
            } else {
                params.set("page", String(page));
            }
            router.replace(`/?${params.toString()}`, { scroll: false });
            setLoading(false);
        }
    };

    useEffect(() => {
        void load(page);
    }, [page]);


    return (
      <div className="min-h-screen poke-bg">
          <div className="text-4xl justify-center items-center h-[334px] px-4 pt-12 relative">
              <Image src={logo} width={1021} height={334} alt={"logo"} className="select-none w-full max-w-[800px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              <ThemeToggle/>
          </div>
          <div className="flex flex-col justify-center items-center pb-16">
              <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 px-0 sm:px-8 md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1350px]">
                  <div className="col-span-full gap-4 sm:gap-16 flex-col sm:flex-row sm:justify-between flex -mb-5 max-[537px]:mt-0 max-[640px]:mt-8 sm:mt-10">
                      <label className="group relative block mx-3 sm:mx-0 max-w-xs">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white opacity-80">
                          <Search className="w-6 h-6" />
                        </span>
                          <input
                              type="text"
                              placeholder="Search Pokémon..."
                              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_6px_20px_rgba(0,0,0,0.25)] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition"
                          />
                          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-focus-within:ring-2 ring-white/40 transition" />
                      </label>
                      <Pagination
                          page={page}
                          totalPages={totalPages}
                          loading={loading}
                          onPageChange={(p) => setPage(p)}/>
                  </div>
                  {loading ? (
                      <PokemonListDisplaySkeleton/>
                  ) : error ? (
                      <p className="text-red-500">Error: {error}</p>
                  ) : (
                      <PokemonListDisplay pokemonList={pokemonList} />
                  )}

              </div>
          </div>
      </div>
  );
}
