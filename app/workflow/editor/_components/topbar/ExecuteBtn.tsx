'use client';
import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { Button } from '@/components/ui/button';
import useExecutionPlan from '@/hooks/useExecutionPlan';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExecuteBtn({ workflowId }: { workflowId: string }) {
    const generate = useExecutionPlan();
    const { toObject } = useReactFlow();
    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () =>
            toast.success('Execution Started', { id: 'flow-execution' }),
        onError: () =>
            toast.error('Execution Failed', { id: 'flow-execution' }),
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

                mutation.mutate({
                    workflowId,
                    flowDefinition: JSON.stringify(toObject()),
                });
            }}
        >
            <PlayIcon size={16} />
            Execute
        </Button>
    );
}

export default ExecuteBtn;
