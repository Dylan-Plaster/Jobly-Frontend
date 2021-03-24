import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultVal, setLoading) => {
  //   const [state, setState] = useState(() => {
  //     try {
  //       const val = window.localStorage.getItem(key);
  //       return val ? JSON.parse(val) : defaultVal;
  //     } catch (e) {
  //       console.log(e);
  //       return defaultVal;
  //     }
  //   });
  //   useEffect(() => {
  //     console.log(state);
  //     window.localStorage.setItem(key, state);
  //   }, [key, state]);
  //   return [state, setState];

  const [state, setState] = useState(null);
  useEffect(() => {
    try {
      const val = window.localStorage.getItem(key);

      if (val) {
        setState((st) => val);
        setLoading(false);
      } else {
        setState(defaultVal);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setState(defaultVal);
    }
  }, [defaultVal, key]);

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(key, state);
    }
  }, [key, state]);

  const updateState = (data) => {
    setState(() => {
      return data;
    });
  };

  return [state, updateState];
};

export default useLocalStorage;
