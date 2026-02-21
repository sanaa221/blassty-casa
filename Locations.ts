export const POPULAR_LOCATIONS = [
    {
        id: 'poi_1',
        name: 'Gare Casa Voyageurs',
        address: 'Boulevard Ba Hmad, Casablanca',
        latitude: 33.5898,
        longitude: -7.5898,
        type: 'train'
    },
    {
        id: 'poi_2',
        name: 'Casanearshore Park',
        address: 'Sidi Maarouf, Casablanca',
        latitude: 33.5356,
        longitude: -7.6321,
        type: 'work'
    },
    {
        id: 'poi_3',
        name: 'Morocco Mall',
        address: 'Ain Diab, Casablanca',
        latitude: 33.5786,
        longitude: -7.7011,
        type: 'shopping'
    },
    {
        id: 'poi_4',
        name: 'Twin Center',
        address: 'Boulevard Mohamed Zerktouni',
        latitude: 33.5869,
        longitude: -7.6322,
        type: 'business'
    },
    {
        id: 'poi_5',
        name: 'Mosquée Hassan II',
        address: 'Boulevard de la Corniche',
        latitude: 33.6086,
        longitude: -7.6320,
        type: 'tourism'
    },
    {
        id: 'poi_6',
        name: 'Technopark',
        address: 'Route de Nouaceur',
        latitude: 33.5544,
        longitude: -7.6366,
        type: 'tech'
    }
];

export interface LocationPOI {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    type: string;
}
