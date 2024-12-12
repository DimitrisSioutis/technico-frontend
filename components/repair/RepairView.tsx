import React from 'react';
import { Trash2, Pencil } from "lucide-react";
import { RepairStatus, RepairType } from "@/app/types";
import { format, parseISO } from "date-fns";
import Alert from '../Alert';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { deleteRepair } from '@/actions/repairController';
import { useFormState } from 'react-dom';

const RepairView = ({ repair, onEdit }) => {

  const initialState = {
    success: undefined,
    message: undefined,
    id: repair.id
  };
  const [formState, formAction] = useFormState(deleteRepair, initialState);
  return (
    <Card>
    <CardHeader>
      <CardTitle>Repair Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <input hidden defaultValue={repair.id} name="id" />
      <p>Type: {RepairType[repair.type]}</p>
      <p>Repair Description: {repair.description}</p>
      <p>Status: {RepairStatus[repair.currentStatus]}</p>
      <p>
        Scheduled for: {format(parseISO(repair.scheduledDate), "dd/MM/yyyy")}
      </p>
      <p>Address: {repair.address}</p>
      <p>Cost: {repair.cost}€</p>
      
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <button 
        onClick={onEdit} 
        className="mr-2 p-2 rounded hover:bg-gray-200"
        title="Edit property"
      >
        <Pencil />
      </button>
      <Alert
          hiddenInput={
            <input
              type="hidden"
              name="id"
              value={repair.id}
            />
          }
          icon={<Trash2/>}
          formAction={formAction}
          buttonLabel={"Delete"}
        />
    </CardFooter>
  </Card>
  );
};

export default RepairView;
