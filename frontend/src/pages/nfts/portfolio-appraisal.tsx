import { useState } from "react";
import { NFT } from "../../types";
import { fetchNFTsForOwner } from "../../services/nftService";

const PortfolioAppraisal: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sampleWalletAddress = "0xc6400A5584db71e41B0E5dFbdC769b54B91256CD";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchNFTs(walletAddress);
  };

  const fetchNFTs = async (address: string) => {
    setLoading(true);
    setError("");

    try {
      const ownedNfts = await fetchNFTsForOwner(address);
      setNfts(ownedNfts);
    } catch (err) {
      setError("Error fetching NFTs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const useSampleAddress = () => {
    setWalletAddress(sampleWalletAddress);
    fetchNFTs(sampleWalletAddress);
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
          className="bg-blue-500 text-white p-2 rounded mr-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch NFTs"}
        </button>
        <button
          type="button"
          onClick={useSampleAddress}
          className="bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          Use Test Address
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
