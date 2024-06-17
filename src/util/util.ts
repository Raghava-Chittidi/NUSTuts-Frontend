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

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;

  console.log(formattedDate, formattedTime);
  return { formattedDate, formattedTime };
};
