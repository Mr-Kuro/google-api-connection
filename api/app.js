import jwt_decode from "jwt-decode";
import express from "express";
import cors from "cors";
import routers from "./service/serviceControl.js";

const port = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);


app.listen(port, () => {
  console.log(`Server is running on http://localhost${port}`);
});
