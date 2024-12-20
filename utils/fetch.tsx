export default async function fetchData<T>(id: string, model: string): Promise<T | undefined> {
  try {
      const res = await fetch(`https://localhost:7166/api/${model}/${id}`, { cache: "no-store" });
      if (!res.ok) {
          console.error(`Error fetching ${model}: ${res.statusText}`);
          return undefined;
      }
      return await res.json();
  } catch (error) {
      console.error(`Error in fetchData: ${error.message}`);
      return undefined;
  }
}
