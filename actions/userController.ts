"use server";
import createData from "../utils/create";
import updateData from "@/utils/update";
import { cookies } from "next/headers";
import axios from "axios";
import { type User } from "@/app/types";
import { revalidatePath } from "next/cache";
import deleteData from "@/utils/delete";
import { redirect } from "next/navigation";
import https from "https";

// Define an interface for the form state
interface FormState {
  errors?: {
    id?: string;
    vatNumber?: string;
    name?: string;
    surname?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
  };
}

export async function postUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const errors: FormState['errors'] = {};

  if (!formData.get("vatNumber")) errors.vatNumber = "VAT Number is required";
  if (!formData.get("name")) errors.name = "Name is required";
  if (!formData.get("surname")) errors.surname = "Surname is required";
  if (!formData.get("address")) errors.address = "Address is required";

  const vatNumber = formData.get("vatNumber") as string;
  if (vatNumber.length !== 9) {
    errors.vatNumber = "VAT Number must be 9 characters";
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
  const password = formData.get("password") as string;
  if ((!password || password.length < 6) && !userId) {
    errors.password = "Password must be at least 6 characters";
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const userData: User = {
    vatNumber: formData.get("vatNumber") as string,
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    address: formData.get("address") as string,
    phoneNumber: phoneNumber,
    email: email,
    ...(!userId && { password: password }),
    ...(userId && { id: userId }),
  };

  try {
    if (userId) {
      await updateData("User", userId, userData);
    } else {
      await createData("User", userData);
    }
  } catch (error) {
    // Return a general error in the catch block
    return {
      errors: { 
        general: "An unexpected error occurred. Please try again later." 
      },
      values: userData
    };
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export const deleteUser = async function (id) {

  try {
    await deleteData("User",id)
  }
  catch(e){
    return e;
  }
};

export const login = async function (prevState, formData) {
  const ourUser = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!ourUser.email || !ourUser.password) {
    return "Email and password are required."
  }

  try {
    const response = await axios.post(
      "https://localhost:7166/api/User/login",
      ourUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const token = response.data.token;

      cookies().set("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
    });

  } catch (error) {
    return "Wrong username or password";
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
};


export const logout = async function () {
  cookies().delete("token");
};
