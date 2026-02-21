const mysql = require('mysql2');

// Configuration de la connexion (XAMPP défaut)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Pas de mot de passe par défaut sur XAMPP
    multipleStatements: true // Permet d'exécuter plusieurs requêtes (création DB + Table)
};

// Créer une connexion sans sélectionner de DB
const connection = mysql.createConnection(dbConfig);

// Flag pour savoir si la DB est réellement disponible
connection.isAvailable = false;

connection.connect((err) => {
    if (err) {
        console.warn('⚠️  MySQL non disponible:', err.message);
        console.warn('💡 Le serveur démarrera en mode MOCK (données en dur).');
        return;
    }

    console.log('✅ Connecté au serveur MySQL.');
    connection.isAvailable = true;

    // Script d'initialisation : Créer DB et Table
    const initSql = `
        CREATE DATABASE IF NOT EXISTS blasstycasa;
        USE blasstycasa;
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    connection.query(initSql, (err) => {
        if (err) {
            console.error("❌ Erreur initialisation DB:", err.message);
            connection.isAvailable = false;
        } else {
            console.log("✅ Base de données 'blasstycasa' prête.");
        }
    });
});

// Wrapper pour garder la connexion active
module.exports = connection;
