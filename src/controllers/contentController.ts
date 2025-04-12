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
  const { pictures, prompt } = req.body;
  console.log(pictures);
  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt must be a string" });
  }
  let images: Buffer[] = [];
  if (Array.isArray(pictures) && pictures.length >= 1) {
    images = await Promise.all(pictures.map(async (picture) => {
      const response = await fetch(picture);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }));
  }
  // TODO: Implement the api of AI Agent
  // const image: Buffer = Buffer.from([]);
  const imageUri = await uploadImageToIpfs(images[0], "Image name");

  return res.json({ msg:"Image generated successfully", data: { image: images[0], ipfsUri: `ipfs://${imageUri}`, metadata: { name: "Image name", description: "Image description" } } });
};