import React, { useState } from "react";
import { Pencil, Check, Trash2 } from "lucide-react";
import { type RepairModel , RepairStatus , RepairType} from "@/app/types";
import deleteData from "@/app/utils/delete";
import updateData from "@/app/utils/update";

interface RepairProps {
  repair: RepairModel;
  onRepairUpdated: ()=>void;
}

const Repair: React.FC<RepairProps> = ({ repair,onRepairUpdated}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRepair, setEditedRepair] = useState(repair);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRepair(repair); 
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    await updateData(repair.id, 'Repair', editedRepair);
    onRepairUpdated(); 
  };
  
  const handleChange = (field: keyof RepairModel, value: any) => {
    setEditedRepair((prevRepair) => ({
      ...prevRepair,
      [field]: value,
    }));
  };

  return (
    <div className="repair-container">
      {isEditing ? (
        <>
          <div className="repair-details">
            <div className="repair-field">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                className="border rounded-md"
                value={editedRepair.type}
                onChange={(e) => handleChange("type", e.target.value)}
              />
            </div>
            <div className="repair-field">
              <label htmlFor="description">Repair Description:</label>
              <textarea
              className="border rounded-md h-8"
                id="description"
                value={editedRepair.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="repair-field">
              <label htmlFor="currentStatus">Status:</label>
              <select
                className="border rounded-md"
                id="currentStatus"
                value={editedRepair.currentStatus}
                onChange={(e) => handleChange("currentStatus", e.target.value)}
                >
                {Object.keys(RepairStatus).map((statusKey) => (
                    <option key={statusKey} value={RepairStatus[statusKey]}>
                    {statusKey}
                    </option>
                ))}
                </select>
            </div>
            <div className="repair-field">
              <label htmlFor="scheduledDate">Scheduled for:</label>
              <input
                type="date"
                id="scheduledDate"
                className="border rounded-md"
                value={new Date(editedRepair.scheduledDate).toISOString().split('T')[0]}
                onChange={(e) => handleChange("scheduledDate", e.target.value)}
              />
            </div>
            <div className="repair-field">
              <label htmlFor="cost">Cost:</label>
              <input
                type="number"
                id="cost"
                className="border rounded-md"
                value={editedRepair.cost}
                onChange={(e) => handleChange("cost", e.target.value)}
              />
              <span>€</span>
            </div>
          </div>
          <div className="repair-actions">
            <button
              onClick={handleSaveEdit}
              title="Save changes"
            ><Check/></button>
            <button
              onClick={handleCancelEdit}
              title="Cancel edit"
            >Cancel</button>
          </div>
        </>
      ) : (
        <>
        <div className="repair-details">
          <p>Type: {RepairType[repair.type]}</p>
          <p>Repair Description: {repair.description}</p>
          <p>Status: {RepairStatus[repair.currentStatus]}</p>
          <p>Scheduled for: {new Date(repair.scheduledDate).toLocaleDateString()}</p>
          <p>Cost: {repair.cost}€</p>
        </div>
        <div >
          <button onClick={handleEdit} className="m-2">
            <Pencil/>
            </button>
          <button onClick={()=>deleteData('Repair',repair.id)} className="m-2">
            <Trash2/>
           </button>
        </div>
      </>
      )}
    </div>
  );
};

export default Repair;