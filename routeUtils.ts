import { stops, routes } from '../data/mockData';

export interface RouteResult {
    type: 'bus' | 'tram' | 'taxi' | 'walk';
    line?: string;
    duration: number; // minutes
    price: number; // Dhs
    steps: string[];
    vehicleId?: number;
    coordinates?: { latitude: number; longitude: number }[]; // Pour afficher sur la carte
}

/**
 * Trouve le meilleur itinéraire entre deux points
 * (Logique simplifiée pour la démo)
 */
export function findBestRoute(
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number
): RouteResult[] {
    const results: RouteResult[] = [];

    // 1. Option Taxi (Toujours disponible)
    const dist = calculateDistance(startLat, startLng, destLat, destLng);
    const taxiDuration = Math.round((dist / 30) * 60) + 5; // +5 min attente
    const taxiPrice = Math.round(7.5 + (dist * 5));

    results.push({
        type: 'taxi',
        duration: taxiDuration,
        price: taxiPrice,
        steps: ['Commander un taxi', `Trajet direct (${formatDistance(dist)})`, 'Arrivée à destination'],
        coordinates: [
            { latitude: startLat, longitude: startLng },
            { latitude: destLat, longitude: destLng }
        ]
    });

    // 2. Option Tram (Si disponible à proximité)
    if (dist > 2) {
        // Trouver la ligne de tram la plus proche
        const tramRoute = routes.find(r => r.type === 'tram');
        if (tramRoute) {
            const tramStops = tramRoute.stops.map(stopId => stops.find(s => s.id === stopId)).filter(Boolean);
            const coordinates = tramStops.map(stop => ({ latitude: stop!.lat, longitude: stop!.lng }));

            results.push({
                type: 'tram',
                line: tramRoute.name,
                duration: Math.round(taxiDuration * 1.5),
                price: 6,
                steps: ['Marcher jusqu\'à station', `Prendre ${tramRoute.name}`, 'Descendre à destination', 'Marcher jusqu\'à destination'],
                coordinates
            });
        }
    }

    // 3. Option Bus
    const busRoute = routes.find(r => r.type === 'bus');
    if (busRoute) {
        const busStops = busRoute.stops.map(stopId => stops.find(s => s.id === stopId)).filter(Boolean);
        const coordinates = busStops.map(stop => ({ latitude: stop!.lat, longitude: stop!.lng }));

        results.push({
            type: 'bus',
            line: busRoute.name,
            duration: Math.round(taxiDuration * 2),
            price: 5,
            steps: ['Marcher jusqu\'à l\'arrêt', `Prendre ${busRoute.name}`, 'Descendre à destination'],
            coordinates
        });
    }

    return results.sort((a, b) => a.duration - b.duration);
}

// Utilitaires
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(d: number) { return d * (Math.PI / 180); }

function formatDistance(km: number) {
    return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}
