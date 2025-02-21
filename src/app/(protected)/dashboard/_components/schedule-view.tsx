"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Calendar, List } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import ScheduleList from "./schedule-list";
import ScheduleCalendar from "./schedule-calendar";
import { useScheduleStore } from "@/store/useScheduleStore";
import { Card } from "@/components/ui";
import useGetHolidays from "@/hooks/useGetHolidays";

export function ScheduleView({ className }: { className?: string }) {
  const [view, setView] = useState<"calendar" | "list">("list");
  const scheduleData = useScheduleStore((state) => state.schedules);
  useGetHolidays(new Date().getFullYear());

  return (
    <Card className={cn("h-fit space-y-2 p-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">일정</h2>
        <div className="hidden gap-2 md:flex">
          <Toggle
            pressed={view === "list"}
            onPressedChange={() => setView("list")}
            aria-label="List view"
          >
            <List className="size-4" />
          </Toggle>
          <Toggle
            pressed={view === "calendar"}
            onPressedChange={() => setView("calendar")}
            aria-label="Calendar view"
          >
            <Calendar className="size-4" />
          </Toggle>
        </div>
      </div>

      <div className="hidden md:block">
        {view === "calendar" ? (
          <ScheduleCalendar scheduleData={scheduleData} />
        ) : (
          <ScheduleList scheduleData={scheduleData} />
        )}
      </div>

      <div className="md:hidden">
        <ScheduleList scheduleData={scheduleData} />
      </div>
    </Card>
  );
}
