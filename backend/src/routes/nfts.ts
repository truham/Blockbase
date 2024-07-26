import { Router } from "express";

const router = Router();

router.get("/nfts", (req, res) => {
  res.send("NFT API Endpoint");
});

export default router;
