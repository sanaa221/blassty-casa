// Service de simulation temps réel pour les bus
const { buses: initialBuses, routes, stops } = require('../data/mockData');

// Copie des positions des bus (modifiée en temps réel)
let busPositions = JSON.parse(JSON.stringify(initialBuses));

// Intervalle de simulation
let simulationInterval = null;
let io = null;

function setSocketIo(socketIo) {
    io = socketIo;
}

/**
 * Démarre la simulation de mouvement des véhicules (Tram, Busway, Bus, Taxi)
 * Met à jour les positions toutes les 3 secondes
 */
function startSimulation() {
    console.log("🚌 Démarrage de la simulation temps réel : Tram, Busway, Bus, Taxi...");

    if (simulationInterval) {
        clearInterval(simulationInterval);
    }

    // Mettre à jour les positions plus fréquemment (3s)
    simulationInterval = setInterval(() => {
        busPositions = busPositions.map(vehicle => {
            // Logique de mouvement selon le type
            if (vehicle.type === 'taxi') {
                // Taxis : mouvement contraint dans les limites de Casablanca
                // Limites approximatives de Casablanca (terre ferme)
                const CASA_BOUNDS = {
                    minLat: 33.52, maxLat: 33.61,
                    minLng: -7.70, maxLng: -7.50
                };

                let latChange = (Math.random() - 0.5) * 0.003;
                let lngChange = (Math.random() - 0.5) * 0.003;

                let newLat = vehicle.lat + latChange;
                let newLng = vehicle.lng + lngChange;

                // Contraindre aux limites
                newLat = Math.max(CASA_BOUNDS.minLat, Math.min(CASA_BOUNDS.maxLat, newLat));
                newLng = Math.max(CASA_BOUNDS.minLng, Math.min(CASA_BOUNDS.maxLng, newLng));

                return {
                    ...vehicle,
                    lat: parseFloat(newLat.toFixed(6)),
                    lng: parseFloat(newLng.toFixed(6))
                };
            } else if (vehicle.type === 'tram' || vehicle.type === 'busway' || vehicle.type === 'bus') {
                // Tram, Busway, Bus : mouvement vers le prochain arrêt
                const route = routes.find(r => r.id === vehicle.routeId);
                if (!route) return vehicle;

                const currentStopIndex = route.stops.indexOf(vehicle.nextStopId);
                if (currentStopIndex === -1) return vehicle;

                const nextStop = stops.find(s => s.id === vehicle.nextStopId);
                if (!nextStop) return vehicle;

                // Calculer direction vers le prochain arrêt
                const latDiff = nextStop.lat - vehicle.lat;
                const lngDiff = nextStop.lng - vehicle.lng;
                const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

                // Vitesse de déplacement (ajustable)
                const speed = 0.001; // ~100m par update

                let newLat = vehicle.lat;
                let newLng = vehicle.lng;
                let newEta = Math.max(vehicle.etaMinutes - 0.5, 0);
                let newNextStopId = vehicle.nextStopId;

                if (distance > speed) {
                    // Se déplacer vers l'arrêt
                    newLat = vehicle.lat + (latDiff / distance) * speed;
                    newLng = vehicle.lng + (lngDiff / distance) * speed;
                } else {
                    // Arrivé à l'arrêt, passer au suivant
                    const nextIndex = (currentStopIndex + 1) % route.stops.length;
                    newNextStopId = route.stops[nextIndex];
                    newEta = Math.floor(Math.random() * 5) + 2;
                    newLat = nextStop.lat;
                    newLng = nextStop.lng;
                }

                return {
                    ...vehicle,
                    lat: parseFloat(newLat.toFixed(6)),
                    lng: parseFloat(newLng.toFixed(6)),
                    etaMinutes: parseFloat(newEta.toFixed(1)),
                    nextStopId: newNextStopId
                };
            }
            return vehicle;
        });

        // 📡 Émettre l'événement WebSocket aux clients connectés
        if (io) {
            io.emit('vehicles_update', busPositions);
        }

        // console.log(`🔄 Positions mises à jour à ${new Date().toLocaleTimeString()}`);
    }, 3000); // 3 secondes

    console.log("✅ Simulation démarrée avec succès");
}

function getBusPositions() {
    return busPositions;
}

function stopSimulation() {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        console.log("⏹️ Simulation arrêtée");
    }
}

module.exports = {
    startSimulation,
    getBusPositions,
    stopSimulation,
    setSocketIo
};
