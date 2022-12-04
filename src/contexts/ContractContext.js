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
  const { signer } = useAuth();
  useEffect(() => {
    setStorage(
      new ethers.Contract(
        config.contractAddress.storage,
        storageContract.abi,
        signer,
      ),
    );
  }, [signer]);

  const memoedValue = useMemo(
    () => ({
      storage,
    }),
    [storage],
  );
  return (
    <ContractContext.Provider value={memoedValue}>
      {children}
    </ContractContext.Provider>
  );
};
export { ContractProvider, useContract };
