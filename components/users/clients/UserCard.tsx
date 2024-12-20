import React from "react";
import { User as UserIcon, Mail, LogOut, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Alert from "@/components/Alert";
import { logout } from "@/actions/userController";
import { type User } from "@/app/types";
import { deleteUser } from "@/actions/userController";
import Form from "./Form";

const UserCard = ({ user }: { user: User }) => {

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 ml-2">
                <span>{user.name + " " + user.surname}</span>
                <Dialog>
                  <DialogTrigger>
                    <Pencil className="h-5 w-5 text-muted-foreground cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>User Profile</DialogTitle>
                      <DialogDescription>Edit user details</DialogDescription>
                    </DialogHeader>
                    <Form user={user}/>
                  </DialogContent>
                </Dialog>
                <Alert
                      formAction={deleteUser}
                      icon={<Trash2/>}
                      buttonLabel={"Delete User"}
                      hiddenInput={<></>}
                />
                
              </CardTitle>
              <div className="flex items-center text-muted-foreground mt-1">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <Alert
            formAction={logout}
            icon={<LogOut />}
            buttonLabel={"Log Out"}
            hiddenInput={<></>}
          /> 
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
