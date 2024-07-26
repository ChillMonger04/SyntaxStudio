import { useEffect, useState } from "react";

// Define a prefix for keys in localStorage to avoid collisions
const PREFIX = "syntax-studio-";

// Custom hook for managing localStorage with React state
const useLocalStorage = (key, initialValue) => {
  // Create a prefixed key to use in localStorage
  const prefixedKey = PREFIX + key;

  // Initialize state with value from localStorage or use initialValue
  const [value, setValue] = useState(() => {
    // Retrieve the item from localStorage
    const jsonValue = localStorage.getItem(prefixedKey);

    // If the item exists in localStorage, parse and return it
    if (jsonValue != null) return JSON.parse(jsonValue);

    // If the item does not exist, initialize with the provided initialValue
    if (typeof initialValue === "function") {
      // If initialValue is a function, call it to get the initial value
      return initialValue();
    } else {
      // Otherwise, return the initialValue directly
      return initialValue;
    }
  });

  // Effect to update localStorage whenever the value changes
  useEffect(() => {
    // Convert the value to a JSON string and store it in localStorage
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]); // Depend on prefixedKey and value

  // Return the state value and setter function
  return [value, setValue];
};

export default useLocalStorage;
