import React from 'react';
import { type SimpleUser } from '@/app/layout-types';
import RUDoptions from '../RUDoptions';

interface UserProps {
  users: SimpleUser[];
  fetchUsers: () => void;
}

const Users: React.FC<UserProps> = ({ users, fetchUsers }) => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-medium">{user.name + ' ' + user.surname}</h3>
          <p className="text-gray-600">Email: {user.email}</p>
          <RUDoptions model="user" id={user.id} fetch={fetchUsers} />
        </div>
      ))}
    </>
  );
};

export default Users;
