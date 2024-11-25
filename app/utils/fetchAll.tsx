process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchAll<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`https://localhost:7166/api/${endpoint}`, { 
      cache: "no-store",
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to fetch ${endpoint} data: ${res.status} ${errorBody}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
}

export default fetchAll;