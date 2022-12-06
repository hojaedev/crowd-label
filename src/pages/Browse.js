import React, { useReducer, useState, useEffect } from "react";
import { BaseLayout } from "../components/Layout";
import IPFSImage from "../components/IPFSImage";
import { ComponentLayout } from "../components/Layout";
import { useContract } from "../contexts/ContractContext";

const BrowsePage = () => {
  const [images, setImages] = useState(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const { storage } = useContract();

  useEffect(() => {
    const getImages = async () => {
      const images = await storage.getAllImage(false);
      setImages(images);
    };
    getImages();
  }, [storage]);

  const saveDataset = data => {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("download", "json-file.json");
    link.setAttribute("href", url);
    document.body.appendChild(link);
    link.click();
  };

  const handleDownload = async () => {
    const ids = Array.from(selectedImages);
    const buyDataset = await storage.buyDataset(ids);
    await buyDataset.wait();
    const downloadDataset = await storage.downloadDataset(ids);
    console.log(downloadDataset);
    saveDataset(downloadDataset);
  };

  const isLabeled = image => {
    return parseInt(image[0]) >= 5;
  };

  return (
    <BaseLayout>
      <ComponentLayout>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-extrabold pt-10 pb-10">
            Browse and Download Images
          </h1>
          <button
            type="button"
            className="flex-end disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={selectedImages.size === 0}
            onClick={handleDownload}
          >
            Buy Dataset
          </button>
        </div>
        <div className="container grid grid-cols-4 gap-2 mx-auto relative">
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                {...(selectedImages.has(image[3]) && {
                  className:
                    "brightness-50 border-4 border-green-400 brightness-25",
                })}
                onClick={() => {
                  if (!isLabeled(image)) return;
                  const hash = image[3];
                  if (selectedImages.has(hash)) {
                    selectedImages.delete(hash);
                  } else {
                    setSelectedImages(selectedImages.add(hash));
                  }
                  forceUpdate();
                }}
              >
                {isLabeled(image) ? (
                  <span className="absolute mx-3 my-3 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    Ready for download
                  </span>
                ) : (
                  <span className="absolute mx-3 my-3 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                    Not ready for download
                  </span>
                )}
                {/* border-4 border-green-400 brightness-25 */}
                <IPFSImage hash={image[3]} selected={true} />
              </div>
            ))}
        </div>
      </ComponentLayout>
    </BaseLayout>
  );
};

export default BrowsePage;
