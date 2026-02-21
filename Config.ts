import Constants from 'expo-constants';

// Configuration globale de l'application

// Détection automatique de l'adresse IP du serveur en développement
const debuggerHost = Constants.expoConfig?.hostUri || '';
const ipAddress = debuggerHost.split(':')[0] || 'localhost';

// --- CONFIGURATION DYNAMIQUE DU PORT ---
// On essaie les ports les plus communs
const PORTS_TO_PROBE = [3001, 3000, 3002];

export let API_BASE_URL = `http://${ipAddress}:3001`;
export let API_URL = `${API_BASE_URL}/api`;

/**
 * Tente de trouver le port actif du backend automatiquement
 */
export const discoverApiPort = async () => {
    for (const port of PORTS_TO_PROBE) {
        const baseUrl = `http://${ipAddress}:${port}`;
        try {
            // Un timeout court pour ne pas bloquer le démarrage
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 1000);

            const response = await fetch(baseUrl, {
                signal: controller.signal,
                method: 'GET'
            });

            clearTimeout(id);

            if (response.ok) {
                API_BASE_URL = baseUrl;
                API_URL = `${baseUrl}/api`;
                console.log(`📍 Backend automatique détecté sur : ${API_BASE_URL}`);
                return port;
            }
        } catch (err) {
            // Port non ouvert ou erreur de connexion, on continue
        }
    }
    return null;
};
