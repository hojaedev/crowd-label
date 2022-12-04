import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { MainPage, UploadPage, BrowsePage, LabelPage, RewardPage } from "../src/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/browse",
    element: <BrowsePage />,
  },
  {
    path: "/label",
    element: <LabelPage />,
  },
{
  path: "/reward",
  element: <RewardPage />,

}
]);

export default router;
