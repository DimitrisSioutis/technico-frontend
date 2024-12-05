"use client"
import React from 'react'
import UserPageSkeleton from '../skeletons/UsersSkeleton';
import { useUser } from '@/components/UserContext';
import User from './User';
import Admin from './Admin';

const UserProfile = () => {
  const { user } = useUser();
  
  if (!user) return <UserPageSkeleton/>;
  if(user.role == 1) return <Admin/>

  return (
    <User user={user}/>
  )
}

export default UserProfile