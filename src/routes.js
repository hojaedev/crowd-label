import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { MainPage, UploadPage, BrowsePage, LabelPage } from "../src/pages";

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
]);

export default router;
