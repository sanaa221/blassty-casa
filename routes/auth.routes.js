const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// ⚠️ Utilisateur mock (projet académique)
const userMock = {
    id: 1,
    email: "admin@blasstycasa.ma",
    password: bcrypt.hashSync("123456", 10)
};

// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email !== userMock.email) {
        return res.status(401).json({ message: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, userMock.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
        { id: userMock.id, email: userMock.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({
        success: true,
        token
    });
});

module.exports = router;
