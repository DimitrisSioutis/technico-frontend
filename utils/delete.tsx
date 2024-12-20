export default async function deleteData(model: string, id: string) {
  const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 204) {
    return { success: true };
  }

  if (!response.ok) {
    const errorText = await response.text(); 
    throw new Error(errorText);
  }

  const responseBody = await response.text(); 
  if (responseBody === '') {
    throw new Error('No content returned from the server');
  }

  const result = JSON.parse(responseBody); 
  return result;
}
