"use client";

import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const current = theme === "system" ? systemTheme : theme;
    const isDark = current === "dark";

    const Icon = !isDark ? Sun : Moon;

    return <Icon
        onClick={() => setTheme(isDark ? "light" : "dark")}
        width={64}
        height={64}
        color={!isDark? "#f4f702" : "#FFF"}
        fill={!isDark? "#f7d802" : "#d4d4d4"}
        className={
            "cursor-pointer hover:rotate-45 hover:scale-105 transition-all duration-500 absolute right-4 top-4"
        }
    />
}