import { useEffect, useState } from "react";
import { getSanityQuery } from "../lib/getSanityQuery";

export function useSanityQuery(query: string, params = {}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    getSanityQuery(query, params)
      .then((res) => {
        if (!alive) return;
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
