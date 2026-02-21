import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface UserLocation {
    latitude: number;
    longitude: number;
    accuracy: number | null;
}

export function useUserLocation() {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const requestLocation = async () => {
        setLoading(true);
        setError(null);

        try {
            // Demander la permission
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setError('Permission de localisation refusée');
                setLoading(false);
                return;
            }

            // Obtenir la position actuelle
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                accuracy: currentLocation.coords.accuracy,
            });
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la récupération de la position');
        } finally {
            setLoading(false);
        }
    };

    return {
        location,
        error,
        loading,
        requestLocation,
    };
}
