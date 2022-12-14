import React, { useState } from "react";
import { BaseLayout } from "../components/Layout";
import config from "../config";
import { create } from "ipfs-http-client";
import IPFSImage from "../components/IPFSImage";
import { toast } from "react-toastify";
import { ComponentLayout } from "../components/Layout";
import { useContract } from "../contexts/ContractContext";

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const { storage } = useContract();

  const changeHandler = event => {
    setSelectedFiles(event.target.files);
  };

  const signStorageContract = async hash => {
    try {
      const hashSet = await storage.store(hash);
      hashSet.wait();
      toast.success("Image registered. Eligible for rewards.");
    } catch (e) {
      toast.error("Failed image registration");
      console.log(e);
    }
  };

  const onSubmit = async () => {
    try {
      // connect to a different API
      const client = create({ url: config.ipfs.apiRoute });
      const paths = [];
      for await (const { path } of client.addAll(selectedFiles)) {
        paths.push(path);
      }
      console.log(paths);
      setImageHash(paths);
      toast.success("Uploaded to IPFS");
      signStorageContract(paths);
    } catch (error) {
      toast.error("Failed IPFS upload");
      console.error("IPFS error ", error);
    }
  };

  return (
    <BaseLayout>
      <ComponentLayout>
        <h1 className="text-xl font-extrabold pt-10 pb-10">Upload Images</h1>
        <div className="flex-row space-y-5">
          <div className="flex items-center justify-center w-full mt-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={changeHandler}
                multiple
              />
            </label>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-500 disabled:hover:bg-slate-500"
            disabled={selectedFiles ? false : true}
            onClick={onSubmit}
          >
            Upload Image
          </button>
          {imageHash &&
            imageHash.map(p => {
              <div>
                <IPFSImage hash={p} />
              </div>;
            })}
        </div>
      </ComponentLayout>
    </BaseLayout>
  );
};

export default UploadPage;
