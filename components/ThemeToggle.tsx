"use client";

import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const Icon = theme !== 'dark' ? Sun : Moon;

    return <Icon
        onClick={() => toggle()}
        width={64}
        height={64}
        color={theme !== 'dark' ? "#f4f702" : "#FFF"}
        fill={theme !== 'dark' ? "#f7d802" : "#d4d4d4"}
        className={
            "cursor-pointer hover:rotate-45 hover:scale-105 transition-all duration-500 absolute right-4 top-4"
        }
    />
}