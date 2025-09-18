export default function PokemonListDisplay() {
    return <>
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="flex flex-col justify-center items-center cursor-pointer"
            >
                <div className="group relative flex flex-col items-center">
                    <div
                        className="relative z-10 w-[180px] h-[180px] rounded-lg
                         bg-green-200/30 dark:bg-gray-600/30
                         animate-pulse"
                    />
                    <div className="mt-2 w-full h-6 rounded bg-green-200/40 dark:bg-gray-600/30 animate-pulse" />
                </div>
            </div>
        ))}
    </>
}