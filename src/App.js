import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

import xfdfStrings, { combinedXfdfString } from "./data";

import "./App.css";

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "/files/plan.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager } = instance.Core;

      documentViewer.addEventListener("documentLoaded", () => {
        // option 1
        xfdfStrings.map((xfdfString) =>
          annotationManager.importAnnotations(xfdfString)
        );

        // option 2
        // annotationManager.importAnnotations(combinedXfdfString);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
