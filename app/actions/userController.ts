import createData from "../utils/create";
export const register = async function (prevState, formData) {
    const errors = {};

    // Validate formData fields
    if (!formData.get("vatNumber")) errors.vatNumber = "VAT Number is required";
    if (!formData.get("name")) errors.name = "Name is required";
    if (!formData.get("surname")) errors.surname = "Surname is required";
    if (!formData.get("address")) errors.address = "Address is required";

    const phoneNumber = formData.get("phoneNumber");
    if (!phoneNumber || phoneNumber.length < 10) {
        errors.phoneNumber = "Phone number must be at least 10 digits";
    }

    if (!formData.get("email")) {
        errors.email = "Email is required";
    }

    const password = formData.get("password");
    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }


    const response = await fetch(`https://localhost:7166/api/User`, {
            cache: "no-store",
            headers: {
                Accept: "application/json",
            },
    });

    const users = await response.json();

    console.log(users)

    const emailExists = users.find(user => user.email === formData.get("email"));

    if (emailExists) {
        errors.email = "That email is already in use";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const ourUser = {
        vatNumber: formData.get("vatNumber"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        address: formData.get("address"),
        phoneNumber: formData.get("phoneNumber"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    createData('User', ourUser);

    return { errors, success: true };
};
