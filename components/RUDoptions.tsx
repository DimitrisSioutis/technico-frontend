import React from 'react';
import { Eye, Trash2, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import deleteData from '@/app/utils/delete';

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
      <Button onClick={() => deleteData(model, id)}>
        <Trash2 color="rgb(75 85 99)" />
      </Button>
    </div>
  );
};

export default RUDoptions;
