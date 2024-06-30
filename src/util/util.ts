import { CalendarDateTime } from "@internationalized/date";

export const monthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const strToColour = (str: string) => {
  let hash = 0;
  const arr = str.split("");
  for (const s of arr) {
    hash = s.charCodeAt(0) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 100%, 70%)`;
};

export const getCurrentSem = () => {
  const month = new Date().getMonth();
  return month <= 7 ? 2 : 1;
};

export const getCurrentAY = () => {
  const year = new Date().getFullYear();
  const sem = getCurrentSem();
  return sem == 1 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

export const formatDate = (oldDate: string) => {
  const date = new Date(oldDate);
  const d = date.getDate();
  const m = monthsArr[date.getMonth()];
  const yr = date.getFullYear();
  return `${m} ${d} ${yr}`;
};

export const getCurrentDateTime = () => {
  const now = new Date();

  const padZero = (num: number): string => num.toString().padStart(2, '0');

  const day = padZero(now.getDate());
  const month = padZero(now.getMonth() + 1); // Months are zero-based
  const year = now.getFullYear();

  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  console.log(formattedDate, formattedTime);
  return { formattedDate, formattedTime };
};

export const getCurrentDateValue = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are zero-based
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const millisecond = now.getMilliseconds();

  return new CalendarDateTime(year, month, day, hour, minute, second, millisecond);
};

// Converts the booked date and time into a Date object
// date is in the format 'DD-MM-YYYY'
// time is in the format 'HH:MM'
export const parseCustomDateString = (date: string, time: string) => {
  // Split the date component into day, month, and year
  const [year, month, day] = date.split('-');

  // Rearrange to format 'YYYY-MM-DDTHH:MM:SS'
  const formattedDateString = `${year}-${month}-${day}T${time}:00`;

  // Create and return the Date object
  return new Date(formattedDateString);
};

export const isCurrentDateTimePastGivenDateTime = (date: string, time: string) => {
  const { formattedDate, formattedTime } = getCurrentDateTime();
  const currentDate = parseCustomDateString(formattedDate, formattedTime);
  const givenDate = parseCustomDateString(date, time);
  return currentDate > givenDate;
}

// Utility function to convert expiredTime to remaining seconds
export function getRemainingSeconds(expiredTime: string): number {
  const targetDate = new Date(expiredTime).getTime();
  const currentTime = new Date().getTime();
  const difference = targetDate - currentTime;
  return Math.max(Math.floor(difference / 1000), 0);
}

