import React from 'react';
import Link from 'next/link';
import { Eye, Trash2, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { type SimpleUser } from '@/app/layout-types';

interface UserProps {
  users: SimpleUser[];
}

const handleSubmit = async (id:string) =>{
    try{
        const response = await fetch(`https://localhost:7166/api/User/${id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Something went wrong while deleting the user");
        }
    }catch(error){
        console.log(error)
    }

}

const Users: React.FC<UserProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-medium">{user.name + ' ' + user.surname}</h3>
          <p className="text-gray-600">ID: {user.id}</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <div className="flex gap-4 py-2">
            <Link href={`/user/${user.id}`}>
              <Eye color="rgb(75 85 99)" />
            </Link>
            <Link href={`/user/${user.id}`}>
              <Pencil color="rgb(75 85 99)" />
            </Link>
            <Button onClick={()=>handleSubmit(user.id)}>
              <Trash2 color="rgb(75 85 99)" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users;
