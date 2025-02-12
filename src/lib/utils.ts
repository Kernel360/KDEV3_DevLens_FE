import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

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
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, "");

  // 11자리로 제한
  const limitedNumbers = numbers.slice(0, 11);

  // 포맷팅
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  }
  if (limitedNumbers.length <= 7) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  }
  return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7, 11)}`;
}

export function handlePhoneNumberChange(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
) {
  onChange(formatPhoneNumber(e.target.value));
}

// 회사 사업자등록번호
export function formatRegistrationNumber(value: string) {
  if (!value) return value;
  const numbers = value.replace(/[^\d]/g, "");

  return numbers.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, (_, p1, p2, p3) => {
    if (!p2) return p1;
    if (!p3) return `${p1}-${p2}`;
    return `${p1}-${p2}-${p3}`;
  });
}

export function handleRegistrationNumberChange(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
) {
  onChange(formatRegistrationNumber(e.target.value));
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

export function formatDateWithTime(dateStr: string) {
  return format(parseISO(dateStr), "yyyy-M-d HH:mm:ss", { locale: ko });
}
