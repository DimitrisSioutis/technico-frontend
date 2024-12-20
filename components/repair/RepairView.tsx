import React from 'react';
import { Trash2, Pencil } from "lucide-react";
import { RepairStatus, RepairType } from "@/app/types";
import { format, parseISO } from "date-fns";
import Alert from '../Alert';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { deleteRepair } from '@/actions/repairController';

const RepairView = ({ repair, onEdit }) => {

  return (
    <Card>
    <CardHeader>
      <CardTitle>Repair Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
    <input hidden defaultValue={repair.id} name="id" />
    <p>
      <span className="text-slate-400">Type:</span> {RepairType[repair.type]}
    </p>
    <p>
      <span className="text-slate-400">Repair Description:</span> {repair.description}
    </p>
    <p>
      <span className="text-slate-400">Status:</span> {RepairStatus[repair.currentStatus]}
    </p>
    <p>
      <span className="text-slate-400">Scheduled for:</span> {format(parseISO(repair.scheduledDate), "dd/MM/yyyy")}
    </p>
    <p>
      <span className="text-slate-400">Address:</span> {repair.address}
    </p>
    <p>
      <span className="text-slate-400">Cost:</span> {repair.cost}€
    </p>
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
            name="id"
            defaultValue={repair.id}
          />
        }
        icon={<Trash2/>}
        formAction={deleteRepair}
        buttonLabel={"Delete Repair"}
      />
    </CardFooter>
  </Card>
  );
};

export default RepairView;
