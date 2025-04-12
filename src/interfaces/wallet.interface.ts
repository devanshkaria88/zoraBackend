export interface WalletAuthRequest {
  address: string;
  message: string;
  signature: string;
}

export interface UserWallet {
  address: string;
  nonce: string;
  lastAuthenticated?: Date;
}
