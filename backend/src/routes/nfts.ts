import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/nfts", (req, res) => {
  res.send("NFT API Endpoint");
});

export default router;
