/**
 * DONNÉES COMPLÈTES - TRANSPORT CASABLANCA
 * Sources: Casa Tramway, RATP Dev Casablanca, ONCF, Casablanca Baia
 * Dernière mise à jour: Mars 2024
 */

// ============ PALETTE COULEURS PAR MODE ============
const COLORS = {
    TRAM_T1: '#FF9800',      // Orange (unifié pour tous les trams)
    TRAM_T2: '#FF9800',      // Orange (unifié pour tous les trams)
    BUSWAY_BW1: '#7B1FA2',   // Violet (unifié pour busways)
    BUSWAY_BW2: '#7B1FA2',   // Violet (unifié pour busways)
    BUS: '#2196F3',          // Bleu (unifié pour tous les bus)
    TAXI: '#E53935',         // Rouge (petits taxis rouges de Casablanca)
    PARKING: '#455A64',      // Gris foncé
    TNS: '#E91E63'           // Magenta (train)
};

// ============ ARRÊTS TRAM T1 (37 stations) ============
const tramT1Stops = [
    { id: 1001, name: "Sidi Moumen", lat: 33.6012, lng: -7.5834 },
    { id: 1002, name: "Nassim", lat: 33.5995, lng: -7.5867 },
    { id: 1003, name: "Mohammed Zefzaf", lat: 33.5978, lng: -7.5901 },
    { id: 1004, name: "Centre de maintenance", lat: 33.5961, lng: -7.5935 },
    { id: 1005, name: "Hôpital Sidi Moumen", lat: 33.5944, lng: -7.5968 },
    { id: 1006, name: "Attacharouk", lat: 33.5927, lng: -7.6002 },
    { id: 1007, name: "Okba Ibn Nafii", lat: 33.5910, lng: -7.6036 },
    { id: 1008, name: "Hay Mohammadi", lat: 33.5889, lng: -7.5989 },
    { id: 1009, name: "Bahmad", lat: 33.5872, lng: -7.6023 },
    { id: 1010, name: "Anciens Abattoirs", lat: 33.5855, lng: -7.6057 },
    { id: 1011, name: "Ali Yaata", lat: 33.5838, lng: -7.6091 },
    { id: 1012, name: "Place Al Yassir", lat: 33.5921, lng: -7.6125 },
    { id: 1013, name: "Gare Casa Voyageurs", lat: 33.5924, lng: -7.6172 },
    { id: 1014, name: "La Résistance", lat: 33.5907, lng: -7.6206 },
    { id: 1015, name: "Mohammed Diouri", lat: 33.5890, lng: -7.6240 },
    { id: 1016, name: "Place des Nations Unies", lat: 33.5952, lng: -7.6197 },
    { id: 1017, name: "Place Mohammed V", lat: 33.5943, lng: -7.6234 },
    { id: 1018, name: "Hassan II", lat: 33.5926, lng: -7.6268 },
    { id: 1019, name: "Marché Central", lat: 33.5909, lng: -7.6302 },
    { id: 1020, name: "Les Hôpitaux", lat: 33.5876, lng: -7.6250 },
    { id: 1021, name: "Faculté de Médecine", lat: 33.5859, lng: -7.6284 },
    { id: 1022, name: "Abdelmoumen", lat: 33.5847, lng: -7.6089 },
    { id: 1023, name: "Croisement Abd El Moumen", lat: 33.5830, lng: -7.6318 },
    { id: 1024, name: "Bachkou", lat: 33.5813, lng: -7.6352 },
    { id: 1025, name: "Derb Ghalef", lat: 33.5796, lng: -7.6386 },
    { id: 1026, name: "Ghandi", lat: 33.5779, lng: -7.6420 },
    { id: 1027, name: "Panoramique", lat: 33.5762, lng: -7.6454 },
    { id: 1028, name: "Anoual", lat: 33.5745, lng: -7.6488 },
    { id: 1029, name: "Hay Hassani", lat: 33.5728, lng: -7.6522 },
    { id: 1030, name: "Lissasfa", lat: 33.5785, lng: -7.6389 },
    // Stations supplémentaires T1
    { id: 1031, name: "Riviera", lat: 33.5711, lng: -7.6556 },
    { id: 1032, name: "Beauséjour", lat: 33.5694, lng: -7.6590 },
    { id: 1033, name: "Anfa Clubs", lat: 33.5677, lng: -7.6624 },
    { id: 1034, name: "Anfa Park", lat: 33.5660, lng: -7.6658 },
    { id: 1035, name: "Place Financière", lat: 33.5643, lng: -7.6692 },
    { id: 1036, name: "Abdellah Ben Cherif", lat: 33.5626, lng: -7.6726 },
    { id: 1037, name: "Sidi Abderrahmane", lat: 33.5609, lng: -7.6760 }
];

