import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { ethers } from "ethers";

const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    handleLogin();
  });

  const handleLogin = useCallback(async () => {
    if (isLoggedIn) return;
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer…
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    setSigner(signer);
    setIsLoggedIn(true);
    setProvider(provider);
  }, [isLoggedIn]);

  const getShortAddress = useCallback(() => {
    if (!address) return;
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length,
    )}`;
  }, [address]);

  const memoedValue = useMemo(
    () => ({
      address,
      isLoggedIn,
      provider,
      signer,
      getShortAddress,
      handleLogin,
    }),
    [address, isLoggedIn, provider, signer, getShortAddress, handleLogin],
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
