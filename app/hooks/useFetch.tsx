import fetchData from '@/utils/fetch';
import { useState, useEffect, useCallback } from 'react';

function useFetch<T>(id,model) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try{
      setLoading(true);
      setError(null);
      const response = await fetchData(id,model)
      console.log(response)
      setData(response.json());
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
