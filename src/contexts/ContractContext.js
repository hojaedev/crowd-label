import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import config from "../config";
import { ethers } from "ethers";
import storageContract from "../artifacts/contracts/1_Storage.sol/Storage.json";
import tokenContract from "../artifacts/contracts/2_Token.sol/CrowdLabelToken.json";
import vendorContract from "../artifacts/contracts/3_Vendor.sol/Vendor.json";
import labelContract from "../artifacts/contracts/4_Label.sol/Label.json";
import { useAuth } from "./AuthContext";

const ContractContext = createContext();
const useContract = () => {
  const context = useContext(ContractContext);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }
  return context;
};

const ContractProvider = ({ children }) => {
  const [storage, setStorage] = useState(null);
  const [token, setToken] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [label, setLabel] = useState(null);
  const { signer } = useAuth();
  useEffect(() => {
    setStorage(
      new ethers.Contract(
        config.contractAddress.storage,
        storageContract.abi,
        signer,
      ),
    );
    setToken(
      new ethers.Contract(
        config.contractAddress.token,
        tokenContract.abi,
        signer,
      ),
    );
    setVendor(
      new ethers.Contract(
        config.contractAddress.vendor,
        vendorContract.abi,
        signer,
      ),
    );
    setLabel(
      new ethers.Contract(
        config.contractAddress.label,
        labelContract.abi,
        signer,
      ),
    );
    console.log({ storage, token, vendor, label });
  }, [signer]);

  const memoedValue = useMemo(
    () => ({
      storage,
      token,
      vendor,
      label,
    }),
    [storage, token, vendor, label],
  );
  return (
    <ContractContext.Provider value={memoedValue}>
      {children}
    </ContractContext.Provider>
  );
};
export { ContractProvider, useContract };
