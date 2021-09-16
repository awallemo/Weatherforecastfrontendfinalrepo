import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const runFetch = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    runFetch();
  }, []);
  return { data, error, isLoading };
};

//API KEY 6d5222b478cf06061dfdf6319573bcbf