// ============ ARRÊTS TRAM T2 (33 stations) ============
const tramT2Stops = [
    { id: 2001, name: "Sidi Bernoussi Terminus", lat: 33.6145, lng: -7.5923 },
    { id: 2002, name: "Préfecture Ain Sbaa", lat: 33.6128, lng: -7.5889 },
    { id: 2003, name: "Cité De L'air", lat: 33.6111, lng: -7.5855 },
    { id: 2004, name: "Gare De Ain Sbaa", lat: 33.6094, lng: -7.5821 },
    { id: 2005, name: "Hay Adil", lat: 33.6077, lng: -7.5787 },
    { id: 2006, name: "Hay El Farah", lat: 33.6060, lng: -7.5753 },
    { id: 2007, name: "Al wifaq", lat: 33.6043, lng: -7.5719 },
    { id: 2008, name: "Al Amane", lat: 33.6026, lng: -7.5685 },
    { id: 2009, name: "Mdakra", lat: 33.6009, lng: -7.5651 },
    { id: 2010, name: "Carrières Centrales", lat: 33.5992, lng: -7.5617 },
    { id: 2011, name: "kissariat Hay Mohammadi", lat: 33.5975, lng: -7.5583 },
    { id: 2012, name: "Cimetière Achohada", lat: 33.5958, lng: -7.5549 },
    { id: 2013, name: "Dar Laman", lat: 33.5941, lng: -7.5515 },
    { id: 2014, name: "Abi Dar El Ghafari", lat: 33.5924, lng: -7.5481 },
    { id: 2015, name: "2 Mars", lat: 33.5907, lng: -7.5447 },
    { id: 2016, name: "El Fida", lat: 33.5890, lng: -7.5413 },
    { id: 2017, name: "Derb Sultan", lat: 33.5876, lng: -7.6089 },
    { id: 2018, name: "Hay Hassani", lat: 33.5728, lng: -7.6522 },
    { id: 2019, name: "Hermitage", lat: 33.5856, lng: -7.5345 },
    { id: 2020, name: "Derb Milan", lat: 33.5839, lng: -7.5311 },
    { id: 2021, name: "Croisement Abd El Moumen", lat: 33.5830, lng: -7.6318 },
    { id: 2022, name: "Anoual", lat: 33.5745, lng: -7.6488 },
    { id: 2023, name: "Derb Ghalef", lat: 33.5796, lng: -7.6386 },
    { id: 2024, name: "Riviera", lat: 33.5711, lng: -7.6556 },
    { id: 2025, name: "Ghandi", lat: 33.5779, lng: -7.6420 },
    { id: 2026, name: "Beauséjour", lat: 33.5694, lng: -7.6590 },
    { id: 2027, name: "Anfa Clubs", lat: 33.5677, lng: -7.6624 },
    { id: 2028, name: "Anfa Park", lat: 33.5660, lng: -7.6658 },
    { id: 2029, name: "Place Financière", lat: 33.5643, lng: -7.6692 },
    { id: 2030, name: "Abdellah Ben Cherif", lat: 33.5626, lng: -7.6726 },
    { id: 2031, name: "Sidi Abderrahmane", lat: 33.5609, lng: -7.6760 },
    { id: 2032, name: "Littoral", lat: 33.5877, lng: -7.6810 },
    { id: 2033, name: "Aïn Diab Plage Terminus", lat: 33.5860, lng: -7.6844 }
];

