import { db } from "../db.js";

// Cadastro
export const registerUser = (req, res) => {
  const { nome, email, senha } = req.body;

  // 1️⃣ Verifica se o email já existe
  const qCheck = "SELECT * FROM usuarios WHERE email = ?";
  db.query(qCheck, [email], (err, data) => {
    if (err) return res.status(500).json("Erro ao verificar usuário");

    if (data.length > 0) {
      // Email já cadastrado
      return res.status(400).json("Este email já está cadastrado!");
    } else {
      // 2️⃣ Se não existir, cadastra
      const qInsert = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
      db.query(qInsert, [nome, email, senha], (err) => {
        if (err) return res.status(500).json("Erro ao cadastrar usuário");
        return res.status(200).json("Usuário cadastrado com sucesso!");
      });
    }
  });
};

// Fazer login
export const loginUser = (req, res) => {
  const { email, senha } = req.body;

  const q = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(q, [email, senha], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: data[0],
      });
    } else {
      return res.status(401).json("Email ou senha incorretos!");
    }
  });
};
