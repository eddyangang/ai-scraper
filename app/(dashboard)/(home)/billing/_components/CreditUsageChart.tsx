'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartColumnStackedIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { GetCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInPeriod';

type ChartData = Awaited<ReturnType<typeof GetCreditUsageInPeriod>>;
const chartConfig = {
    success: {
        label: 'Successful Phase Credits',
        color: 'hsl(var(--chart-2))',
    },
    failed: { label: 'Failed Phase Credits', color: 'hsl(var(--chart-3))' },
};

function CreditUsageChart({
    data,
    title,
    description,
}: {
    data: ChartData;
    title: string;
    description: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                    <ChartColumnStackedIcon className='w-6 h-6 text-primary' />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className='max-h-[200px] w-full'
                    config={chartConfig}
                >
                    <BarChart
                        data={data}
                        height={200}
                        accessibilityLayer
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={'date'}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent className='w-[250px]' />
                            }
                        />
                        <Bar
                            radius={[0, 0, 4, 4]}
                            fillOpacity={0.8}
                            fill='var(--color-success)'
                            stroke='var(--color-success)'
                            stackId={'a'}
                            dataKey={'success'}
                        />
                        <Bar
                            radius={[4, 4, 0, 0]}
                            fillOpacity={0.8}
                            fill='var(--color-failed)'
                            stroke='var(--color-failed)'
                            stackId={'a'}
                            dataKey={'failed'}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default CreditUsageChart;
