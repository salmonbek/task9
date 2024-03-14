import { useEffect } from "react";
import { useState } from "react";
import request from "../server";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCountry() {
      try {
        setLoading(true);
        let { data } = await request.get(url);
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCountry();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
