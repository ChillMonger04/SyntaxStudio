import { useState, useEffect } from "react";
// Importing required CSS files for CodeMirror
import "codemirror/lib/codemirror.css"; // Main CSS for CodeMirror
import "codemirror/theme/material.css"; // Material theme CSS for CodeMirror
import "codemirror/theme/dracula.css"; // Dracula theme CSS for CodeMirror

// Importing required modes (syntax highlighting) for CodeMirror
import "codemirror/mode/xml/xml"; // XML mode
import "codemirror/mode/css/css"; // CSS mode
import "codemirror/mode/javascript/javascript"; // JavaScript mode

// Importing addons for auto-closing tags and brackets
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

// Importing additional addons for features like linting and folding
import "codemirror/addon/search/search"; // Search functionality
import "codemirror/addon/search/searchcursor"; // Search cursor functionality
import "codemirror/addon/fold/foldgutter"; // Code folding functionality
import "codemirror/addon/lint/lint.css"; // Lint markers CSS
import "codemirror/addon/lint/lint"; // Linting functionality
import "codemirror/addon/display/fullscreen"; // Fullscreen mode functionality

// Importing ControlledEditor component from react-codemirror2
import { Controlled as ControlledEditor } from "react-codemirror2";

// Importing FontAwesome icons for expand/collapse functionality
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faExpandAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const Editor = ({ displayName, language, value, onChange }) => {
  // Function to handle changes in the editor
  function handleChange(editor, data, value) {
    // Calling the onChange function passed as a prop with the new value
    onChange(value);
  }

  // State variable to handle the editor's open/closed state
  const [open, setOpen] = useState(true);

  // State variable to handle the selected theme
  const [theme, setTheme] = useState("material");

  // State variable to handle the font size
  const [fontSize, setFontSize] = useState("14px");

  // Handler to change the editor theme
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Handler to change the font size
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  // Applying the font size to the CodeMirror editor through CSS
  useEffect(() => {
    const editorElements = document.getElementsByClassName("CodeMirror");
    // Looping each element and updating the font size
    for (let element of editorElements) {
      element.style.fontSize = fontSize;
    }
  }, [fontSize]);

  // Handler to copy the editor content to the clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    // Container for the editor
    <div
      className={`editor-container ${open ? "" : "collapsed"}`}
      style={{ transition: "all 0.5s ease" }}
    >
      {/* Title bar of the editor with display name and a toggle button */}
      <div className="editor-title">
        {displayName}

        {/* Conditional rendering for theme and font size selectors */}
        {open && (
          <>
            {/* Dropdown to select theme */}
            <select
              onChange={handleThemeChange}
              value={theme}
              className="editor-theme-selector"
            >
              <option value="material">Material</option>
              <option value="dracula">Dracula</option>
            </select>

            {/* Dropdown to select font size */}
            <select
              onChange={handleFontSizeChange}
              value={fontSize}
              className="editor-fontsize-selector"
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>

            {/* Button to copy editor content to clipboard */}
            <button
              className="copy-btn"
              type="button"
              onClick={handleCopyToClipboard}
              title="Copy to Clipboard"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </>
        )}

        {/* Collapsing option for the editor */}
        <button
          className="expand-collapse-btn"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>

      {/* ControlledEditor component, this is the textarea for coding */}
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          fontSize: fontSize,
          theme: theme, // Dynamic theme selection
          lineNumbers: true,
          matchBrackets: true, // Highlight matching brackets
          foldGutter: true, // Enable code folding
          gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"], // Add gutters for linting and folding
          extraKeys: {
            "Ctrl-Space": "autocomplete", // Enable autocomplete on Ctrl-Space
            F11: "toggleFullscreen", // Toggle fullscreen mode with F11
            Esc: "exitFullscreen", // Exit fullscreen mode with Esc
          },
        }}
      />
    </div>
  );
};

export default Editor;
