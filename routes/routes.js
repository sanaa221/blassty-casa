// Router pour la gestion des lignes de transport
const express = require('express');
const router = express.Router();
const { routes } = require('../data/mockData');
const routeService = require('../services/routeService');

/**
 * GET /api/routes
 * Récupère toutes les lignes de transport disponibles
 */
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            count: routes.length,
            data: routes
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des lignes:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des lignes"
        });
    }
});

/**
 * POST /api/routes/search-itinerary
 * Recherche un itinéraire entre deux arrêts
 * Body: { from: stopId, to: stopId, mode: "bus"|"tram"|"all" }
 */
router.post('/search-itinerary', (req, res) => {
    try {
        const { from, to, mode } = req.body;

        // Validation des paramètres
        if (!from || !to) {
            return res.status(400).json({
                success: false,
                message: "Les paramètres 'from' et 'to' sont requis"
            });
        }

        // Appeler le service de recherche d'itinéraire
        const result = routeService.searchItinerary(from, to, mode || 'all');

        // Retourner le résultat avec le code HTTP approprié
        if (result.success) {
            res.json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error("Erreur lors de la recherche d'itinéraire:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la recherche d'itinéraire"
        });
    }
});

module.exports = router;
