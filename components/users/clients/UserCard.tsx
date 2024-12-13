import React from "react";
import { User as UserIcon, Mail, LogOut, Pencil } from "lucide-react";
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
// import {useFormState} from "react-dom";
import { logout, postUser } from "@/actions/userController";
import UserForm from "./UserForm";
import { type User } from "@/app/types";
import { revalidatePath } from "next/cache";

const UserCard = ({ user }: { user: User }) => {
  const formState = {
    values: {
      vatNumber: user.vatNumber,
      name: user.name,
      surname: user.surname,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
    },
    errors: {},
    success: false,
  };

  const formAction = async (formData: FormData) => {
    "use server"
    await postUser(formState, formData);
    revalidatePath("/dashboard");
  };

  const logoutAction = async (formData: FormData) => {
    "use server"
    await logout();
    revalidatePath("/dashboard");
  };

  // const [logoutState, logoutAction] = useFormState(logout, {});
  // const [updateState, updateAction] = useFormState(postUser, initialState);

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2">
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
                    <UserForm
                      formAction={formAction}
                      formState={formState}
                      userId={user.id}
                    /> 
          
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <div className="flex items-center text-muted-foreground mt-1">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <Alert
            formAction={logoutAction}
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
