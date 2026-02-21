import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlassTheme } from '../constants/GlassTheme';
import { GlassThemeLight } from '../constants/GlassThemeLight';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    theme: typeof GlassTheme;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'dark',
    setMode: () => { },
    theme: GlassTheme,
    isDark: true,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>('dark'); // Default to dark preference
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Load preference
        const loadTheme = async () => {
            try {
                const savedMode = await AsyncStorage.getItem('user_theme_mode');
                if (savedMode) setMode(savedMode as ThemeMode);
            } catch (e) {
                console.error("Failed to load theme preference", e);
            } finally {
                setIsReady(true);
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        if (isReady) {
            AsyncStorage.setItem('user_theme_mode', mode).catch(e => console.error(e));
        }
    }, [mode, isReady]);

    const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
    const theme = isDark ? GlassTheme : GlassThemeLight;

    if (!isReady) return null; // Or a splash screen

    return (
        <ThemeContext.Provider value={{ mode, setMode, theme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
