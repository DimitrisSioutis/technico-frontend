export type Property = {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    ownerID: string;
    repairs: RepairModel[];
};

export type SimpleProperty = {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
};

export interface AddPropertyProps {
    id: string;
}
  
export type RepairModel = {
    id: string;
    scheduledDate: Date;
    type: RepairType;
    currentStatus: string;
    description: string;
    address: string;
    cost: number;
    propertyId: string;
};

export enum RepairType {
    Plumbing = 0,
    Electrical = 1,
    Painting = 2,
    Other = 3
}

export enum RepairStatus {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
    Cancelled = 3
}

export type User = {
    id: string;
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    properties: Property[];
};

export type SimpleUser = {
    id: string;
    name: string;
    surname: string;
    email: string;
};
  

  
export interface PropertyFormData {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    ownerID: string;
}

export interface PropertyData {
    address: string;
    yearOfConstruction: number;
    ownerID: string;
}
  
export interface FormErrors {
    address?: string;
    yearOfConstruction?: string;
    ownerId?: string;
}

export interface UserFormData {
    id: string;
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