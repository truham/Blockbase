import "./NFTCards.css";

const NFTCards = ({ NFT }) => {
  return (
    <div className="nft-card-container">
      <p>{NFT.title}</p>
      <img
        src={
          NFT.media[0].gateway ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt="NFT Preview"
      ></img>
      {/* <p>{NFT.description}</p> */}
      <a target="_blank" href={`https://etherscan.io/NFT.contract.address`}></a>
    </div>
  );
};

export default NFTCards;
