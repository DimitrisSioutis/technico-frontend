import { useState, useEffect, useCallback } from 'react';

function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try{
      setLoading(true);
      setError(null);
      const localUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      console.log(localUser)
      console.log(token)
      const user = JSON.parse(localUser);
      setData(user);

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