// ============ ARRÊTS BUSWAY BW1 (20 stations) ============
const buswayBW1Stops = [
    { id: 3001, name: "Salmia 2 Terminus", lat: 33.5450, lng: -7.6950 },
    { id: 3002, name: "Sbata", lat: 33.5467, lng: -7.6916 },
    { id: 3003, name: "Stade Tessema", lat: 33.5484, lng: -7.6882 },
    { id: 3004, name: "Al Joulane", lat: 33.5501, lng: -7.6848 },
    { id: 3005, name: "Lahrizi", lat: 33.5518, lng: -7.6814 },
    { id: 3006, name: "Jardin Sunday", lat: 33.5535, lng: -7.6780 },
    { id: 3007, name: "Amgala", lat: 33.5552, lng: -7.6746 },
    { id: 3008, name: "Al Qods", lat: 33.5569, lng: -7.6712 },
    { id: 3009, name: "Sefrou", lat: 33.5586, lng: -7.6678 },
    { id: 3010, name: "Taza", lat: 33.5603, lng: -7.6644 },
    { id: 3011, name: "Al Inara", lat: 33.5620, lng: -7.6610 },
    { id: 3012, name: "Oulad Haddou", lat: 33.5637, lng: -7.6576 },
    { id: 3013, name: "Hay Chrifa", lat: 33.5654, lng: -7.6542 },
    { id: 3014, name: "Taddart", lat: 33.5671, lng: -7.6508 },
    { id: 3015, name: "Azzohour", lat: 33.5688, lng: -7.6474 },
    { id: 3016, name: "Californie", lat: 33.5705, lng: -7.6440 },
    { id: 3017, name: "Casa Nearshore", lat: 33.5722, lng: -7.6406 },
    { id: 3018, name: "Al Moustakbal", lat: 33.5739, lng: -7.6372 },
    { id: 3019, name: "Sidi Maarouf", lat: 33.5756, lng: -7.6338 },
    { id: 3020, name: "Omar El Khayam Terminus", lat: 33.5773, lng: -7.6304 }
];

// ============ ARRÊTS BUSWAY BW2 (22 stations) ============
const buswayBW2Stops = [
    { id: 3101, name: "Ouled Azzouz Terminus", lat: 33.6200, lng: -7.5400 },
    { id: 3102, name: "Errahma 1", lat: 33.6183, lng: -7.5434 },
    { id: 3103, name: "Errahma 2", lat: 33.6166, lng: -7.5468 },
    { id: 3104, name: "Moulay Touhami 1", lat: 33.6149, lng: -7.5502 },
    { id: 3105, name: "Moulay Touhami 2", lat: 33.6132, lng: -7.5536 },
    { id: 3106, name: "Yacoub Al Mansour 1", lat: 33.6115, lng: -7.5570 },
    { id: 3107, name: "Yacoub Al Mansour 2", lat: 33.6098, lng: -7.5604 },
    { id: 3108, name: "Moulay Abd Cherif 1", lat: 33.6081, lng: -7.5638 },
    { id: 3109, name: "Moulay Abd Cherif 2", lat: 33.6064, lng: -7.5672 },
    { id: 3110, name: "Oued Oum Rabi 1", lat: 33.6047, lng: -7.5706 },
    { id: 3111, name: "Oued Oum Rabi 2", lat: 33.6030, lng: -7.5740 },
    { id: 3112, name: "Carrefour Haj Fateh", lat: 33.6013, lng: -7.5774 },
    { id: 3113, name: "Centre-ville 1", lat: 33.5996, lng: -7.5808 },
    { id: 3114, name: "Centre-ville 2", lat: 33.5979, lng: -7.5842 },
    { id: 3115, name: "Centre-ville 3", lat: 33.5962, lng: -7.5876 },
    { id: 3116, name: "Place Financière", lat: 33.5643, lng: -7.6692 },
    { id: 3117, name: "Oulmes 1", lat: 33.5928, lng: -7.5944 },
    { id: 3118, name: "Oulmes 2", lat: 33.5911, lng: -7.5978 },
    { id: 3119, name: "Oulmes 3", lat: 33.5894, lng: -7.6012 },
    { id: 3120, name: "Oulmes 4", lat: 33.5877, lng: -7.6046 },
    { id: 3121, name: "Oulmes 5", lat: 33.5860, lng: -7.6080 },
    { id: 3122, name: "Oulmès Terminus", lat: 33.5843, lng: -7.6114 }
];

// ============ ARRÊTS BUS M'DINA BUS ============
const busStops = [
    { id: 4001, name: "Casa Voyageurs", lat: 33.5924, lng: -7.6172 },
    { id: 4002, name: "Derb Sultan", lat: 33.5876, lng: -7.6089 },
    { id: 4003, name: "Marché Central", lat: 33.5943, lng: -7.6234 },
    { id: 4004, name: "Maarif", lat: 33.5831, lng: -7.6310 },
    { id: 4005, name: "Twin Center", lat: 33.5847, lng: -7.6328 },
    { id: 4006, name: "Morocco Mall", lat: 33.5693, lng: -7.6867 },
    { id: 4007, name: "Ain Sebaa", lat: 33.6234, lng: -7.5456 },
    { id: 4008, name: "Bouskoura", lat: 33.4567, lng: -7.6234 },
    { id: 4009, name: "Sidi Maarouf", lat: 33.5756, lng: -7.6338 }
];

