// Service de recherche d'itinéraires pour BlasstyCasa
const { routes, stops } = require('../data/mockData');

/**
 * Recherche un itinéraire entre deux arrêts
 * @param {number} from - ID de l'arrêt de départ
 * @param {number} to - ID de l'arrêt d'arrivée
 * @param {string} mode - Mode de transport ("bus", "tram", "all")
 * @returns {object} Résultat de la recherche avec itinéraire ou message d'erreur
 */
function searchItinerary(from, to, mode) {
    try {
        // Validation des paramètres
        if (!from || !to) {
            return {
                success: false,
                message: "Les arrêts de départ et d'arrivée sont requis"
            };
        }

        // Vérifier que les arrêts existent
        const fromStop = stops.find(s => s.id === parseInt(from));
        const toStop = stops.find(s => s.id === parseInt(to));

        if (!fromStop || !toStop) {
            return {
                success: false,
                message: "Arrêt de départ ou d'arrivée introuvable"
            };
        }

        // Filtrer les routes selon le mode de transport
        let availableRoutes = routes;
        if (mode && mode !== "all") {
            availableRoutes = routes.filter(r => r.type === mode);
        }

        // Chercher une route qui contient les deux arrêts
        for (let route of availableRoutes) {
            const fromIndex = route.stops.indexOf(parseInt(from));
            const toIndex = route.stops.indexOf(parseInt(to));

            // Si les deux arrêts sont sur cette ligne
            if (fromIndex !== -1 && toIndex !== -1) {
                // Calculer les étapes de l'itinéraire
                const direction = fromIndex < toIndex ? 1 : -1;
                const stopsInRoute = [];

                if (direction === 1) {
                    for (let i = fromIndex; i <= toIndex; i++) {
                        const stopId = route.stops[i];
                        const stop = stops.find(s => s.id === stopId);
                        stopsInRoute.push(stop);
                    }
                } else {
                    for (let i = fromIndex; i >= toIndex; i--) {
                        const stopId = route.stops[i];
                        const stop = stops.find(s => s.id === stopId);
                        stopsInRoute.push(stop);
                    }
                }

                // Calculer la durée estimée (2 minutes par arrêt)
                const numberOfStops = Math.abs(toIndex - fromIndex);
                const duration = numberOfStops * 2;

                // Calculer la distance approximative (en km)
                const distance = numberOfStops * 0.8;

                return {
                    success: true,
                    route: {
                        id: route.id,
                        name: route.name,
                        type: route.type
                    },
                    steps: stopsInRoute,
                    duration: duration,
                    distance: parseFloat(distance.toFixed(1)),
                    numberOfStops: numberOfStops + 1
                };
            }
        }

        // Aucune route directe trouvée
        return {
            success: false,
            message: "Aucun itinéraire direct trouvé entre ces deux arrêts"
        };

    } catch (error) {
        console.error("Erreur lors de la recherche d'itinéraire:", error);
        return {
            success: false,
            message: "Erreur lors de la recherche d'itinéraire"
        };
    }
}

module.exports = {
    searchItinerary
};
