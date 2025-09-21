'use client'

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Image from 'next/image';
import questionMark from '@/public/question-icon.svg';
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useTheme} from "@/contexts/ThemeContext";

const driverObj = driver({
    overlayColor: 'rgba(67,67,67,0.8)',
});

driverObj.setSteps([
    {
        element: "#logo",
        popover: {
            title: "Welcome to PocketDex",
            description: "This is a simple pokemon library where you can find all the pokemon you want!",
            side: 'bottom',
        }
    },
    {
        element: "#theme-toggle",
        popover: {
            title: "Theming is great!",
            description: "It's easy to switch between light and dark themes!",
            showButtons: [],
        }
    },
    {
        element: "#pokemon-list-display",
        popover: {
            title: "Discover Your Pokémon!",
            description: "Here is the list of all Pokémon that match your search or filters.",
        }
    },
    {
        element: "#pokemon-list-search-input",
        popover: {
            title: "Type 'Pikachu' to Find him!",
            description: "Use this input box to search for any Pokémon by name.",
            showButtons: [],
        }
    },
    {
        element: "#pokemon-list-pagination",
        popover: {
            title: "Explore More Pokémon!",
            description: "Use these controls to navigate through pages of Pokémon results.",
            showButtons: [],
        }
    },
    {
        element: ".pokemon-list-item",
        popover: {
            title: "Dive Into the Details!",
            description: "Click on any Pokémon card to view detailed information about it.",
            showButtons: [],
        }
    },
    {
        element: "#pokemon-details",
        popover: {
            title: "Pokémon Overview",
            description: "This section shows the full view of the selected Pokémon with all its details.",
            showButtons: ['next']
        }
    },
    {
        element: "#pokemon-details-stats",
        popover: {
            title: "Pokémon Stats",
            description: "Here you can check the Pokémon’s base stats like HP, Attack, Defense, and more.",
            showButtons: ['next']
        }
    },
    {
        element: "#pokemon-detail-types",
        popover: {
            title: "Pokémon Types",
            description: "This section lists all the types of the Pokémon. Click a type to see detailed information.",
            showButtons: []
        }
    },
    {
        element: "#pokemon-type-details",
        popover: {
            title: "Type Details",
            description: "Here you can explore information about the chosen Pokémon type, including strengths and weaknesses.",
            showButtons: ['next']
        }
    },
    {
        element: "#logo",
        popover: {
            title: "Back to the Home Page!",
            description: "You can always click the logo to return to the main Pokémon list.",
        }
    }
])

export default function TutorialDriver() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { theme } = useTheme();

    useEffect(() => {
        if (driverObj.isActive()) {
            setTimeout(()=> driverObj.moveNext(), 500)
        }
    }, [searchParams, theme, pathname]);
    if (pathname !== '/') return null;
    return <Image
        src={questionMark}
        alt={'question mark icon'}
        width={64}
        height={64}
        className={'absolute top-4 left-4 cursor-pointer hover:scale-105 hover:-rotate-5 transition-all duration-500'}
        onClick={()=> driverObj.drive()}
    />
}