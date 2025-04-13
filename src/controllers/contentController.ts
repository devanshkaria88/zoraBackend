import { Request, Response } from "express";
import { Buffer, Blob } from 'buffer';
const { PinataSDK } = require("pinata")
const fs = require("fs")
require("dotenv").config()

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})


const uploadImageToIpfs = async (image: Buffer, name: string) => {
  const imageBlob = new Blob([image]);
  console.log(imageBlob);
  const upload = await pinata.upload.public.file(imageBlob);
  console.log(upload);
  return upload.cid;
};


export const generateImage = async (req: Request, res: Response) => {
  const { image, prompt } = req.body;
  console.log(image);
  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt must be a string" });
  }

  // TODO: Implement the api of AI Agent
  // const image: Buffer = Buffer.from([]);
  const imageUri = await uploadImageToIpfs(image, "Image name");
  const metadata = {
    name: "Image name",
    description: "Image description",
    image: "ipfs://" + imageUri,
    properties: {
      "category": "social"    
    }
  }
  var ipfsid = await uploadMetadataToIpfs(metadata);
  

  return res.json({ msg:"Image generated successfully", data: { image: image, ipfsUri: `ipfs://${ipfsid}`, metadata: {name: "Image name", description: "Image description"} } });
};

async function uploadMetadataToIpfs(metadata: { name: string; description: string; image: any; properties: { category: string; }; }) {
  try {
    console.log("Uploading metadata:", metadata);
    const upload = await pinata.upload.public.json(metadata);
    console.log("Metadata upload result:", upload);
    return upload.cid;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
}
