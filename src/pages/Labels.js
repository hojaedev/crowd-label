import React, { useState, useEffect } from "react";
import { BaseLayout } from "../components/Layout";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { abi, labelAddress } from "../contracts/label";
import { ethers } from "ethers";
import { useAuth } from "../contexts/AuthContext";

const LabelPage = () => {
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [image, setImage] = useState(
    "QmQai6Ymy4CrfhKEnNb6km4KAxN8jyipQ5CfMDoiieDwmR",
  );
  const [labelContract, setLabelContract] = useState();
  const { address, provider, signer } = useAuth();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer1 = provider.getSigner();
    console.log(signer1, signer);
    setLabelContract(new ethers.Contract(labelAddress, abi, signer));
  }, []);

  const handleClick = async () => {
    const coord = {
      x1: cropData[0],
      y1: cropData[1],
      x2: cropData[2],
      y2: cropData[3],
    };
    console.log("hello", image, coord);
    await labelContract.addLabel(image, coord);
    console.log("bye");

    console.log(await labelContract.getLabel(image));
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const x = cropper.getCroppedCanvas().toDataURL();
      setCropData(x);
      console.log(x);
    }
    const x = cropper.getCroppedCanvas().toDataURL();
    setCropData(x);
    console.log(x);
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
  return (
    <BaseLayout>
      <div className="flex h-screen w-screen">
        <Cropper
          style={{ width: "100%", height: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview="#img-preview"
          src={`http://localhost:8080/ipfs/${image}`}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={instance => {
            setCropper(instance);
          }}
          onChange={e => console.log(e)}
          guides={true}
          crop={handleCrop}
        />
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
        </div>
      </div>
    </BaseLayout>
  );
};

export default LabelPage;
