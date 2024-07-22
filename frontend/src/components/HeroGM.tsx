import { useRouter } from "next/router";
import gmdeekay from "../assets/gmdeekay.mp4";
import squiggly from "../assets/squiggly.png";

const HeroGM = () => {
  const router = useRouter();
  const gmRedirect = () => {
    router.push("/nft/profile");
  };

  return (
    <section className="bg-[#2f3a58]">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="flex">
            <h1 className="max-w-2xl mr-4 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-100">
              GM
            </h1>
            <img
              className="h-12 place-self-center"
              src={squiggly.src}
              alt="squiggly"
            ></img>
          </div>
          <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl">
            This project is centered around integrating cryptocurrency and NFT
            APIs. Enjoy exploring!
            {/* This project is part of my portfolio, showcasing my
            skills in Tailwind CSS, TypeScript, and integrating cryptocurrency
            and NFT APIs. Enjoy exploring! */}
          </p>
          <button
            onClick={gmRedirect}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-[#485986] border-gray-300 rounded-lg hover:bg-[#232c42]"
          >
            See more NFTs
          </button>
        </div>
        <div className="mt-8 lg:mt-0 lg:col-span-5 lg:flex">
          <video className="rounded-lg" autoPlay loop muted>
            <source src={gmdeekay} type="video/mp4"></source>
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroGM;
