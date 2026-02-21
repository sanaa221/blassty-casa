const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Enregistrer un nouvel utilisateur
const register = (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    User.findUserByEmail(email, async (err, user) => {
        if (user) {
            return res.status(409).json({ success: false, message: "Cet email est déjà utilisé" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        User.createUser(name, email.toLowerCase(), encryptedPassword, (err, newUser) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Erreur lors de la création de l'utilisateur" });
            }

            const token = jwt.sign(
                { user_id: newUser.id, email, name },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            newUser.token = token;
            res.status(201).json({ success: true, data: newUser });
        });
    });
};

// Connexion utilisateur
const login = (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    User.findUserByEmail(email, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user.id, email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            user.token = token;
            // Ne pas renvoyer le hash du mot de passe
            delete user.password;

            return res.status(200).json({ success: true, data: user });
        }

        return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    });
};

// Récupérer le profil utilisateur
const getMe = (req, res) => {
    User.findUserById(req.user.user_id, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ success: true, data: user });
    });
};

module.exports = {
    register,
    login,
    getMe
};
