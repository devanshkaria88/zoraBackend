import { createPublicClient, http, verifyMessage } from 'viem';
import { mainnet, base } from 'viem/chains';
import crypto from 'crypto';

// Create a viem public client for Base (Zora's chain)
export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// Verify a wallet signature
export const verifyWalletSignature = async (
  address: string,
  message: string,
  signature: string
): Promise<boolean> => {
  try {
    // Verify the signature matches the address and message
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,