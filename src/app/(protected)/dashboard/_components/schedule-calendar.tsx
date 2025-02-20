"use client";

import { ko } from "date-fns/locale";
import {
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  subMonths,
  format,
  isSameDay,
  startOfWeek,
  isSameMonth,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { ScheduleItem } from "@/store/useScheduleStore";

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

          return (
            <button
              key={dayIdx}
              onClick={() => handleDateClick(day)}
              className={cn(
                "relative flex min-h-[50px] flex-col rounded-lg p-2 text-left transition-colors",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                isSelected && "border-1 border-primary",
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "mx-auto flex h-6 w-6 items-center justify-center text-xs",
                  schedule && "rounded-full bg-indigo-100",
                )}
              >
                {format(day, "d")}
              </time>
              {schedule && (
                <div
                  className={cn(
                    "mt-auto line-clamp-2 w-full text-xs text-foreground",
                  )}
                >
                  {schedule.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-3 rounded-lg border p-2 text-sm">
          <p className="font-medium">
            {format(selectedDate, "PPP", { locale: ko })}
          </p>
          {getScheduleForDate(selectedDate) && (
            <p className="mt-1 text-muted-foreground">
              {getScheduleForDate(selectedDate)?.label}
            </p>
          )}
        </div>
      )}
    </>
  );
}
