import createData from "../utils/create";
import updateData from "../utils/update"; // Assume you have an update utility


interface UserData {
    id?: string;
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password?: string;
}

// Define an interface for the form state
interface FormState {
    errors?: {
        vatNumber?: string;
        name?: string;
        surname?: string;
        address?: string;
        phoneNumber?: string;
        email?: string;
        password?: string;
    };
    success?: boolean;
}

export const register = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const errors: FormState['errors'] = {};

    // Validate formData fields
    if (!formData.get("vatNumber")) errors.vatNumber = "VAT Number is required";
    if (!formData.get("name")) errors.name = "Name is required";
    if (!formData.get("surname")) errors.surname = "Surname is required";
    if (!formData.get("address")) errors.address = "Address is required";

    const phoneNumber = formData.get("phoneNumber") as string;
    if (!phoneNumber || phoneNumber.length < 10) {
        errors.phoneNumber = "Phone number must be at least 10 digits";
    }

    const email = formData.get("email") as string;
    if (!email) {
        errors.email = "Email is required";
    }

    // Check if it's an update or new registration
    const userId = formData.get("userId") as string | null;

    // Password validation only for new registrations
    if (!userId) {
        const password = formData.get("password") as string;
        if (!password || password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const userData: UserData = {
        vatNumber: formData.get("vatNumber") as string,
        name: formData.get("name") as string,
        surname: formData.get("surname") as string,
        address: formData.get("address") as string,
        phoneNumber: phoneNumber,
        email: email,
        password: formData.get("password") as string,
    };

    if (userId) {
        await updateData('User', userId, userData);
    } else {
        const response = await  createData('User', userData);
        if(response.status == 409){
            if(response.data.message === 'User with this Email already exists'){
                errors.email = response.data.message
            }

            if(response.data.message === 'User with this Vat already exists'){
                errors.vatNumber = response.data.message
            }

            if(response.data.message === 'User with this VAT & Email already exists'){
                errors.vatNumber = 'User with this VAT already exists'
                errors.email = 'User with this Email already exists'
            }

            return { errors }
        }
    }

    return {
        success: true
    }
};