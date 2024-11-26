export default async function createData(model: string, data: object) {
  try {
    const response = await fetch(`https://localhost:7166/api/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create data');
    }

    return await response.json();
  } catch (error) {
    console.error("Create Data Error:", error);
    throw error; 
  }
}
