import { Period } from '@/types/analytics';
import { endOfMonth, intervalToDuration, startOfMonth } from 'date-fns';

export function DatesToDurationString(
    end: Date | null | undefined,
    start: Date | null | undefined
) {
    if (!start || !end) return null;

    const timeElasped = end.getTime() - start.getTime();

    if (timeElasped < 1000) {
        return `${timeElasped}ms`;
    }

    const duration = intervalToDuration({
        start: 0,
        end: timeElasped,
    });
    return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}

export function PeriodToDateRange(period: Period) {
    const startDate = startOfMonth(new Date(period.year, period.month));
    const endDate = endOfMonth(new Date(period.year, period.month));
    return { startDate, endDate };
}
