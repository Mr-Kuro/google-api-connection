import jwt_decode from "jwt-decode";
import { Router } from "express";
import postgress from "pg";


// ROTAS DA API
const router = Router();
router.post("/", async (req, res) => {
  const { token } = req.body;

  const decripted_token = await descripted_token(token);

  console.log(decripted_token);
  res.status(200).json(decripted_token);
});


// SERVIÇOS DA API
async function descripted_token(token) {
  try {
    const decripted_token = token ? await jwt_decode(token) : new Error();

    return decripted_token;
  } catch (error) {
    console.log(error, "Erro ao descriptografar token", descripted_token);
    return error
  }
}

// CONEXÃO COM O BANCO DE DADOS
postgress.defaults.ssl = true;
const { Pool } = postgress;




// EXPORTANDO MODULOS
export default router;