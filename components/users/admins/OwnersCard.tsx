import React,{useState,useMemo} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Owner from "./Owner";

interface OwnerType {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  vatNumber?: string;
  properties?: Property[];
}

interface Property {
  address: string;
}

interface OwnersCardProps {
  owners: OwnerType[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setShowForm: (show: boolean) => void;
  setEditingOwner: (owner: OwnerType | null) => void;
  handleEdit: (owner: OwnerType) => void;
  handleDeleteOwner: (ownerId: string) => void;
}

const OwnersCard: React.FC<OwnersCardProps> = ({
  owners,
  searchTerm,
  setSearchTerm,
  setShowForm,
  setEditingOwner,
  handleEdit,
  handleDeleteOwner
}) => {
    const PAGE_SIZE = 5;
  
    const [page, setPage] = useState<number>(0);

    const filteredOwners = useMemo(() => 
      owners.filter(
        (owner) =>
          owner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.vatNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      [owners, searchTerm]
    );
  
    const totalPages = useMemo(() => 
      Math.max(1, Math.ceil(filteredOwners.length / PAGE_SIZE)),
      [filteredOwners]
    );
  
    React.useEffect(() => {
      if (page >= totalPages) {
        setPage(Math.max(0, totalPages - 1));
      }
    }, [page, totalPages]);
  
    const paginatedOwners = useMemo(() => 
      filteredOwners.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
      [filteredOwners, page]
    );
  
    const handleNextPage = () => {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };
  
    const handlePrevPage = () => {
      setPage((prevPage) => Math.max(prevPage - 1, 0));
    };
  
    const handlePageSelect = (selectedPage: number) => {
      setPage(selectedPage);
    };
  
    return (
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
              {paginatedOwners.map((owner) => (
                <Owner
                  owner={owner}
                  key={owner.id}
                  onEdit={handleEdit}
                  onDelete={() => handleDeleteOwner(owner.id!)}
                />
              ))}
            </TableBody>
          </Table>
          
          {filteredOwners.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No owners found</p>
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePrevPage} 
                    disabled={page === 0}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageSelect(index)}
                      isActive={page === index}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNextPage} 
                    disabled={page === totalPages - 1}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default OwnersCard;