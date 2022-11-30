import React from "react";

const Composer = ({ components = [], children }) => {
  return (
    <>
      {components.reduceRight((acc, [Comp, compProps]) => {
        return <Comp {...compProps}>{acc}</Comp>;
      }, children)}
    </>
  );
};
export default Composer;