// ============ STATIONS TAXI ============
const taxiStations = [
    { id: 5001, name: "Station Taxi Casa Voyageurs", lat: 33.5920, lng: -7.6180 },
    { id: 5002, name: "Station Taxi Maarif", lat: 33.5835, lng: -7.6315 },
    { id: 5003, name: "Station Taxi Twin Center", lat: 33.5850, lng: -7.6330 },
    { id: 5004, name: "Station Taxi Morocco Mall", lat: 33.5695, lng: -7.6870 },
    { id: 5005, name: "Station Taxi Casa Port", lat: 33.6036, lng: -7.6158 },
    { id: 5006, name: "Station Taxi Place Mohammed V", lat: 33.5945, lng: -7.6236 }
];

// ============ PARKINGS PUBLICS ============
const parkings = [
    { id: 6001, name: "Parking Place Rachidi", lat: 33.5943, lng: -7.6234, capacity: 724, type: "souterrain", available: 450 },
    { id: 6002, name: "Parking Place Mohammed V", lat: 33.5952, lng: -7.6197, capacity: 173, type: "souterrain", available: 89 },
    { id: 6003, name: "Parking Félix Max Guedj", lat: 33.5889, lng: -7.6267, capacity: 270, type: "surface", available: 180 },
    { id: 6004, name: "Parking Casa Voyageurs", lat: 33.5924, lng: -7.6172, capacity: 120, type: "surface", available: 45 },
    { id: 6005, name: "Parking Maarif (Mehdi Ben Barka)", lat: 33.5831, lng: -7.6310, capacity: 50, type: "surface", available: 12 },
    { id: 6006, name: "Parking Roches Noires", lat: 33.6034, lng: -7.6156, capacity: 156, type: "surface", available: 98 },
    { id: 6007, name: "Parking 11 Janvier", lat: 33.5910, lng: -7.6200, capacity: 90, type: "surface", available: 34 },
    { id: 6008, name: "Parking Léon l'Africain", lat: 33.5876, lng: -7.6089, capacity: 60, type: "surface", available: 22 }
];

// ============ GARES TNS/ONCF ============
const tnsStations = [
    { id: 7001, name: "Casa-Port", lat: 33.6034, lng: -7.6156, type: "principale" },
    { id: 7002, name: "Casa Voyageurs", lat: 33.5924, lng: -7.6172, type: "principale" },
    { id: 7003, name: "Casa Oasis", lat: 33.5548, lng: -7.6374, type: "secondaire" },
    { id: 7004, name: "Ain Sebaa", lat: 33.6234, lng: -7.5456, type: "secondaire" },
    { id: 7005, name: "Mers Sultan", lat: 33.5831, lng: -7.6310, type: "secondaire" }
];

// ============ CONSOLIDATION ARRÊTS ============
const stops = [
    ...tramT1Stops.map(s => ({ ...s, type: 'tram', line: 'T1' })),
    ...tramT2Stops.map(s => ({ ...s, type: 'tram', line: 'T2' })),
    ...buswayBW1Stops.map(s => ({ ...s, type: 'busway', line: 'BW1' })),
    ...buswayBW2Stops.map(s => ({ ...s, type: 'busway', line: 'BW2' })),
    ...busStops.map(s => ({ ...s, type: 'bus' })),
    ...taxiStations.map(s => ({ ...s, type: 'taxi' })),
    ...parkings.map(s => ({ ...s, type: 'parking' })),
    ...tnsStations.map(s => ({ ...s, type: 'tns' }))
];

