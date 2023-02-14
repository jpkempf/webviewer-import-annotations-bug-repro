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

      documentViewer.addEventListener("documentLoaded", async () => {
        // option 1; loop over the list of xfdf strings

        // xfdfStrings.forEach(
        //   async (xfdfString) =>
        //     await annotationManager.importAnnotations(xfdfString)
        // );

        // option 2; draw one giant combined xfdf string

        // await annotationManager.importAnnotations(combinedXfdfString);

        /*
         * option 3; draw a single annotation. any single one will look fine,
         * but drawing more than one leads to the same issue as before.
         */

        // annotationManager.importAnnotations(xfdfStrings[0]);
        // annotationManager.importAnnotations(xfdfStrings[1]);
        annotationManager.importAnnotations(xfdfStrings[2]);
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
