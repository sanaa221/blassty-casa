import { LocationPOI } from '../types/Transport';

export interface UserStats {
    totalRides: number;
    totalKm: number;
    co2Saved: number; // kg
    timeSaved: number; // hours
    memberSince: string;
    level: 'Gold' | 'Silver' | 'Bronze';
}

export interface RideHistoryItem {
    id: string;
    date: string;
    from: string;
    to: string;
    type: 'tram' | 'bus' | 'taxi' | 'busway';
    price: number;
    duration: number; // minutes
}

export const MOCK_USER_DATA = {
    user: {
        name: "Amine El Amrani",
        email: "amine.amrani@example.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    stats: {
        totalRides: 47,
        totalKm: 158.4,
        co2Saved: 32.5,
        timeSaved: 12,
        memberSince: "Sept 2025",
        level: 'Gold'
    } as UserStats,
    history: [
        {
            id: 'TR-8821',
            date: 'Aujourd\'hui, 08:30',
            from: 'Sidi Moumen',
            to: 'Gare Casa Voyageurs',
            type: 'tram',
            price: 8,
            duration: 35
        },
        {
            id: 'BS-4029',
            date: 'Aujourd\'hui, 12:15',
            from: 'Technopark',
            to: 'Gare Oasis',
            type: 'bus',
            price: 5,
            duration: 12
        },
        {
            id: 'BW-1123',
            date: 'Hier, 17:45',
            from: 'Place Financière',
            to: 'Cité de l\'Air',
            type: 'busway',
            price: 6,
            duration: 22
        },
        {
            id: 'TX-9902',
            date: 'Hier, 20:30',
            from: 'Maarif',
            to: 'Ain Diab Plage',
            type: 'taxi',
            price: 28,
            duration: 15
        },
        {
            id: 'TR-7734',
            date: '2 Fév, 09:00',
            from: 'Place Nations Unies',
            to: 'Hay Hassani',
            type: 'tram',
            price: 8,
            duration: 40
        }
    ] as RideHistoryItem[],
    favorites: [
        { id: 'fav1', name: "Université Hassan II", address: "Route d'El Jadida", type: 'work' },
        { id: 'fav2', name: "Morocco Mall", address: "Boulevard de l'Océan", type: 'shopping' }
    ]
};
