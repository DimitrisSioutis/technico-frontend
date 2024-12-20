"use server"
import createData from "@/utils/create";
import deleteData from "@/utils/delete";
import updateData from "@/utils/update"; 
import { revalidatePath } from "next/cache";

interface PropertyData {
    address: FormDataEntryValue | null;
    yearOfConstruction: number | null;  
    ownerID: string | null;
    propertyId?: string;  
}

export async function createProperty(prevState: FormState, formData: FormData): Promise<FormState>{
    const errors: FormState['errors'] = {};

    if (!formData.get("address")) errors.address = "Address is required";
    if (!formData.get("yearOfConstruction")) errors.yearOfConstruction = "Year of Construction is required";

    const address = formData.get("address");
    const yearOfConstruction = formData.get("yearOfConstruction");
    const propertyId = formData.get("propertyId") as string | null;
    const userId = formData.get("userId") as string | null;

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const constructionYear = yearOfConstruction ? parseInt(yearOfConstruction as string) : null;
    
    if (constructionYear && isNaN(constructionYear)) {
        errors.yearOfConstruction = "Invalid year of construction";
        return { errors };
    }

    const propertyData: PropertyData = {
        address: address,
        yearOfConstruction: constructionYear,
        ownerID: userId
    };

    try {
      let response;
      if (propertyId) {
          const updatePropertyData: PropertyData = {
              propertyId: propertyId,
              address: address,
              yearOfConstruction: constructionYear,
              ownerID: userId
          };
          response = await updateData('Property', propertyId, updatePropertyData);
          if(response.status == 201) 
            revalidatePath('/dashboard');
            return {
                success: true,
            };

      } else {
          response = await createData('Property', propertyData);
          console.log(response.status)
          if(response.status == 201) 
              revalidatePath('/dashboard');
              return {
                  success: true,
              };
      }

    } catch (error) {
        console.error("Property operation error:", error);
        return {
            errors: {
                submit: error
            }
        };
    }
};


export const deleteProperty = async (
  prevState: { 
    success?: boolean; 
    message?: string; 
    propertyId?: string 
  }, 
  formData: FormData
) => {
  const propertyId = formData.get('propertyId') as string;

  try {
    await deleteData("Property", propertyId);
    
    revalidatePath("/dashboard");

    return { 
      success: true, 
      message: "Property deleted successfully",
      propertyId 
    };
  } catch(e) {
    return { 
      success: false, 
      message: e instanceof Error ? e.message : "An error occurred during property deletion",
      propertyId 
    };
  }
}