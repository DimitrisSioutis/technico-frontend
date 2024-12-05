// update.tsx
export default async function updateData(model: string, id: string, payload: any) {

  const payloadWithId = {
    propertyId: id,
    ...payload,
  };

  try {
    const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadWithId),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update Data Error:', error);
    throw error;
  }
}