'use client'

import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";
import type {ThemeContextType} from "@/types/context";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'dark'| ''>('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | '' || '';
        setTheme(savedTheme);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggle = () => setTheme(t => (t === "" ? "dark" : ""));

    const values = {
        theme,
        toggle,
    };
    if (!mounted) {
        return (
            <ThemeContext.Provider value={values}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("ThemeContext must be used within ThemeProvider");
    return ctx;
}