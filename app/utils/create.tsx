async function createData(model:string, data:object) {
    try {
      const response = await fetch(`https://localhost:7166/api/${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong while creating the property");
      }

    } catch (error) {
      console.log((error as Error).message);
    }
  }

  export default createData;