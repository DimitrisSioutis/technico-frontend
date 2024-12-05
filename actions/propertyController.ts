// propertyController.ts
import createData from "@/utils/create";
import updateData from "@/utils/update";  // Make sure to import updateData

interface PropertyData {
    address: FormDataEntryValue | null;
    yearOfConstruction: number | null;  // Change the type to number | null
    ownerID: string | null;
    propertyId?: string;  // Optional propertyId
}

export const createProperty = async (prevState: FormState, formData: FormData): Promise<FormState> => {
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

    // Validate year of construction is a valid number
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
        } else {
            response = await createData('Property', propertyData);
        }

        console.log(response)

        return {
            success: true,
        };
    } catch (error) {
        console.error("Property operation error:", error);
        return {
            errors: {
                submit: "Failed to save property. Please try again."
            }
        };
    }
};