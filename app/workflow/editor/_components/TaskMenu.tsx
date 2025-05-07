'use client';

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskType } from '@/types/task';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { Button } from '@/components/ui/button';
function TaskMenu() {
    return (
        <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto'>
            <Accordion
                type='multiple'
                className='w-full'
                defaultValue={[
                    'extraction',
                    'interactions',
                    'timing',
                    'results',
                    'storage',
                ]}
            >
                <AccordionItem value='interactions'>
                    <AccordionTrigger className='font-bold'>
                        User Interactions
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuBtn taskType={TaskType.NAVIGATE_URL} />
                        <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
                        <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
                        <TaskMenuBtn taskType={TaskType.SCROLL_TO_ELEMENT} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='extraction'>
                    <AccordionTrigger className='font-bold'>
                        Data Extraction
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
                        <TaskMenuBtn
                            taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}
                        />
                        <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='storage'>
                    <AccordionTrigger className='font-bold'>
                        Data Storage
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuBtn
                            taskType={TaskType.READ_PROPERTY_FROM_JSON}
                        />
                        <TaskMenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='timing'>
                    <AccordionTrigger className='font-bold'>
                        Timing Controls
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='results'>
                    <AccordionTrigger className='font-bold'>
                        Result Delivery
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-1'>
                        <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType];
    const ondragstart = (e: React.DragEvent, type: TaskType) => {
        e.dataTransfer.setData('application/reactflow', type);
        e.dataTransfer.effectAllowed = 'move';
    };
    return (
        <Button
            variant={'secondary'}
            className='flex justify-start items-center gap-2 border w-full'
            draggable
            onDragStart={(e) => ondragstart(e, taskType)}
        >
            <task.icon size={20} />
            {task.label}
        </Button>
    );
}

export default TaskMenu;
