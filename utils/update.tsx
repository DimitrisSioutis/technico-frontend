export default async function updateData(model: string, id: string, data: object) {
  try {
    const payloadWithId = { ...data, id: id };

    const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadWithId),
    });

    const result = await response.json();
    return {
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error("Update Data Error:", error);
    throw error;
  }
}