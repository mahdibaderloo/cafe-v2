import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export function formatJalaliDate(timestamp: number | string) {
  return dayjs(timestamp)
    .calendar("jalali")
    .locale("fa")
    .format("YYYY/MM/DD - HH:mm");
}

export function formatJalaliDateOnly(timestamp: number | string) {
  return dayjs(timestamp).calendar("jalali").locale("fa").format("YYYY/MM/DD");
}

export function formatJalaliTimeOnly(timestamp: number | string) {
  return dayjs(timestamp).calendar("jalali").locale("fa").format("HH:mm");
}

export function getCurrentJalaliYear(): number {
  const jalaliYear = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
  }).format(new Date());

  return Number(jalaliYear.replace(/[^\d]/g, ""));
}
