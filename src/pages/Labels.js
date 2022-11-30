import React, { useState } from "react";
import BaseLayout from "../components/Layout";
import { Annotator } from "image-labeler-react";

const LabelPage = () => {
  return (
    <BaseLayout>
      {/* <div className="flex items-center justify-center w-full"> */}
      <div className="flex mx-8 space-x-10">
        <div className="w-2/3 w-auto">
          <Annotator
            height={1200}
            width={800}
            imageUrl={
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*"
            }
            asyncUpload={async labeledData => {
              // upload labeled data
              console.log(labeledData.boxes);
            }}
            types={[]}
            defaultType={"Labeled"}
          />
        </div>
        <div className="w-1/3">
          <div className="flex flex-col items-center justify-center h-screen ">
            <div className="text-6xl">Instruction</div>
            <ol className="text-2xl">
              <li>
                1. Switch around "To Annotate" and "To Move" to annonate or move
                an image.
              </li>
              <li>2. Click and drag a bounding box.</li>
              <li>3. Upload the bounding box after you finish drawing it.</li>
            </ol>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LabelPage;
