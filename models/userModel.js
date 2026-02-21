const db = require('../database/db');
const bcrypt = require('bcryptjs');

// Mock User pour le développement sans base de données
const MOCK_USER = {
    id: 999,
    name: "Utilisateur Test",
    email: "test@example.com",
    password: "", // Sera géré dans findUserByEmail
    created_at: new Date()
};

// Créer un nouvel utilisateur
const createUser = (name, email, password, callback) => {
    if (!db.isAvailable) {
        console.log("🛠️ Mock: Création utilisateur simulée");
        return callback(null, { id: Date.now(), name, email });
    }

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(query, [name, email, password], function (err, results) {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, name, email });
    });
};

// Trouver un utilisateur par email
const findUserByEmail = async (email, callback) => {
    if (!db.isAvailable) {
        if (email.toLowerCase() === MOCK_USER.email) {
            console.log("🛠️ Mock: Retour du compte test");
            // On génère un hash pour "password" si c'est le compte test
            const hashedPassword = await bcrypt.hash("password", 10);
            return callback(null, { ...MOCK_USER, password: hashedPassword });
        }
        return callback(null, null);
    }

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

// Trouver un utilisateur par ID
const findUserById = (id, callback) => {
    if (!db.isAvailable) {
        if (id === MOCK_USER.id) return callback(null, MOCK_USER);
        return callback(null, null);
    }

    const query = `SELECT id, name, email, created_at FROM users WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};
