import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, getYear, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ALLOWED_FILE_TYPES } from "./constants/etc";
import { ALLOWED_IMAGE_TYPES } from "./constants/etc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

  // 02 지역번호 처리
  if (limitedNumbers.startsWith("02")) {
    if (limitedNumbers.length <= 2) return limitedNumbers;
    if (limitedNumbers.length <= 5) {
      return `${limitedNumbers.slice(0, 2)}-${limitedNumbers.slice(2)}`;
    }
    // 10자리로 제한 (02-XXXX-XXXX 또는 02-XXX-XXXX)
    const truncatedNumbers = limitedNumbers.slice(0, 10);

    // 길이에 따라 다른 포맷팅 적용
    if (truncatedNumbers.length <= 9) {
      // 02-XXX-XXXX 형식 (9자리 이하)
      return `${truncatedNumbers.slice(0, 2)}-${truncatedNumbers.slice(2, 5)}-${truncatedNumbers.slice(5)}`;
    } else {
      // 02-XXXX-XXXX 형식 (10자리)
      return `${truncatedNumbers.slice(0, 2)}-${truncatedNumbers.slice(2, 6)}-${truncatedNumbers.slice(6)}`;
    }
  }

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
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, "");

  // 10자리로 제한
  const limitedNumbers = numbers.slice(0, 10);

  // 포맷팅
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  }
  if (limitedNumbers.length <= 5) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  }
  return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 5)}-${limitedNumbers.slice(5)}`;
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
      return null;
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
      return null;
  }
}

export function formatDateWithTime(dateStr: string) {
  return format(parseISO(dateStr), "yyyy-M-d HH:mm:ss", { locale: ko });
}

export function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)}${units[unitIndex]}`;
}

export function getPriorityVariant(priority: string) {
  switch (priority) {
    case "HIGH":
      return "destructive";
    case "MEDIUM":
      return "default";
    case "LOW":
      return "secondary";
    case "DEFAULT":
    default:
      return null;
  }
}

export function getPriorityLabel(priority: string) {
  switch (priority) {
    case "HIGH":
      return "높음";
    case "MEDIUM":
      return "중간";
    case "LOW":
      return "낮음";
    case "DEFAULT":
    default:
      return null;
  }
}

export function isValidFileType(
  filename: string,
  fileType: "image" | "file" = "file",
): boolean {
  const extension = filename.toLowerCase().slice(filename.lastIndexOf("."));
  const allowedTypes =
    fileType === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_FILE_TYPES;
  return allowedTypes.includes(extension);
}

export function getChecklistStatusVariant(status: string) {
  switch (status) {
    case "APPLICATION_WAITING":
      return {
        variant: "secondary" as const,
        label: "신청 대기중",
      };
    case "APPROVE_WAITING":
      return {
        variant: "warning" as const,
        label: "승인 대기중",
      };
    case "APPROVED":
      return {
        variant: "success" as const,
        label: "승인됨",
      };
    case "REJECTED":
      return {
        variant: "destructive" as const,
        label: "반려됨",
      };
    default:
      return {
        variant: "secondary" as const,
        label: "상태 없음",
      };
  }
}

export const formatDate = (date: Date | string) => {
  const today = new Date();
  const isSameYear = getYear(date) === getYear(today);

  return isSameYear ? format(date, "M.d") : `${format(date, "yyyy.M.d")}`;
};

export function getProjectStatusVariant(status: string) {
  switch (status) {
    case "PREPARED":
      return "warning" as const;
    case "IN_PROGRESS":
      return "default" as const;
    case "COMPLETED":
      return "success" as const;
    case "CLOSED":
      return "secondary" as const;
    case "CANCELLED":
      return "destructive" as const;
    case "DELETED":
      return "outline" as const;
    default:
      return "outline" as const;
  }
}

export function getScheduleTypeVariant(type: string) {
  switch (type) {
    case "시작":
      return "success" as const;
    case "마감":
      return "default" as const;
    case "기타":
      return "secondary" as const;
    case "공휴일":
      return "destructiveOutline" as const;
    default:
      return "outline" as const;
  }
}