// ============ LIGNES DE TRANSPORT ============
const routes = [
    // TRAM T1
    {
        id: 10,
        name: "T1 - Sidi Moumen ↔ Lissasfa",
        stops: tramT1Stops.map(s => s.id),
        type: "tram",
        color: COLORS.TRAM_T1,
        line: "T1",
        operatingHours: { start: '05:30', end: '22:30' }
    },
    // TRAM T2
    {
        id: 20,
        name: "T2 - Sidi Bernoussi ↔ Aïn Diab",
        stops: tramT2Stops.map(s => s.id),
        type: "tram",
        color: COLORS.TRAM_T2,
        line: "T2",
        operatingHours: { start: '05:30', end: '22:30' }
    },
    // BUSWAY BW1
    {
        id: 30,
        name: "BW1 - Salmia 2 ↔ Omar El Khayam",
        stops: buswayBW1Stops.map(s => s.id),
        type: "busway",
        color: COLORS.BUSWAY_BW1,
        line: "BW1",
        operatingHours: { start: '05:30', end: '22:30' }
    },
    // BUSWAY BW2
    {
        id: 40,
        name: "BW2 - Ouled Azzouz ↔ Oulmès",
        stops: buswayBW2Stops.map(s => s.id),
        type: "busway",
        color: COLORS.BUSWAY_BW2,
        line: "BW2",
        operatingHours: { start: '05:30', end: '22:30' }
    },
    // BUS Ligne 1
    {
        id: 1,
        name: "Ligne 1 - Casa Voyageurs ↔ Morocco Mall",
        stops: [4001, 4002, 4003, 4004, 4005, 4006],
        type: "bus",
        color: COLORS.BUS,
        line: "1",
        operatingHours: { start: '06:00', end: '21:00' }
    },
    // BUS Ligne 2
    {
        id: 2,
        name: "Ligne 2 - Derb Sultan ↔ Ain Sebaa",
        stops: [4002, 4003, 4007],
        type: "bus",
        color: COLORS.BUS,
        line: "2",
        operatingHours: { start: '06:30', end: '21:30' }
    }
];

