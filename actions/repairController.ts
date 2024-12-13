"use server"
import createData from "@/utils/create";
import deleteData from "@/utils/delete";
import updateData from "@/utils/update"; 
import { revalidatePath } from "next/cache";

enum RepairType {
  Other = 0,
  Plumbing = 1,
  Electrical = 2,
  Structural = 3,
}

export async function postRepair(prevState: FormState, formData: FormData): Promise<FormState>{
  const errors: FormState['errors'] = {};

  if (!formData.get("scheduledDate")) errors.scheduledDate = "Scheduled Date is required";
  if (!formData.get("type")) errors.type = "Repair Type is required";
  if (!formData.get("description")) errors.description = "Description is required";
  if (!formData.get("cost")) errors.cost = "Cost is required";

  const scheduledDate = formData.get("scheduledDate");
  const type = formData.get("type");
  const description = formData.get("description");
  const cost = formData.get("cost");
  const propertyId = formData.get("propertyId") as string | null;
  const id = formData.get("id") as string | null;
  const propertyAddress = formData.get("propertyAddress") as string;
  
  if (scheduledDate) {
    const parsedDate = new Date(scheduledDate as string);
    if (isNaN(parsedDate.getTime())) {
      errors.scheduledDate = "Invalid date format";
    }
  }

  const parsedType = type ? Number(type) : null;
  if (parsedType === null || !Object.values(RepairType).includes(parsedType)) {
    errors.type = "Invalid repair type";
  }

  const parsedCost = cost ? parseFloat(cost as string) : null;
  if (parsedCost !== null && isNaN(parsedCost)) {
    errors.cost = "Invalid cost";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const repairData: RepairData = {
    scheduledDate: scheduledDate ? new Date(scheduledDate as string).toISOString() : null,
    type: parsedType as RepairType,
    description: description as string,
    cost: parsedCost,
    propertyId: propertyId,
    address: propertyAddress,
  };
  
  try {
    let response;
    if (id) {
      console.log(id)
      const updateRepairData = {
        ...repairData,
        id: id
      };
      response = await updateData('Repair', id, updateRepairData);
    }else{
      response = await createData('Repair', repairData);

    }

    if(response.status == 201 || response.status == 200)  
      revalidatePath('/dashboard');
    
    return {
      success: true,
    };
  } catch (error) {
    console.error("Repair operation error:", error);
    return {
      errors: {
        submit: error instanceof Error 
          ? `Failed to save repair: ${error.message}` 
          : "Failed to save repair. Please try again."
      }
    };
  }
};

export async function deleteRepair(
  prevState: { 
    success?: boolean; 
    message?: string; 
    id?: string 
  }, 
  formData: FormData
){
  const id = formData.get('id') as string;
  try {
    await deleteData("Repair", id);
    revalidatePath("/dashboard");
    return { 
      success: true, 
      message: "Repair deleted successfully",
      id 
    };
  } catch(error) {
    console.error("Delete repair error:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "An error occurred during repair deletion",
      id 
    };
  }
};