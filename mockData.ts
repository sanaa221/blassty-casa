// Données de test pour le Frontend (Miroir du Backend - DONNÉES RÉELLES)

export const stops = [
    // TRAM T1: Sidi Moumen ↔ Facultés (8 stations)
    { id: 101, name: "Sidi Moumen", type: "tram", lat: 33.6012, lng: -7.5834 },
    { id: 102, name: "Oulfa", type: "tram", lat: 33.5956, lng: -7.5912 },
    { id: 103, name: "Hay Mohammadi", type: "tram", lat: 33.5889, lng: -7.5989 },
    { id: 104, name: "Abdelmoumen", type: "tram", lat: 33.5847, lng: -7.6089 },
    { id: 105, name: "Place des Nations Unies", type: "tram", lat: 33.5952, lng: -7.6197 },
    { id: 106, name: "Zerktouni", type: "tram", lat: 33.5889, lng: -7.6267 },
    { id: 107, name: "Mers Sultan", type: "tram", lat: 33.5831, lng: -7.6310 },
    { id: 108, name: "Facultés", type: "tram", lat: 33.5785, lng: -7.6389 },

    // TRAM T2: Aïn Diab ↔ Sidi Bernoussi (6 stations)
    { id: 201, name: "Aïn Diab", type: "tram", lat: 33.5877, lng: -7.6810 },
    { id: 202, name: "Lalla Yacout", type: "tram", lat: 33.5910, lng: -7.6723 },
    { id: 203, name: "Anfa Place", type: "tram", lat: 33.5889, lng: -7.6417 },
    { id: 204, name: "Place Mohammed V", type: "tram", lat: 33.5952, lng: -7.6197 },
    { id: 205, name: "Casa Port", type: "tram", lat: 33.6034, lng: -7.6156 },
    { id: 206, name: "Sidi Bernoussi", type: "tram", lat: 33.6145, lng: -7.5923 },

    // BUS - Arrêts Principaux M'dina Bus
    { id: 1, name: "Casa Voyageurs", type: "bus", lat: 33.5924, lng: -7.6172 },
    { id: 2, name: "Derb Sultan", type: "bus", lat: 33.5876, lng: -7.6089 },
    { id: 3, name: "Marché Central", type: "bus", lat: 33.5943, lng: -7.6234 },
    { id: 4, name: "Maarif", type: "bus", lat: 33.5831, lng: -7.6310 },
    { id: 5, name: "Twin Center", type: "bus", lat: 33.5847, lng: -7.6328 },
    { id: 6, name: "Morocco Mall", type: "bus", lat: 33.5693, lng: -7.6867 },
    { id: 7, name: "Ain Sebaa", type: "bus", lat: 33.6234, lng: -7.5456 },
];

export const routes = [
    // TRAM T1
    {
        id: 10,
        name: "T1 - Sidi Moumen ↔ Facultés",
        stops: [101, 102, 103, 104, 105, 106, 107, 108],
        type: "tram",
        color: "#D32F2F"
    },
    // TRAM T2
    {
        id: 20,
        name: "T2 - Aïn Diab ↔ Sidi Bernoussi",
        stops: [201, 202, 203, 204, 205, 206],
        type: "tram",
        color: "#1976D2"
    },
    // BUS Ligne 1
    {
        id: 1,
        name: "Ligne 1 - Casa Voyageurs ↔ Morocco Mall",
        stops: [1, 2, 3, 4, 5, 6],
        type: "bus",
        color: "#4A148C"
    },
    // BUS Ligne 2
    {
        id: 2,
        name: "Ligne 2 - Derb Sultan ↔ Ain Sebaa",
        stops: [2, 3, 7],
        type: "bus",
        color: "#00796B"
    }
];
