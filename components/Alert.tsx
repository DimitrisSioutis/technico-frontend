import React from "react";
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

const Alert = ({formAction,icon,buttonLabel ,hiddenInput}) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger>{icon}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <form action={formAction}>
          {hiddenInput}
          <AlertDialogAction asChild>
            <button 
              type="submit" 
              className='hover:bg-red-400'
            >
              {buttonLabel}
            </button>
          </AlertDialogAction>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

export default Alert;
