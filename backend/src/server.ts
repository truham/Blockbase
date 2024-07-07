import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import coinsRoutes from "./routes/coins";
import nftsRoutes from "./routes/nfts";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api", coinsRoutes);
app.use("/api", nftsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
