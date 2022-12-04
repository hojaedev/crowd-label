import React, { useState, useEffect } from "react";
import { BaseLayout } from "../components/Layout";
import IPFSImage from "../components/IPFSImage";
import { ComponentLayout } from "../components/Layout";
import { useContract } from "../contexts/ContractContext";

const BrowsePage = () => {
  const [images, setImages] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const { storage } = useContract();

  useEffect(() => {
    const getImages = async () => {
      const images = await storage.getAllImage(false);
      setImages(images);
    };
    getImages();
  }, [storage]);

  return (
    <BaseLayout>
      <ComponentLayout>
        <h1 className="text-xl font-extrabold pt-10 pb-10">
          Browse and Download Images
        </h1>
        <div className="container grid grid-cols-4 gap-2 mx-auto">
          {images &&
            images.map((image, index) => (
              <div
                className="w-full rounded border-3 border-red-700"
                key={index}
              >
                <span className="absolute inset mx-1 my-1 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {parseInt(image.label_count._hex)} Labels
                </span>
                <IPFSImage
                  hash={image[3]}
                  selected={true}
                  className="border-4 border-green-400 brightness-50"
                  onClick={() => {
                    if (selectedImages.has(image)) {
                      selectedImages.delete(image);
                      setSelectedImages(selectedImages);
                      console.log(selectedImages);
                    } else {
                      selectedImages.add(image);
                      setSelectedImages(selectedImages);
                      console.log("selectedImages", selectedImages);
                    }
                  }}
                />
              </div>
            ))}
        </div>
      </ComponentLayout>
    </BaseLayout>
  );
};

export default BrowsePage;
