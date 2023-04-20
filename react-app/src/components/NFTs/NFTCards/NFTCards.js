import "./NFTCards.css";

const NFTCards = ({ NFT }) => {
  return (
    <div className="nft-card-container">
      <p>{NFT.title}</p>
      <img src={NFT.media[0].gateway} alt="NFT Preview"></img>
      {/* <p>{NFT.description}</p> */}
    </div>
  );
};

export default NFTCards;
