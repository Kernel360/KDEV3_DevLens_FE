import { create } from "zustand";

export const SCHEDULE_TYPE_COLORS = {
  시작: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    bgLight: "bg-emerald-500/10",
  },
  마감: {
    bg: "bg-primary-500",
    text: "text-primary-foreground",
    bgLight: "bg-primary",
  },
  기타: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    bgLight: "bg-blue-500/10",
  },
  공휴일: {
    bg: "bg-red-500",
    text: "text-red-500",
    bgLight: "bg-red-500/10",
  },
} as const;

export interface ScheduleItem {
  date: Date;
  label: string;
  time?: string;
  type: keyof typeof SCHEDULE_TYPE_COLORS;
}

interface ScheduleState {
  schedules: ScheduleItem[];
  setProjectSchedules: (
    projects: Array<{
      projectName?: string;
      startDate?: string;
      endDate?: string;
    }>,
  ) => void;
  setHolidays: (
    holidays: Array<{
      dateName: string;
      locdate: number;
    }>,
  ) => void;
  clearSchedules: () => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  schedules: [],
  setProjectSchedules: (projects) => {
    const newSchedules: ScheduleItem[] = [];

    projects.forEach((project) => {
      if (project.startDate) {
        newSchedules.push({
          date: new Date(project.startDate),
          label: `${project.projectName}`,
          type: "시작",
        });
      }
      if (project.endDate) {
        newSchedules.push({
          date: new Date(project.endDate),
          label: `${project.projectName}`,
          type: "마감",
        });
      }
    });

    set((state) => ({
      schedules: [
        ...state.schedules.filter(
          (s) => s.type !== "시작" && s.type !== "마감",
        ),
        ...newSchedules,
      ],
    }));
  },
  setHolidays: (holidays) => {
    const today = new Date();
    const newHolidays = holidays
      .filter((holiday) => {
        const holidayDate = new Date(
          parseInt(holiday.locdate.toString().substring(0, 4)),
          parseInt(holiday.locdate.toString().substring(4, 6)) - 1,
          parseInt(holiday.locdate.toString().substring(6, 8)),
        );
        return holidayDate >= today;
      })
      .map((holiday) => ({
        date: new Date(
          parseInt(holiday.locdate.toString().substring(0, 4)),
          parseInt(holiday.locdate.toString().substring(4, 6)) - 1,
          parseInt(holiday.locdate.toString().substring(6, 8)),
        ),
        label: holiday.dateName,
        type: "공휴일" as const,
      }));

    set((state) => ({
      schedules: [
        ...state.schedules.filter((s) => s.type !== "공휴일"),
        ...newHolidays,
      ],
    }));
  },
  clearSchedules: () => set({ schedules: [] }),
}));
