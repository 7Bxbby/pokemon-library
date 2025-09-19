import {useState} from "react";
import Image from "next/image";

export default function ImageWithFallback({
    id,
    src,
    alt,
    width,
    height,
    }: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
}) {
    const [imageUrl, setImageUrl] = useState(src);
    const imageFallback = "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/0.png";
    const fallbackHome = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

    const handleError = () => {
        if (imageUrl === src) {
            setImageUrl(fallbackHome);
        } else if (imageUrl === fallbackHome) {
            setImageUrl(imageFallback);
        }
    };


    return (
        <div
            className="relative inline-block group"
        >
            <Image
                src={imageUrl}
                width={width}
                height={height}
                alt={alt}
                onError={handleError}
                loading="lazy"
                className="relative z-10 transition-transform group-hover:-translate-y-3 duration-500
                    drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                    dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.1)]"
            />
            <span
                className={`${imageUrl === imageFallback ? "group-hover:opacity-100 group-hover:translate-y-0" : ""} opacity-0 translate-y-2 pointer-events-none absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white text-sm rounded-lg shadow-xl whitespace-nowrap transition-all duration-500`}
            >
                No Image available
            </span>
        </div>
    );
}