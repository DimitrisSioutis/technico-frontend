"use server"
import createData from "../utils/create";
import updateData from "../utils/update"; // Assume you have an update utility
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import axios from "axios";

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

interface LoginData {
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
    userId?: string;
}

interface LoginFormState {
    errors?: {
        email?: string;
        password?: string;
    };
    success?: boolean;
    userId?: string;
}

export const register = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const errors: FormState['errors'] = {};

    // Validate formData fields
    if (!formData.get("vatNumber")) errors.vatNumber = "VAT Number is required";
    if (!formData.get("name")) errors.name = "Name is required";
    if (!formData.get("surname")) errors.surname = "Surname is required";
    if (!formData.get("address")) errors.address = "Address is required";

    const vatNumber = formData.get("vatNumber") as string;
    if(vatNumber.length!=9){
        errors.vatNumber = "VAT Number must be 10 characters"
    }
    const phoneNumber = formData.get("phoneNumber") as string;
    if (!phoneNumber || phoneNumber.length < 10) {
        errors.phoneNumber = "Phone number must be at least 10 digits";
    }

    const email = formData.get("email") as string;
    if (!email) {
        errors.email = "Email is required";
    }

    const userId = formData.get("userId") as string | null;

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

    let response;

    if (userId) {
        response = await updateData('User', userId, userData);
    } else {
        response = await createData('User', userData);
    }

    if (response.status === 409) {
        const errors: FormState['errors'] = {};
        const errorMessage = response.data.message;
        console.log(response.data.message)

        switch (errorMessage) {
            case "User with this Email already exists":
                errors.email = errorMessage;
                break;
            case 'User with this Vat already exists':
                errors.vatNumber = errorMessage;
                break;
            case 'User with this VAT & Email already exists':
                errors.vatNumber = 'User with this VAT already exists';
                errors.email = 'User with this Email already exists';
                break;
            default:
                console.log('Got the default error')
        }

        return { errors };
    }

    return {
        success: true,
        userId: response.data.id
    }
};

export const login = async function (prevState, formData) {
  const failObject = {
    success: false,
    message: "Invalid email / password."
  }

  // Create user object from form data
  const ourUser = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  // Basic type checks for email and password
  if (typeof ourUser.email !== "string") ourUser.email = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  try {
    // Sending login request to API
    const response = await axios.post(
      "https://localhost:7166/api/User/login",
      ourUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }
    );

    if (response.status === 200) {
      const token = response.data.token;

      cookies().set('token', token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,  // 1 day in seconds
        secure: true, // Set to true in production for HTTPS requests
      });

      redirect("/dashboard");
    } else {
      return failObject;
    }

  } catch (error) {
    console.error("Login error:", error);
    return failObject;
  }
};

export const logout = async function () {
  cookies().delete('token');
  redirect("/");
}
