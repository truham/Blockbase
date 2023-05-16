import { useState, useEffect } from "react";
import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";

const web3Modal = new Web3Modal({
  projectId: process.env.REACT_APP_PROJECT_ID,
  standaloneChains: ["eip155:5"],
});

const WalletConnect = () => {
  const [signClient, setSignClient] = useState();

  async function createClient() {
    try {
      const client = await SignClient.init({
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      setSignClient(client);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  const handleConnect = async () => {
    if (!signClient) throw Error("Cannot connect. Sign Client is not created");
    try {
      // dapp going to send a proposal namespace
      const proposalNameSpace = {
        eip155: {
          chains: ["eip155:5"],
          methods: ["eth_sendTransaction"],
          events: ["connect", "disconnect"],
        },
      };

      const { uri } = await signClient.connect({
        requiredNamespaces: proposalNameSpace,
      });

      if (uri) {
        web3Modal.openModal({ uri });
      }
    } catch (e) {}
  };

  return (
    <>
      <button
        className="md:my-0 md:ml-8 bg-[#344afb] text-white px-4 py-2 rounded-lg hover:bg-[#2c3fd6]"
        onClick={handleConnect}
        disabled={!signClient}
      >
        Connect
      </button>
    </>
  );
};

export default WalletConnect;
