export default async function updateData(
  model: string, 
  id: string, 
  data: object
): Promise<void> {
  const payloadWithId = {
    ...data,
    id: id  
  };

  const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadWithId),  
  });

  if (!response.ok) {
    const errorData = await response.text()  
      .then(text => {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })
      .catch(() => null);
    
    console.error('Update Error:', errorData);
    throw new Error(
      typeof errorData === 'object' 
        ? errorData?.message || 'Failed to update data'
        : errorData || 'Failed to update data'
    );
  }

  return;
}