import React, { useEffect, useState } from "react";
import fetchAll from "@/utils/fetchAll";
import OwnerForm from "./OwnerForm";
import OwnersCard from "@/components/users/admins/OwnersCard";
import updateData from "@/utils/update";
import createData from "@/utils/create";

interface Property {
  address: string;
}

interface OwnerType {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  vatNumber?: string;
  properties?: Property[];
}

const Owners: React.FC = () => {
  const [owners, setOwners] = useState<OwnerType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingOwner, setEditingOwner] = useState<OwnerType | null>(null);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOwners = async () => {
    try {
      setIsLoading(true);
      const response: OwnerType[] = await fetchAll("User/owners");
      setOwners(response || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch owners:", error);
      setOwners([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    const max = Math.ceil(owners.filter(
      (owner) =>
        owner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.vatNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / 5) + 1;
    setMaxPage(max);
  }, [searchTerm, owners]);

  const handleEdit = (owner: OwnerType) => {
    setEditingOwner(owner);
    setShowForm(true);
  };

  const handleAddOwner = async (newOwner: OwnerType) => {
    try {
      let response;
      if (!newOwner.id) {
        delete newOwner.id; 
        response = await createData("User", newOwner);
      } else {
        response = await updateData("User", newOwner.id, newOwner);
      }
      setShowForm(false);
      setEditingOwner(null);
    } catch (error) {
      console.error("Failed to add/update owner:", error);
    } finally {
      const updatedOwners: OwnerType[] = await fetchAll("User/owners");
      setOwners(updatedOwners || []);
    }
  };

  const handleDeleteOwner = (ownerId: string) => {
    setOwners((prevOwners) =>
      prevOwners.filter((owner) => owner.id !== ownerId)
    );
  };



  return (
    <div className="container mx-auto p-4">
      {showForm ? (
        <OwnerForm
          owner={editingOwner}
          onSubmit={handleAddOwner}
          onCancel={() => {
            setShowForm(false);
            setEditingOwner(null);
          }}
        />
      ) : (
        <OwnersCard
          owners={owners}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowForm={setShowForm}
          setEditingOwner={setEditingOwner}
          handleEdit={handleEdit}
          handleDeleteOwner={handleDeleteOwner}
        />
      )}
    </div>
  );
};

export default Owners;