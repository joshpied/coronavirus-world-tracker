import { useState, useEffect } from 'react';

export default function useStats(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error
  };
}
