//Forma nova de importa o express criando uma const app
import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());//esse json é pra ele ler documento formato json quando ligar com o banco
app.use(cors())//o cors serve pra evitar conflitos rodando localmente

app.use("/", userRoutes)

app.listen(8800)