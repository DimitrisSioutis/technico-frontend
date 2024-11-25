async function updateData(id: string, model: string, data: object): Promise<void> {
  const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update data');
  }

  return;
}

export default updateData;