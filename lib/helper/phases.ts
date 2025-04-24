import { ExecutionPhase } from '@prisma/client';

type Phase = Pick<ExecutionPhase, 'creditsCost'>;
export function GetPhasesTotalCost(phases: Phase[]) {
    return phases.reduceRight(
        (acc, phase) => acc + (phase.creditsCost || 0),
        0
    );
}
