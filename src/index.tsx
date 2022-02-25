import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loader, TranslationsLoader } from "./Translations";

ReactDOM.render(
  <React.StrictMode>
    <TranslationsLoader
      loader={loader("ja")}
      loading={<p>Loading, please wait...</p>}
    >
      <App />
    </TranslationsLoader>
  </React.StrictMode>,
  document.getElementById("root")
);
