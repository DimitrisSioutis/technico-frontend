import React, { useEffect, useState } from 'react'
import {useFormState} from 'react-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User as UserIcon, Mail, Wrench ,LogOut } from "lucide-react";
import Repairs from "@/components/repair/Repairs"
import fetchAll from '@/utils/fetchAll';
import { logout } from '@/actions/userController';
import Owners from './Owners';

const Admin = ({user}) => {

  const [formState, formAction] = useFormState(logout, {})
  const [dailyRepairs,setDailyRepairs] = useState([])
  
  useEffect(()=>{
    const fetchRepairs =  async () =>{
      const response = await fetchAll("Repair/daily")
      setDailyRepairs(response)
    }
    fetchRepairs(); 
  },[user])

  return (
    <div className="grid gap-6 w-2/3 min-w-[1000px] m-auto">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {user.name + " " + user.surname}
              </CardTitle>
              <div className="flex items-center text-muted-foreground mt-1">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger><LogOut/></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      By performing this action will be logged out of your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='hover:bg-red-400'>
                    <form action={formAction}>
                      <button type='submit'>
                          Log Out
                      </button>
                    </form>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue='daily-repairs' className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily-repairs">Daily Repairs</TabsTrigger>
          <TabsTrigger value="owners">Property Owners</TabsTrigger>
        </TabsList>

        <TabsContent value="daily-repairs">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Wrench className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Repairs Today</h3>
              </div>
              <Repairs repairs={dailyRepairs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owners">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-semibold">Property Owners</h3>
                </div>
                <Owners/>
              </CardContent>
            </Card>
          </TabsContent>
        
      </Tabs>
    </div>
  )
}

export default Admin