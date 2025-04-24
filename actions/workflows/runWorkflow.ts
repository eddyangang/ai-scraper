'use server';

import prisma from '@/lib/prisma';
import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { WorkflowExecutionPlan } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { number } from 'zod';

export async function RunWorkflow(form: {
    workflowId: string;
    flowDefinition?: string;
}) {
    const { userId } = auth();
    if (!userId) {
        throw new Error('unauthenticated');
    }

    const { workflowId, flowDefinition } = form;

    if (!workflowId) {
        throw new Error('workflowId is required');
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            userId,
            id: workflowId,
        },
    });

    if (!workflow) {
        throw new Error('Workflow not found');
    }

    let executionPlan: WorkflowExecutionPlan;

    if (!flowDefinition) {
        throw new Error('Flow definition is not defined');
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
        throw new Error('flow definition not valid');
    }

    if (!result.executionPlan) {
        throw new Error('no execution plan');
    }
    executionPlan = result.executionPlan;

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            status: 'PENDING',
            startedAt: new Date(),
            trigger: 'manual',
            phases: {
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId,
                            status: 'CREATED',
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        };
                    });
                }),
            },
        },
        select: {
            id: true,
            phases: true,
        },
    });

    if (!execution) {
        throw new Error('workflow execution not created');
    }
}
