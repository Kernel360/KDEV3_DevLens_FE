"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isToday } from "date-fns";
import { useMemo } from "react";
import { ScheduleItem, SCHEDULE_TYPE_COLORS } from "@/store/useScheduleStore";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function ScheduleList({
  scheduleData,
}: {
  scheduleData: ScheduleItem[];
}) {
  // Group schedules by date
  const groupedSchedules = useMemo(() => {
    const groups = scheduleData.reduce(
      (acc, schedule) => {
        const dateKey = format(schedule.date, "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(schedule);
        return acc;
      },
      {} as Record<string, typeof scheduleData>,
    );

    // Sort by date
    return Object.entries(groups)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateA).getTime() - new Date(dateB).getTime(),
      )
      .map(([date, schedules]) => ({
        date: new Date(date),
        schedules,
      }));
  }, [scheduleData]);

  return (
    <div className="max-h-[80vh] space-y-2 overflow-y-scroll scrollbar-hide">
      {groupedSchedules.map(({ date, schedules }) => (
        <div key={date.toISOString()}>
          <div className="sticky top-0 z-10 bg-background pb-1">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <span>{format(date, "MMMM d일 EEEE", { locale: ko })}</span>
              {isToday(date) && (
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-500"
                >
                  오늘
                </Badge>
              )}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {schedules.map((schedule, idx) => (
              <Card key={idx} className="flex items-start gap-4 p-2">
                {schedule.time && (
                  <div className="text-sm font-medium">{schedule.time}</div>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "shrink-0 rounded-lg p-1 text-xs bg-emerald-500/10",
                      SCHEDULE_TYPE_COLORS[schedule.type].text,
                      SCHEDULE_TYPE_COLORS[schedule.type].bgLight,
                    )}
                  >
                    {schedule.type}
                  </span>
                  <h4 className="truncate text-sm font-medium">
                    {schedule.label}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
