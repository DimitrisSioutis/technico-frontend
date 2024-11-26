export default async function deleteData(model: string, id: string){
    try {
      const capitalizedModel = model.charAt(0).toLocaleUpperCase() + model.slice(1);
      const response = await fetch(`https://localhost:7166/api/${capitalizedModel}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong while deleting the user');
      }
    } catch (error) {
      console.log(error);
    }
};
