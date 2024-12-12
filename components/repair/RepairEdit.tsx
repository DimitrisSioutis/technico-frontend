import React, { useState, useRef } from "react";
import { useFormState } from "react-dom";
import { postRepair } from "@/actions/repairController";
import { Check } from "lucide-react";
import { RepairType, RepairStatus } from "@/app/types";
import { Input } from "@/components/ui/input";
import { format, parse } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const RepairEdit = ({ repair, onSave, onCancel }) => {
  const [formState, formAction] = useFormState(postRepair, {});
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [editedRepair, setEditedRepair] = useState(() => ({
    type: repair?.type || "",
    description: repair?.description || "",
    currentStatus: repair?.currentStatus || "",
    scheduledDate: repair?.scheduledDate 
      ? format(new Date(repair.scheduledDate), "yyyy-MM-dd'T'HH:mm") 
      : "",
    cost: repair?.cost || 0,
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    
    setEditedRepair((prev) => ({
      ...prev,
      [name]: type === 'number' 
        ? Number(value) 
        : type === 'datetime-local'
        ? value 
        : value,
    }));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.requestSubmit();
    onSave();
  };

  if(formState.success){
    toast({
      title: "Repair Edited",
    })
  }

  return (
    <form ref={formRef} action={formAction}>
      <input hidden name="id" defaultValue={repair.id} />
      <input hidden name="propertyId" defaultValue={repair.propertyId} />
      <input hidden name="propertyAddress" defaultValue={repair.address} />
      
      <div className="repair-details">
        <div className="repair-field">
          <label htmlFor="type">Type:</label>
          <select
            className="border rounded-md p-1 m-1"
            id="type"
            name="type"
            value={editedRepair.type}
            onChange={handleChange}
          >
            {Object.entries(RepairType)
              .filter(([key, value]) => !isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        
        <div className="repair-field">
          <label htmlFor="description">Repair Description:</label>
          <textarea
            className="border rounded-md h-8 p-1 m-1"
            id="description"
            name="description"
            value={editedRepair.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="repair-field">
          <label htmlFor="currentStatus">Status:</label>
          <select
            className="border rounded-md p-1 m-1"
            id="currentStatus"
            name="currentStatus"
            value={editedRepair.currentStatus}
            onChange={handleChange}
          >
            {Object.entries(RepairStatus)
              .filter(([key, value]) => !isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        
        <div className="repair-field">
          <label htmlFor="scheduledDate" className="block mb-2 text-sm font-medium">
            Scheduled for:
          </label>
          <Input
            id="scheduledDate"
            name="scheduledDate"
            type="datetime-local"
            value={editedRepair.scheduledDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="repair-field">
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            className="border rounded-md p-1 m-1"
            name="cost"
            value={editedRepair.cost}
            onChange={handleChange}
          />
          <span>€</span>
        </div>
      </div>
      
      <div className="repair-actions">
        <button onClick={handleSave} title="Save changes">
          <Check />
        </button>
        <button onClick={() => onCancel()} title="Cancel edit">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RepairEdit;