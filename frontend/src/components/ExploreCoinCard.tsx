import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { Coin } from "../types";

interface ExploreCoinCardProps {
  coin: Coin;
}

const ExploreCoinCard: React.FC<ExploreCoinCardProps> = ({ coin }) => {
  const router = useRouter();

  const numCoverter = (num: number | null | undefined): string => {
    if (num === null || num === undefined) {
      return "-";
    }

    let newNum;

    if (num >= 1_000_000_000_000) {
      newNum = (num / 1_000_000_000_000).toFixed(1) + "T";
    } else if (num >= 1_000_000_000) {
      newNum = (num / 1_000_000_000).toFixed(1) + "B";
    } else if (num >= 1_000_000) {
      newNum = (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 100_000) {
      newNum = (num / 100_000).toFixed(1) + "K";
    } else {
      newNum = num.toFixed(1);
    }

    return newNum;
  };

  const handleDetailsDirect = () => {
    router.push(`/coin/${coin.id}`);
  };

  return (
    <tr
      className="hover:bg-gray-100 cursor-pointer"
      onClick={handleDetailsDirect}
    >
      <td className="px-6 py-4 whitespace-nowrap flex items-center">
        <img className="w-8 h-8 mr-4" src={coin.image} alt={coin.name}></img>
        <div>
          <span className="font-bold">{coin.name}</span>
          <span className="text-gray-500">{` (${coin.symbol.toUpperCase()})`}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{`$${coin.current_price.toFixed(
        2
      )}`}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {coin.price_change_percentage_24h < 0 ? (
          <span className="text-red-600 flex items-center">
            <BsArrowDownRight className="mr-1" />
            {`${coin.price_change_percentage_24h.toFixed(2)}%`}
          </span>
        ) : (
          <span className="text-green-600 flex items-center">
            <BsArrowUpRight className="mr-1" />
            {`${coin.price_change_percentage_24h.toFixed(2)}%`}
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{`${numCoverter(
        coin.market_cap
      )}`}</td>
      <td className="px-6 py-4 whitespace-nowrap">{`${numCoverter(
        coin.total_volume
      )}`}</td>
      <td className="px-6 py-4 whitespace-nowrap">{`${numCoverter(
        coin.total_supply
      )}`}</td>
    </tr>
  );
};

export default ExploreCoinCard;
