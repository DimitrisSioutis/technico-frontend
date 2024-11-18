import React from 'react'
import { User} from '@/app/user/[id]/page';

type UserDetailsProps = {
    user: User; // Expecting a `user` object
};
    
const UserDetails:React.FC<UserDetailsProps>  = ({user}) => {
  return (
    <div className="mb-4 p-4 border rounded-lg shadow-md">
    <h3 className="text-lg font-medium">{user.name}</h3>
    <p className="text-gray-600">ID: {user.id}</p>
    <p className="text-gray-600">Email: {user.email}</p>
  </div>
  )
}

export default UserDetails