import { useState } from "react";
import { NFT } from "../../types";
import { fetchNFTsForOwner } from "../../services/nftService";

const PortfolioAppraisal: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const ownedNfts = await fetchNFTsForOwner(walletAddress);
      setNfts(ownedNfts);
    } catch (err) {
      setError("Error fetching NFTs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Portfolio Appraisal</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="border p-2 mr-2 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch NFTs"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {nfts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Owned NFTs:</h2>
          <ul>
            {nfts.map((nft, index) => (
              <li key={index} className="mb-2">
                <strong>{nft.title}</strong> - {nft.contract.address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PortfolioAppraisal;
