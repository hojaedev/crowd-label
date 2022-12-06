import React, { useState, useEffect } from "react";
import { BaseLayout } from "../components/Layout";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useContract } from "../contexts/ContractContext";
import config from "../config";
import { parseUnits } from "ethers/lib/utils";
import { toast } from "react-toastify";

const LabelPage = () => {
  const [cropData, setCropData] = useState(null);
  const [labeled, setLabeled] = useState(false);
  const [index, setIndex] = useState(0);
  const [unlabeledImages, setUnlabeledImages] = useState([]);
  const image = "QmQTux7QbD8BYftFhDJdoJkmpfGEeHdSxx2g7jeVfEsryo";

  const { storage, label } = useContract();

  useEffect(() => {
    const fetchUnlabeledImages = async () => {
      let unlabeledHashes = await label.getUnlabeledHashesByUser();
      unlabeledHashes = unlabeledHashes.filter(hash => {
        return hash.length != 0;
      });

      let unlabeledImages = await storage.getUnlabeledImagesByUser(
        unlabeledHashes,
      );
      unlabeledImages = unlabeledImages.filter(unlabeledImage => {
        return unlabeledImage.registered && unlabeledImage.hash != undefined;
      });

      setUnlabeledImages(unlabeledImages);
    };

    fetchUnlabeledImages();
  }, [labeled]);

  const handleClick = async () => {
    const addLabel = await label.addLabel(
      unlabeledImages[index].hash,
      cropData[0],
      cropData[1],
      cropData[2],
      cropData[3],
    );
    await addLabel.wait();
    setLabeled(true);
    toast.success("Label added, proceeding to the next image.");
  };

  const handleNextImage = async () => {
    setLabeled(false);
    setIndex(index + 1);
    if (index === unlabeledImages.length) {
      setIndex(0);
    }
  };

  const handleCrop = e => {
    const x = e.detail.x;
    const y = e.detail.y;
    const width = e.detail.width;
    const height = e.detail.height;
    setCropData([
      Math.round(x),
      Math.round(y),
      Math.round(x + width),
      Math.round(y + height),
    ]);
  };
  // unlabeledImages[index]?.hash ? (<Cropper>) doesn't work
  return (
    <BaseLayout>
      <div className="flex h-screen w-screen">
        {unlabeledImages.length > 0 ? (
          <Cropper
            style={{ width: "100%", height: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview="#img-preview"
            src={`http://localhost:8080/ipfs/${
              unlabeledImages[index]?.hash ?? ""
            }`}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onChange={e => console.log(e)}
            guides={true}
            crop={handleCrop}
          />
        ) : (
          <div className="flex justify-between">No more images to label</div>
        )}
        <div className="w-1/3 bg-gray-400">
          <div className="flex flex-col justify-between w-full">
            <div id="img-preview" className="w-full h-64 overflow-hidden" />
            {cropData && (
              <div>
                x1: {cropData[0]} <br />
                y1: {cropData[1]} <br />
                x2: {cropData[2]} <br />
                y2: {cropData[3]} <br />
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-full m-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Submit Label
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-full m-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleNextImage}
          >
            Next Image
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LabelPage;
