import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../constants/Config';

interface AuthProps {
    user: any;
    token: string | null;
    isLoading: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                if (storedToken) {
                    try {
                        // Vérifier si le token est expiré (optionnel)
                        const decoded: any = jwtDecode(storedToken);
                        if (decoded.exp * 1000 > Date.now()) {
                            setToken(storedToken);
                            setUser(decoded);
                        } else {
                            await SecureStore.deleteItemAsync('token');
                        }
                    } catch (e) {
                        console.error("Token invalid:", e);
                        await SecureStore.deleteItemAsync('token');
                    }
                }
            } catch (e) {
                console.error("Failed to load token:", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

    // Gestion de la protection des routes
    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inTabsGroup = segments[0] === '(tabs)';
        const isSplashScreen = !segments.length || segments.length === 0;

        // Ne rien faire sur le splash screen, il gère sa propre redirection
        if (isSplashScreen) return;

        if (!user && !inAuthGroup) {
            // Rediriger vers login si non connecté et pas dans auth
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            // Rediriger vers home si connecté
            router.replace('/(tabs)');
        }
    }, [user, segments, isLoading]);

    const signIn = async (newToken: string) => {
        try {
            await SecureStore.setItemAsync('token', newToken);
            setToken(newToken);
            const decoded = jwtDecode(newToken);
            setUser(decoded);
        } catch (e) {
            console.error("Error saving token:", e);
        }
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
