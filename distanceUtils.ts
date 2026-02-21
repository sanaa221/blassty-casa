/**
 * Calcule la distance entre deux points GPS en utilisant la formule Haversine
 * @param lat1 Latitude du point 1
 * @param lon1 Longitude du point 1
 * @param lat2 Latitude du point 2
 * @param lon2 Longitude du point 2
 * @returns Distance en kilomètres
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Formate la distance pour l'affichage
 * @param km Distance en kilomètres
 * @returns Distance formatée (ex: "1.2 km" ou "350 m")
 */
export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
}

/**
 * Trouve les véhicules les plus proches d'une position donnée
 * @param userLat Latitude de l'utilisateur
 * @param userLon Longitude de l'utilisateur
 * @param vehicles Liste de tous les véhicules
 * @param limit Nombre maximum de résultats
 * @param typeFilter Filtre par type de véhicule (optionnel)
 * @returns Liste des véhicules triés par distance
 */
export function findNearestVehicles(
    userLat: number,
    userLon: number,
    vehicles: any[],
    limit: number = 5,
    typeFilter?: string
): any[] {
    // Calculer la distance pour chaque véhicule
    const vehiclesWithDistance = vehicles
        .filter((v) => !typeFilter || v.type === typeFilter)
        .map((vehicle) => ({
            ...vehicle,
            distance: calculateDistance(userLat, userLon, vehicle.lat, vehicle.lng),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);

    return vehiclesWithDistance;
}
