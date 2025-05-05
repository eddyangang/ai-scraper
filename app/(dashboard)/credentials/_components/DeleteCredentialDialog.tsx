'use client';

import React, { useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { DeleteCredential } from '@/actions/credentials/deleteCredential';

function DeleteCredentialDialog({ name }: { name: string }) {
    const [confirmText, setConfirmText] = useState('');
    const [open, setOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: DeleteCredential,
        onSuccess: () => {
            toast.success('Credential deleted successfully', { id: name });
            setConfirmText('');
        },
        onError: () => {
            toast.error('Something went wrong', { id: name });
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'icon'}>
                    <XIcon size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this credential, you will not be able to
                        recover it.
                        <div className='flex flex-col py-4 gap-2'>
                            <span>
                                If you are sure, enter <b>{name}</b> to confirm:
                            </span>
                            <Input
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmText('')}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        disabled={
                            confirmText !== name || deleteMutation.isPending
                        }
                        onClick={(e) => {
                            e.stopPropagation;
                            toast.loading('Deleting credential..', {
                                id: name,
                            });
                            deleteMutation.mutate(name);
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteCredentialDialog;
