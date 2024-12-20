"use client"
import React, { useEffect, useState } from 'react'
import {useFormState} from 'react-dom'
import { Input } from "@/components/ui/input";
import Alert from '@/components/Alert';
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
  const [ongoingRepairs,setOngoingRepairs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(()=>{
    const fetchRepairs =  async () =>{
      const response1 = await fetchAll("Repair/daily")
      const response2 = await fetchAll("Repair/ongoing")
      setDailyRepairs(response1)
      setOngoingRepairs(response2)
    }
    fetchRepairs(); 
  },[user])

  const filteredRepairs = ongoingRepairs.filter(
    (repair) => repair.scheduledDate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Alert formAction={formAction} icon={<LogOut/>} buttonLabel={"Log Out"} />
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue='daily-repairs' className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily-repairs">Daily Repairs</TabsTrigger>
          <TabsTrigger value="owners">Property Owners</TabsTrigger>
          <TabsTrigger value="repairs">Ongoing Repairs</TabsTrigger>
        </TabsList>

        <TabsContent value="daily-repairs">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Wrench className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Repairs Scheduled for today</h3>
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

          <TabsContent value="repairs">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Wrench className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-semibold">Ongoing Repairs</h3>
                  <Input
                  placeholder="Search ongoing repairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md float-right mx-auto"
                />
                </div>

                <Repairs repairs={filteredRepairs} />
              </CardContent>
            </Card>
          </TabsContent>
        
      </Tabs>
    </div>
  )
}

export default Admin