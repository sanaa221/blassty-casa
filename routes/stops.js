// Router pour la gestion des arrêts de transport
const express = require('express');
const router = express.Router();
const { stops } = require('../data/mockData');

/**
 * GET /api/stops
 * Récupère tous les arrêts disponibles
 */
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            count: stops.length,
            data: stops
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des arrêts:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des arrêts"
        });
    }
});

/**
 * GET /api/stops/:id
 * Récupère un arrêt spécifique par son ID
 */
router.get('/:id', (req, res) => {
    try {
        const stopId = parseInt(req.params.id);
        const stop = stops.find(s => s.id === stopId);

        if (!stop) {
            return res.status(404).json({
                success: false,
                message: "Arrêt non trouvé"
            });
        }

        res.json({
            success: true,
            data: stop
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arrêt:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'arrêt"
        });
    }
});

module.exports = router;
