import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export function formatJalaliDate(timestamp: number) {
  return dayjs(timestamp)
    .calendar("jalali")
    .locale("fa")
    .format("YYYY/MM/DD HH:mm");
}
