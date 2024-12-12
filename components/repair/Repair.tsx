import React, { useState } from "react";
import { type RepairModel} from "@/app/types";

import RepairView from "./RepairView";
import RepairEdit from "./RepairEdit";

interface RepairProps {
  repair: RepairModel;
}

const Repair: React.FC<RepairProps> = ({ repair}) => {
  const [isEditing, setIsEditing] = useState(false);


  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false)
  };

  return (
    
    <div className="repair-container">
      {isEditing ? (
        <RepairEdit repair={repair} onSave={handleSave} onCancel={handleCancelEdit}/>
      ) : (
        <RepairView onEdit={handleEdit} repair={repair} onSave={handleSave} onCancel={handleCancelEdit}/>
      )}
    </div>
  );
};

export default Repair;