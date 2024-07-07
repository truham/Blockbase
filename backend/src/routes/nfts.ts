import { Router } from "express";

const router = Router();

router.get("/nfts", (req, res) => {
  res.send("NFT endpoint");
});

export default router;
