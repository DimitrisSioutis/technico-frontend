import { useState, useEffect, useCallback } from 'react';
import fetchData from '@/utils/fetch';

function useFetch<T>(id: string, model: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData(id, model);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [id, model]);

  useEffect(() => {
    fetch();
  }, [fetch]); 

  return {
    data,
    loading,
    error,
    refetch: fetch, 
  };
}

export default useFetch;
