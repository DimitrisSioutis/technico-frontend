async function fetchData<T>(
    id: string,
    model: string, 
    setData: (data: T) => void
  ): Promise<void> {
    try {
      const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching data:", error);
        throw new Error(error.message || "Failed to fetch data");
      }
  
      const data: T = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  export default fetchData;