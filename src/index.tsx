import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loader, TranslationsLoader } from "./Translations";

ReactDOM.render(
  //TranslationsLoader makes translations available for use within App and all its children via Context.

  <React.StrictMode>
    <TranslationsLoader
      // To switch languages, change the value being passed into the loader below.
      loader={loader("en")}
      loading={<p>Loading, please wait...</p>}
    >
      <App />
    </TranslationsLoader>
  </React.StrictMode>,
  document.getElementById("root")
);
