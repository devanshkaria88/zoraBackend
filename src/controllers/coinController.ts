import { createCoin } from "@zoralabs/coins-sdk";
import { walletClient } from "./zoraController";
import { publicClient } from "./zoraController";
import { Address } from "viem";
import { storeNFT } from "./ipfsController";
import { Request, Response } from "express";

const uploadIPFSFile = async (file: Express.Multer.File, name: string, description: string) => {
  return storeNFT(file.buffer.toString(), name, description);
};


const coinCreate = async (req: Request, res: Response) => {
  const { walletAddress, name, symbol, description } = req.body;
  // const file = req.file as Express.Multer.File | undefined;

  // if (!file) {
  //   res.status(400);
  //   throw new Error('File is required');
  // }
  // const uri = await uploadIPFSFile(file, name, description);
  // console.log(uri);
  if (!walletAddress || typeof walletAddress !== 'string') {
    res.status(400);
    throw new Error('Wallet address is required');
  }
  if (!name || typeof name !== 'string') {
    res.status(400);
    throw new Error('Name is required');
  }
  if (!symbol || typeof symbol !== 'string') {
    res.status(400);
    throw new Error('Symbol is required');
  }
  // if (!uri || typeof uri !== 'string') {
  //   res.status(400);
  //   throw new Error('URI is required');
  // }
  if (!walletClient || !publicClient) {
    throw new Error("Wallet client or public client not initialized");
  }
  try {
    console.log("Creating coin...");
    console.log(walletAddress);
    console.log(walletClient.account);
    const coinParams = {
      name: "My Awesome Coin",
      symbol: "MAC",
      uri: "ipfs://bafybeielprxjpmxm34thr3fvbhdr6wmzqgvjss2cccbm54x3ftaswnxln4",
      payoutRecipient: walletAddress as Address,
      currency: "0x4200000000000000000000000000000000000006",
      initialPurchaseWei: 0n, // Optional: Initial amount to purchase in Wei
    };

    const result = await createCoin(coinParams, walletClient, publicClient);
    res.status(200).json({
      message: 'Coin created successfully',
      hash: result.hash,
      receipt: result.receipt,
      address: result.address,
      deployment: result.deployment 
    });
  } catch (error) {
    console.error("Error creating coin:", error);
    throw error;
  }
};

export { coinCreate };