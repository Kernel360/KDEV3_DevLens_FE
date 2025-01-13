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
