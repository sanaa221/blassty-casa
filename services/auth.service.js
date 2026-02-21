import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Pour projet académique :
 * utilisateurs stockés en mémoire
 * (plus tard → MongoDB)
 */
const users = [];

export const registerUser = async ({ name, email, password }) => {
  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error("Utilisateur déjà existant");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: "user"
  };

  users.push(user);
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Email incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};
