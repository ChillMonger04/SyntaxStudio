import { useState, useEffect } from "react";
import Editor from "./Editor"; // Importing the Editor component
import useLocalStorage from "../hooks/useLocalStorage"; // Importing a custom hook to use local storage

const App = () => {
  // Using the custom hook to store and retrieve HTML, CSS, and JavaScript code from local storage
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  
  // State variable to store the source code for the iframe
  const [srcDoc, setSrcDoc] = useState("");

  // useEffect hook to update the iframe content when HTML, CSS, or JS changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Set the srcDoc with the current HTML, CSS, and JS code
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250); // Delay of 250 milliseconds to avoid excessive updates

    return () => clearTimeout(timeout); // Clean up the timeout to avoid memory leaks
  }, [html, css, js]); // Dependency array, runs the effect whenever html, css, or js changes

  return (
    <>
      {/* 
      Header section for the app, currently commented out
      <header className="app-header">
        <h1>SyntaxStudio</h1>
        <p>Your Code Playground</p>
      </header>
      */}
      
      {/* Top pane with three code editors for HTML, CSS, and JavaScript */}
      <div className="pane top-pane">
        <Editor
          language="xml" // Language mode for the editor
          displayName="HTML" // Label for the editor
          value={html} // Value of the editor content
          onChange={setHtml} // Function to update the HTML state
        />
        <Editor
          language="css" // Language mode for the editor
          displayName="CSS" // Label for the editor
          value={css} // Value of the editor content
          onChange={setCss} // Function to update the CSS state
        />
        <Editor
          language="javascript" // Language mode for the editor
          displayName="JS" // Label for the editor
          value={js} // Value of the editor content
          onChange={setJs} // Function to update the JavaScript state
        />
      </div>
      
      {/* Bottom pane with an iframe to display the rendered code */}
      <div className="pane">
        <iframe
          srcDoc={srcDoc} // Source document for the iframe, containing the HTML, CSS, and JavaScript code
          title="output" // Title attribute for the iframe
          sandbox="allow-scripts" // Sandbox attribute to restrict certain actions within the iframe
          width="100%" // Width of the iframe
          height="100%" // Height of the iframe
          className="iframe-output" // CSS class for styling the iframe
        />
      </div>
    </>
  );
};

export default App; // Exporting the App component as the default export
