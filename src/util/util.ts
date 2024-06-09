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
  let strArray = [
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
  const date = new Date(oldDate);
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const yr = date.getFullYear();
  return `${m} ${d} ${yr}`;
};
