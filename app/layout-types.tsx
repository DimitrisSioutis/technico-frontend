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
    name: string;
    surname: string;
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
  