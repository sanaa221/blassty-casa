// Router pour les données temps réel
const express = require('express');
const router = express.Router();
const realtimeService = require('../services/realtimeService');

/**
 * GET /api/realtime/buses
 * Récupère les positions en temps réel de tous les bus
 */
router.get('/buses', (req, res) => {
    try {
        const busPositions = realtimeService.getBusPositions();

        res.json({
            success: true,
            count: busPositions.length,
            data: busPositions,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des positions des bus:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des positions des bus"
        });
    }
});

module.exports = router;
