import { API_URL } from '../constants/Config';
import { LocationPOI } from '../types/Transport';

export const TransportService = {
    /**
     * Search for places using OpenStreetMap (Nominatim)
     */
    async searchPlaces(query: string): Promise<LocationPOI[]> {
        if (query.length < 3) return [];

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    query
                )}, Casablanca, Maroc&format=json&addressdetails=1&limit=5&countrycodes=MA`,
                // Start User-Agent with app name to comply with OSM policy
                { headers: { 'User-Agent': 'BlasstyCasa/1.0' } }
            );

            const data = await response.json();

            return data.map((item: any) => ({
                id: item.place_id.toString(),
                name: item.name || item.address.road || item.display_name.split(',')[0],
                address: item.display_name,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
                type: 'general'
            }));
        } catch (error) {
            console.error("Search Service Error:", error);
            return [];
        }
    },

    /**
     * Fetch static routes info (mocked or real API)
     */
    async getRoutes() {
        try {
            const res = await fetch(`${API_URL}/routes`);
            return await res.json();
        } catch (e) {
            console.warn("Failed to fetch routes, returning empty", e);
            return [];
        }
    },

    /**
     * Fetch Parkings
     */
    async getParkings() {
        try {
            const res = await fetch(`${API_URL}/parkings`);
            return await res.json();
        } catch (e) {
            console.warn("Failed to fetch parkings", e);
            return [];
        }
    },

    /**
     * Fetch Train Stations (TNS)
     */
    async getTrainStations() {
        try {
            const res = await fetch(`${API_URL}/tns`);
            return await res.json();
        } catch (e) {
            console.warn("Failed to fetch stations", e);
            return [];
        }
    },

    /**
     * Calculate itinerary options with realistic prices
     */
    calculateItineraryOptions(distanceKm: number, durationMin: number) {
        // Base calculations
        // Taxi: Start 7.5 MAD + approx 4 MAD/km in heavy traffic or 2.5 empty
        const taxiPrice = Math.max(7.5, 7.5 + (distanceKm * 3.5));

        return [
            {
                type: 'tram',
                name: 'Tramway',
                price: 8,
                duration: durationMin,
                frequency: '6 min'
            },
            {
                type: 'bus',
                name: 'Bus',
                price: 5, // Ligne standard
                duration: Math.round(durationMin * 1.3), // Slower traffic
                frequency: '15 min'
            },
            {
                type: 'busway',
                name: 'Busway',
                price: 6,
                duration: Math.round(durationMin * 0.9), // Dedicated lane
                frequency: '10 min'
            },
            {
                type: 'taxi',
                name: 'Petit Taxi',
                price: Math.ceil(taxiPrice),
                duration: Math.round(durationMin * 0.5), // Faster
                frequency: 'Dispo'
            }
        ];
    }
};
