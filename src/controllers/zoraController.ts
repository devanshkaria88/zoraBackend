import { Hex, createWalletClient, createPublicClient, http, Address } from "viem";
import { base } from "viem/chains";

// Set up viem clients
const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});
 
const walletClient = createWalletClient({
  account: "0x53dae6e4b5009c1d5b64bee9cb42118914db7e66" as Hex,
  chain: base,
  transport: http("https://mainnet.base.org"),
});


export { publicClient, walletClient };