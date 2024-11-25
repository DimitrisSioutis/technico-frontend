import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation'

import { Eye, Trash2, Pencil } from 'lucide-react';
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
import deleteData from '@/app/utils/delete';

interface RUDoptionsProps {
  model: string;
  id: string;
}

const RUDoptions: React.FC<RUDoptionsProps> = ({ model, id }) => {

  const router = useRouter();

  return (
    <div className='flex gap-4 py-2'>
      <Link href={`/${model}/${id}`}>
        <Eye color="rgb(75 85 99)" />
      </Link>
      <Link href={`/${model}/update/${id}`}>
        <Pencil color="rgb(75 85 99)" />
      </Link>
      <AlertDialog>
      <AlertDialogTrigger><Trash2 color="rgb(75 85 99)"/></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your content
            and remove your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteData(model, id)
              router.push(`/user`)
            }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
};

export default RUDoptions;
