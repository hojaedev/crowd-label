import config from "../../src/config";

const IPFSImage = ({ hash }) => {
  return (
    <img src={`${config.ipfs.defaultGateway}/${hash}`} alt="ipfs preview" />
  );
};

export default IPFSImage;
