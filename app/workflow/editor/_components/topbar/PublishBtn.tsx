'use client';
import { PublishWorkflow } from '@/actions/workflows/publishWorkflow';
import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { Button } from '@/components/ui/button';
import useExecutionPlan from '@/hooks/useExecutionPlan';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { UploadIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function PublishBtn({ workflowId }: { workflowId: string }) {
    const generate = useExecutionPlan();
    const { toObject } = useReactFlow();
    const mutation = useMutation({
        mutationFn: PublishWorkflow,
        onSuccess: () =>
            toast.success('Workflow Published', { id: 'workflowId' }),
        onError: () => toast.error('Published Failed', { id: 'workflowId' }),
    });

    return (
        <Button
            variant={'outline'}
            className='flex items-center gap-2 '
            disabled={mutation.isPending}
            onClick={() => {
                const plan = generate();
                if (!plan) {
                    // client side validation
                    return;
                }
                toast.loading('Publishing Workflow...', { id: workflowId });
                mutation.mutate({
                    id: workflowId,
                    flowDefinition: JSON.stringify(toObject()),
                });
            }}
        >
            <UploadIcon size={16} className='stroke-green-400' />
            Publish
        </Button>
    );
}

export default PublishBtn;
