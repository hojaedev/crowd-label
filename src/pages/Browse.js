import React, { useState, useEffect } from "react";
import BaseLayout from "../components/Layout";
import IPFSImage from "../components/IPFSImage";
import { abi, contractAddress } from "../contracts/storage";
import { ethers } from "ethers";
import { useAuth } from "../contexts/AuthContext";

const BrowsePage = () => {
  const [contract, setContract] = useState(null);
  const [images, setImages] = useState(null);
  const { signer } = useAuth();
  useEffect(() => {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    setContract(contract);
    (async () => {
      const data = await contract.getAllImage();
      setImages(data);
      console.log(data[0].label_count._hex);
    })();
  }, []);

  return (
    <BaseLayout>
      <h1 className="text-xl px-2 md:px-4 py-2.5">Select Images</h1>
      <div className="container grid grid-cols-4 gap-2 mx-auto">
        {images &&
          images.map((image, index) => (
            <div className="w-full rounded border-3 border-red-700">
              <span class="absolute inset mx-1 my-1 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {parseInt(image.label_count._hex)} Labels
              </span>
              <IPFSImage hash={image[3]} selected={true} className="border-4 border-green-400 brightness-50"/>
            </div>
          ))}
      </div>
    </BaseLayout>
  );
};

export default BrowsePage;
