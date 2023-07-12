import { useState } from "react";

export default function useLocalStorageMiniCart(key: string, initialValue: Array<any>) {
  const isBrowser = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (isBrowser) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: Array<any>) => {
    try {
      setStoredValue(value);
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
