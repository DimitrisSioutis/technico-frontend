export type Property = {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    repairs: Repair[];
  };
  
export type Repair = {
    repairID: string;
    description: string;
    propertId: string;
    cost: number;
    type: RepairType;
};

export enum RepairType {
    Plumbing = 0,
    Electrical = 1,
    Painting = 2,
    Other = 3
}

export type User = {
    id: string;
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    properties: Property[];
};

export type SimpleUser = {
    id: string;
    name: string;
    surname: string;
    email: string;
};
  
export type SimpleProperty = {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
};

export interface AddPropertyProps {
    id: string;
}
  
export interface FormData {
    address: string;
    yearOfConstruction: number;
    ownerId: string;
}
  
export interface FormErrors {
    address?: string;
    yearOfConstruction?: string;
    ownerId?: string;
}

export interface UserFormData {
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
}
  

export interface UserFormErrors {
    vatNumber?: string;
    name?: string;
    surname?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
}