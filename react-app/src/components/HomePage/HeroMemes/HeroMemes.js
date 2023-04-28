import { useHistory } from "react-router-dom";
import cards from "../../../assets/cards.png";

const Hero = () => {
  const history = useHistory();
  const handleSeeAssets = () => {
    history.push("/nft");
  };

  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mt-8 lg:mt-0 lg:col-span-5 lg:flex m-auto">
          <img src={cards}></img>
        </div>
        <div className="mr-auto place-self-center lg:col-span-7 m-auto">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Seize the memes!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl">
            Check out specific collections like The Memes by 6529
          </p>
          <button
            // onClick={gmRedirect}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border bg-[#485986] border-gray-300 rounded-lg hover:bg-[#232c42]"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
