process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function fetchData<T>( id: string,model: string): Promise<T | undefined> {

    const res = await fetch(`https://localhost:7166/api/${model}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${model} with ID ${id}: ${res.statusText}`);
    }
    return await res.json();
}
