import { useHistory } from "react-router-dom";
import cards from "../../../assets/cards.png";
import "./Hero.css";

const Hero = () => {
  const history = useHistory();
  const handleSeeAssets = () => {
    history.push("/nft");
  };

  return (
    <div className="hero-outer ">
      <div className="hero-container">
        {/* Left */}
        <div className="hero-left">
          <img className="hero-img" src={cards} alt="Banner Cards"></img>
        </div>

        {/* Right */}
        <div className="hero-right">
          <p className="text-3xl font-medium">
            View available digital collectibles
          </p>
          <button onClick={handleSeeAssets}>See more NFTs</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
