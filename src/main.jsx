import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { RecoilRoot } from "recoil";

import "./index.css";
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
