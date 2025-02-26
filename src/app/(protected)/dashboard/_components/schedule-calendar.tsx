"use client";

import { Badge } from "@/components/ui/badge";
import { cn, getScheduleTypeVariant } from "@/lib/utils";
import { ScheduleItem } from "@/store/useScheduleStore";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";

export default function ScheduleCalendar({
  scheduleData,
}: {
  scheduleData: ScheduleItem[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get calendar dates
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Navigation handlers
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Get schedule for a specific date
  const getScheduleForDate = (date: Date) => {
    return scheduleData.find((schedule) => isSameDay(schedule.date, date));
  };

  const handleDateClick = (day: Date) => {
    const schedule = getScheduleForDate(day);
    if (!schedule) return; // 스케줄이 없으면 선택하지 않음
    setSelectedDate(selectedDate && isSameDay(day, selectedDate) ? null : day);
  };

  return (
    <>
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={previousMonth}
          className="h-9 w-9"
          aria-label="이전 달"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <h2 className="font-semibold">
          {format(currentDate, "yyyy MMMM", { locale: ko })}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          className="h-9 w-9"
          aria-label="다음 달"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="pt-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="gap-1/2 grid grid-cols-7">
        {days.map((day, dayIdx) => {
          const schedule = getScheduleForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={dayIdx}
              onClick={() => handleDateClick(day)}
              disabled={!schedule}
              className={cn(
                "relative flex min-h-[40px] flex-col rounded-lg p-2 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                isSelected && "border-1 border-primary",
                isToday && "border-1 border-primary",
                !schedule && "cursor-default opacity-50",
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "mx-auto flex flex-col items-center justify-center text-xs",
                )}
              >
                {format(day, "d")}
                <span
                  className={cn("h-2 w-2 rounded-full", {
                    "bg-emerald-500": schedule?.type === "시작",
                    "bg-primary": schedule?.type === "마감",
                    "bg-secondary": schedule?.type === "기타",
                    "bg-destructive": schedule?.type === "공휴일",
                    "bg-muted": !schedule?.type,
                  })}
                />
              </time>
            </button>
          );
        })}
      </div>

      {/* Selected Date Display - 스케줄이 있는 경우에만 표시 */}
      {selectedDate && getScheduleForDate(selectedDate) && (
        <div className="mt-3 rounded-lg border p-2 text-sm">
          <p className="inline-block font-medium">
            {format(selectedDate, "PPP", { locale: ko })}{" "}
          </p>
          <Badge
            className="ml-2 inline-block"
            variant={getScheduleTypeVariant(
              getScheduleForDate(selectedDate)!.type,
            )}
          >
            {getScheduleForDate(selectedDate)?.type}
          </Badge>

          <p className="mt-1 text-muted-foreground">
            {getScheduleForDate(selectedDate)?.label}
          </p>
        </div>
      )}
    </>
  );
}