// ============ VÉHICULES EN TEMPS RÉEL ============
const buses = [
    // TRAMS T1 (6 rames)
    { id: 10001, type: 'tram', routeId: 10, line: 'T1', lat: 33.6012, lng: -7.5834, nextStopId: 1002, etaMinutes: 2, color: COLORS.TRAM_T1 },
    { id: 10002, type: 'tram', routeId: 10, line: 'T1', lat: 33.5889, lng: -7.5989, nextStopId: 1010, etaMinutes: 3, color: COLORS.TRAM_T1 },
    { id: 10003, type: 'tram', routeId: 10, line: 'T1', lat: 33.5952, lng: -7.6197, nextStopId: 1017, etaMinutes: 1, color: COLORS.TRAM_T1 },
    { id: 10004, type: 'tram', routeId: 10, line: 'T1', lat: 33.5831, lng: -7.6310, nextStopId: 1024, etaMinutes: 4, color: COLORS.TRAM_T1 },
    { id: 10005, type: 'tram', routeId: 10, line: 'T1', lat: 33.5745, lng: -7.6488, nextStopId: 1029, etaMinutes: 2, color: COLORS.TRAM_T1 },
    { id: 10006, type: 'tram', routeId: 10, line: 'T1', lat: 33.5660, lng: -7.6658, nextStopId: 1034, etaMinutes: 5, color: COLORS.TRAM_T1 },

    // TRAMS T2 (5 rames)
    { id: 20001, type: 'tram', routeId: 20, line: 'T2', lat: 33.6145, lng: -7.5923, nextStopId: 2003, etaMinutes: 2, color: COLORS.TRAM_T2 },
    { id: 20002, type: 'tram', routeId: 20, line: 'T2', lat: 33.5889, lng: -7.6417, nextStopId: 2017, etaMinutes: 3, color: COLORS.TRAM_T2 },
    { id: 20003, type: 'tram', routeId: 20, line: 'T2', lat: 33.6034, lng: -7.6156, nextStopId: 2025, etaMinutes: 5, color: COLORS.TRAM_T2 },
    { id: 20004, type: 'tram', routeId: 20, line: 'T2', lat: 33.5643, lng: -7.6692, nextStopId: 2030, etaMinutes: 4, color: COLORS.TRAM_T2 },
    { id: 20005, type: 'tram', routeId: 20, line: 'T2', lat: 33.5877, lng: -7.6810, nextStopId: 2033, etaMinutes: 1, color: COLORS.TRAM_T2 },

    // BUSWAY BW1 (4 bus)
    { id: 30001, type: 'busway', routeId: 30, line: 'BW1', lat: 33.5450, lng: -7.6950, nextStopId: 3003, etaMinutes: 3, color: COLORS.BUSWAY_BW1 },
    { id: 30002, type: 'busway', routeId: 30, line: 'BW1', lat: 33.5569, lng: -7.6712, nextStopId: 3010, etaMinutes: 2, color: COLORS.BUSWAY_BW1 },
    { id: 30003, type: 'busway', routeId: 30, line: 'BW1', lat: 33.5671, lng: -7.6508, nextStopId: 3016, etaMinutes: 4, color: COLORS.BUSWAY_BW1 },
    { id: 30004, type: 'busway', routeId: 30, line: 'BW1', lat: 33.5773, lng: -7.6304, nextStopId: 3001, etaMinutes: 8, color: COLORS.BUSWAY_BW1 },

    // BUSWAY BW2 (4 bus)
    { id: 40001, type: 'busway', routeId: 40, line: 'BW2', lat: 33.6200, lng: -7.5400, nextStopId: 3104, etaMinutes: 3, color: COLORS.BUSWAY_BW2 },
    { id: 40002, type: 'busway', routeId: 40, line: 'BW2', lat: 33.6098, lng: -7.5604, nextStopId: 3110, etaMinutes: 2, color: COLORS.BUSWAY_BW2 },
    { id: 40003, type: 'busway', routeId: 40, line: 'BW2', lat: 33.5996, lng: -7.5808, nextStopId: 3116, etaMinutes: 5, color: COLORS.BUSWAY_BW2 },
    { id: 40004, type: 'busway', routeId: 40, line: 'BW2', lat: 33.5877, lng: -7.6046, nextStopId: 3122, etaMinutes: 4, color: COLORS.BUSWAY_BW2 },

    // BUS Ligne 1 (3 bus)
    { id: 101, type: 'bus', routeId: 1, line: '1', lat: 33.5924, lng: -7.6172, nextStopId: 4002, etaMinutes: 3, color: COLORS.BUS },
    { id: 102, type: 'bus', routeId: 1, line: '1', lat: 33.5831, lng: -7.6310, nextStopId: 4005, etaMinutes: 2, color: COLORS.BUS },
    { id: 103, type: 'bus', routeId: 1, line: '1', lat: 33.5693, lng: -7.6867, nextStopId: 4001, etaMinutes: 8, color: COLORS.BUS },

    // BUS Ligne 2 (2 bus)
    { id: 201, type: 'bus', routeId: 2, line: '2', lat: 33.5876, lng: -7.6089, nextStopId: 4003, etaMinutes: 4, color: COLORS.BUS },
    { id: 202, type: 'bus', routeId: 2, line: '2', lat: 33.6234, lng: -7.5456, nextStopId: 4002, etaMinutes: 10, color: COLORS.BUS },

    // TAXIS (12 taxis répartis)
    { id: 601, type: 'taxi', lat: 33.5920, lng: -7.6180, available: true, color: COLORS.TAXI },
    { id: 602, type: 'taxi', lat: 33.5835, lng: -7.6315, available: true, color: COLORS.TAXI },
    { id: 603, type: 'taxi', lat: 33.5850, lng: -7.6330, available: false, color: COLORS.TAXI },
    { id: 604, type: 'taxi', lat: 33.5943, lng: -7.6234, available: true, color: COLORS.TAXI },
    { id: 605, type: 'taxi', lat: 33.5889, lng: -7.6417, available: true, color: COLORS.TAXI },
    { id: 606, type: 'taxi', lat: 33.5877, lng: -7.6810, available: false, color: COLORS.TAXI },
    { id: 607, type: 'taxi', lat: 33.6012, lng: -7.5834, available: true, color: COLORS.TAXI },
    { id: 608, type: 'taxi', lat: 33.5785, lng: -7.6389, available: true, color: COLORS.TAXI },
    { id: 609, type: 'taxi', lat: 33.6145, lng: -7.5923, available: false, color: COLORS.TAXI },
    { id: 610, type: 'taxi', lat: 33.5693, lng: -7.6867, available: true, color: COLORS.TAXI },
    { id: 611, type: 'taxi', lat: 33.6034, lng: -7.6156, available: true, color: COLORS.TAXI },
    { id: 612, type: 'taxi', lat: 33.5952, lng: -7.6197, available: false, color: COLORS.TAXI },
];

module.exports = { stops, routes, buses, parkings, tnsStations, COLORS };
