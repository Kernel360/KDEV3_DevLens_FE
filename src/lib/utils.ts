import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatDateToRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const currentYear = new Date().getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2); // get last 2 digits of year

  return date.getFullYear() === currentYear
    ? `${month}.${day}`
    : `${year}.${month}.${day}`;
}

export function formatPhoneNumber(value: string) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");

  return phoneNumber
    .replace(/^02(?=\d{4})/g, "02-")
    .replace(/^02(?=\d{7})/g, "02-")
    .replace(/^(\d{3})(?=\d{4})/g, "$1-")
    .replace(/(\d{3,4})(?=\d{4})/g, "$1-");
}

export function formatRegistrationNumber(value: string) {
  if (!value) return value;
  const numbers = value.replace(/[^\d]/g, "");

  return numbers.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, (_, p1, p2, p3) => {
    if (!p2) return p1;
    if (!p3) return `${p1}-${p2}`;
    return `${p1}-${p2}-${p3}`;
  });
}

// 상태 관련 헬퍼 함수들
export function getStatusVariant(status: string) {
  switch (status) {
    case "PREPARED":
      return "secondary";
    case "IN_PROGRESS":
      return "default";
    case "COMPLETED":
      return "success";
    case "CLOSED":
      return "outline";
    case "CANCELLED":
    case "DELETED":
      return "destructive";
    default:
      return "secondary";
  }
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "PREPARED":
      return "준비";
    case "IN_PROGRESS":
      return "진행중";
    case "COMPLETED":
      return "완료";
    case "CLOSED":
      return "종료";
    case "CANCELLED":
      return "취소";
    case "DELETED":
      return "삭제";
    default:
      return status;
  }
}
