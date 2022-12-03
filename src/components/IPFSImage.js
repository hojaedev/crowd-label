import config from "../../src/config";

const IPFSImage = ({ hash, className }) => {
  return (
    <img
      src={`${config.ipfs.defaultGateway}/${hash}`}
      alt="ipfs preview"
      className={className}
    />
  );
};

export default IPFSImage;
