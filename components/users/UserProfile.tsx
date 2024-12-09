"use client"
import React from 'react'
import UserPageSkeleton from '../skeletons/UsersSkeleton';
import { useUser } from '@/components/context/UserContext';
import User from './clients/User';
import Admin from './admins/Admin';
import { Loader } from 'lucide-react';


const UserProfile = ({user}) => {
  if (!user) return <UserPageSkeleton/>;
  if(user.role == 1) return <Admin user={user}/>
  return <User user={user}/>

}

export default UserProfile