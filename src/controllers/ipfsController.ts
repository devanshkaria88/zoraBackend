import { NFTStorage, File } from 'nft.storage'
import dotenv from 'dotenv';
dotenv.config();

const NFT_STORAGE_KEY = "d8fa86b9.62996f650b194ed697ba48bd100e41c7";

if (!NFT_STORAGE_KEY) {
    throw new Error('IPFS_GATEWAY_KEY is not defined in the environment variables');
}

export async function storeNFT(imageData: string, name: string, description: string) {
    const image = new File([imageData], name, { type: 'image/png' })
    const nftstorage = new NFTStorage({ token: 'd8fa86b9.62996f650b194ed697ba48bd100e41c7' })

    return nftstorage.store({
        image,
        name,
        description,
    })
}