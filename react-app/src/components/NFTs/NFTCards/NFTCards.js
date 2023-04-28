import "./NFTCards.css";

const NFTCards = ({ NFT }) => {
  const hexToDecimal = (hexStr) => {
    return parseInt(hexStr, 16);
  };

  const openSeaUrl = `https://opensea.io/assets/${
    NFT.contract.address
  }/${hexToDecimal(NFT.id.tokenId)}`;

  return (
    <div className="nft-card-container flex flex-col justify-between h-full">
      <p>{NFT.title || "No Title"}</p>
      <img
        src={
          NFT.media[0].gateway ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt="NFT Preview"
      ></img>
      <div className="flex justify-end mt-2">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://etherscan.io/nft/${
            NFT.contract.address
          }/${hexToDecimal(NFT.id.tokenId)}`}
        >
          <img
            className="h-5 m-1 cursor-pointer"
            alt="etherscan logo"
            src="https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
          ></img>
        </a>

        <a target="_blank" rel="noreferrer" href={openSeaUrl}>
          <img
            className="h-5 m-1 cursor-pointer"
            alt="opensea logo"
            src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default NFTCards;
