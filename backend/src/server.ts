import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import coinsRoutes from "./routes/coins";
import nftsRoutes from "./routes/nfts";
import nftPortfolioRoutes from "./routes/nftPortfolio";
import nftCollectionRoutes from "./routes/nftCollections";
import { clearCache } from "./utils/cache";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use("/api", coinsRoutes);
app.use("/api", nftsRoutes);
app.use("/api", nftPortfolioRoutes);
app.use("/api", nftCollectionRoutes);

app.get("/", (req, res) => {
  res.send("xoxo");
});

app.get("/clear-cache", (req, res) => {
  clearCache();
  res.send("Cache cleared");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
