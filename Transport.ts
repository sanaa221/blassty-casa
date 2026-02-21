export type TransportMode = 'tram' | 'bus' | 'busway' | 'taxi' | 'parking' | 'train' | 'unknown';

export interface LocationCoordinates {
    latitude: number;
    longitude: number;
}

export interface LocationPOI extends LocationCoordinates {
    id: string;
    name: string;
    address: string;
    type: 'train' | 'work' | 'shopping' | 'business' | 'tourism' | 'tech' | 'general';
}

export interface Vehicle {
    id: string;
    type: TransportMode;
    lat: number;
    lng: number;
    routeId?: string;
    speed?: number;
    heading?: number;
    etaMinutes?: number; // Estimated arrival at nearest relevant stop
    color?: string; // Override color
}

export interface RouteStop {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface TransportRoute {
    id: string;
    name: string;
    mode: TransportMode;
    color: string;
    stops: RouteStop[];
    path: LocationCoordinates[]; // Polyline for the route
}

export interface Parking {
    id: string;
    name: string;
    lat: number;
    lng: number;
    capacity: number;
    available: number;
    pricePerHour?: number;
}

export interface ItineraryStats {
    duration: number; // in minutes
    distance: number; // in km
    cost?: number; // in MAD
    calories?: number;
}
