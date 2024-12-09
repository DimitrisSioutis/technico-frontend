import React from "react";
import { type Property } from "@/app/types";
import fetchData from "@/utils/fetch";
import PropertyPage from "@/components/properties/PropertyPage";
import { getUserCookie } from "@/lib/getUserCookie";

export default async function Property({ params }: { params: { id?: string } }) {
  const propertyId = params.id
  const property = await fetchData(propertyId, "Property")

  const cookie = getUserCookie();
  const userEmail = cookie?.userEmail;

  return (
    <PropertyPage property={property} userEmail={userEmail} />
  )
}