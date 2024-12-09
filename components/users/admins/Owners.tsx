import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import fetchAll from "@/utils/fetchAll";
import OwnerForm from "./OwnerForm";
import Owner from "./Owner";
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

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.vatNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Owner List</CardTitle>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md"
                />
                <Button
                  onClick={() => {
                    setShowForm(true);
                    setEditingOwner(null);
                  }}
                >
                  Add Owner
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Surname</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map((owner) => (
                  <Owner
                    owner={owner}
                    key={owner.id}
                    onEdit={handleEdit}
                    onDelete={() => handleDeleteOwner(owner.id!)}
                  />
                ))}
              </TableBody>
            </Table>
            {filteredOwners.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No owners found</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Owners;
