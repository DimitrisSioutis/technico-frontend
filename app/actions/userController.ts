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

    const response = await fetch(`https://localhost:7166/api/User`, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
        },
    });

    const users: UserData[] = await response.json();

    // Check for existing email, but only if it's a different user
    const emailExists = users.find(
        user => user.email === email && (!userId || user.id !== userId)
    );

    if (emailExists) {
        errors.email = "That email is already in use";
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
        await createData('User', userData);
    }

    return {
        success: true
    }
};