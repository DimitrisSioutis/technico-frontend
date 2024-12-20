export default async function createData(model: string, data: object) {
  try {
    const response = await fetch(`https://localhost:7166/api/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return {
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error("Create Data Error:", error);
    throw error;
  }
}
