import {Search} from 'lucide-react';
import Image from "next/image";
import logo from "@/public/logo.png";
import { mockPokemonList } from "@/mock/pokemonList";
import PokemonListDisplay from "@/components/PokemonListDisplay";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
      <div className="min-h-screen poke-bg">
          <div className="text-4xl justify-center items-center h-[334px] px-4 pt-12 relative">
              <Image src={logo} width={1021} height={334} alt={"logo"} className="select-none w-full max-w-[800px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              <ThemeToggle/>
          </div>
          <div className="flex flex-col justify-center items-center pb-16">
              <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 px-0 sm:px-8">
                  <label className="group relative block mx-3 sm:mx-0 max-w-xs -mb-5 max-[537px]:mt-0 max-[640px]:mt-8 sm:mt-10 col-span-full">
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
                  <PokemonListDisplay pokemonList={mockPokemonList}/>
              </div>
          </div>
      </div>
  );
}
