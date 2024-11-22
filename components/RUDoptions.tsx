import React from 'react';
import { Eye, Trash2, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const handleSubmit = async (model: string, id: string) => {
  try {
    const capitalizedModel = model.charAt(0).toLocaleUpperCase() + model.slice(1);
    const response = await fetch(`https://localhost:7166/api/${capitalizedModel}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong while deleting the user');
    }
  } catch (error) {
    console.log(error);
  }
};

interface RUDoptionsProps {
  model: string;
  id: string;
}

const RUDoptions: React.FC<RUDoptionsProps> = ({ model, id }) => {
  return (
    <div className='flex gap-4 py-2'>
      <Link href={`/${model}/${id}`}>
        <Eye color="rgb(75 85 99)" />
      </Link>
      <Link href={`/${model}/update/${id}`}>
        <Pencil color="rgb(75 85 99)" />
      </Link>
      <Button onClick={() => handleSubmit(model, id)}>
        <Trash2 color="rgb(75 85 99)" />
      </Button>
    </div>
  );
};

export default RUDoptions;
