import React from "react";
import { type User } from "@/app/types";

const UserDetails = ({ user }: { user: User }) => {

  const userFields = [
    { label: "VAT Number", value: user.vatNumber },
    { label: "Name", value: user.name },
    { label: "Surname", value: user.surname },
    { label: "Address", value: user.address },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Email", value: user.email },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4">
        {userFields.map((field, index) => (
          <div key={index}>
            <label className="font-medium text-gray-400">{field.label}</label>
            <p className="text-gray-800">{field.value || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
