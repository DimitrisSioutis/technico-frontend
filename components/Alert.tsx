"use client"
import React, { useEffect } from "react";
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
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";

const Alert = ({ formAction, icon, buttonLabel, hiddenInput = null }) => {
  const { toast } = useToast(); 
  const [state, action] = useFormState(formAction, null);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Error",
        description: state.error, 
        status: "error", 
        variant: "destructive"
      });
    }
  }, [state?.error, toast, state]); 

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-muted-foreground">
        {icon}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={action}>
            {hiddenInput}
            <AlertDialogAction asChild>
              <button type="submit" className="hover:bg-red-400">
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
