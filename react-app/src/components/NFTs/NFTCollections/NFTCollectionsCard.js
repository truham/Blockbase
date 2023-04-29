const NFTCollectionsCard = ({ NFT }) => {
  const hexToDecimal = (hexStr) => {
    return parseInt(hexStr, 16);
  };

  const openSeaUrl = `https://opensea.io/assets/${
    NFT.contract.address
  }/${hexToDecimal(NFT.id.tokenId)}`;

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl aspect-w-1 aspect-h-1 relative">
      <img
        className="object-contain h-40 pt-5"
        src={
          NFT.media[0].gateway ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt="NFT Preview"
      ></img>
      <div className="card-body">
        <p className="font-bold">{NFT.title || "No Title"}</p>
        <div className="card-actions justify-end">
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
    </div>
  );
};

export default NFTCollectionsCard;
