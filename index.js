// Serveur Express pour BlasstyCasa Backend API
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import des routes
const stopsRouter = require('./routes/stops');
const routesRouter = require('./routes/routes');
const realtimeRouter = require('./routes/realtime');
const authRouter = require('./routes/auth');

// Import du service temps réel
const realtimeService = require('./services/realtimeService');

const http = require('http');
const { Server } = require('socket.io');

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // En prod, restreindre à l'URL du frontend
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parser le JSON dans les requêtes
app.use(cors()); // Activer CORS pour les requêtes cross-origin

// Middleware de logging pour déboguer les routes
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Injecter io dans le realtimeService
realtimeService.setSocketIo(io);

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenue sur l'API BlasstyCasa - Mobilité Casablanca",
        version: "1.0.0",
        endpoints: {
            stops: "/api/stops",
            routes: "/api/routes",
            searchItinerary: "/api/routes/search-itinerary",
            realtimeBuses: "/api/realtime/buses"
        }
    });
});

// Montage des// Routes API
app.use('/api/stops', stopsRouter);
app.use('/api/routes', routesRouter);
app.use('/api/realtime', realtimeRouter);
app.use('/api/auth', authRouter);

// Routes pour parkings et TNS
const { parkings, tnsStations } = require('./data/mockData');
app.get('/api/parkings', (req, res) => {
    res.json(parkings);
});
app.get('/api/tns', (req, res) => {
    res.json(tnsStations);
});

// Gestion des routes non trouvées
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route non trouvée"
    });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error("Erreur serveur:", err);
    res.status(500).json({
        success: false,
        message: "Erreur interne du serveur"
    });
});

// Démarrage du serveur via http server (pas app.listen)
server.listen(PORT, () => {
    console.log(`\n🚀 Serveur BlasstyCasa démarré avec succès!`);
    console.log(`📍 Server running on http://localhost:${PORT}`);
    console.log(`📡 Socket.io ready`);
    console.log(`📚 Documentation: http://localhost:${PORT}\n`);

    // Démarrer la simulation temps réel des bus
    realtimeService.startSimulation();
});

// Gestion de l'arrêt propre du serveur
process.on('SIGINT', () => {
    console.log('\n⏹️ Arrêt du serveur...');
    realtimeService.stopSimulation();
    process.exit(0);
});
