import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch requested resource");
        }
        return response.json();
      })
      .then((data) => {
        setdata(data);
        setPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted!");
        } else {
          setError(err.message);
          setPending(false);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
