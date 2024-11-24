async function updateData(id:string, model:string, data:object){
  console.log(id)
  console.log(data)
    try {
      const response = await fetch(`https://localhost:7166/api/${model}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        console.error('Update Property Error');
      }
  
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Repair Save Catch Error:', errorMessage);
    } 
  };

  export default updateData;