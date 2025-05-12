function getCurrentTime() {
  return new Date();
}

function addMinutes(date, minutes) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}

function convertTo12HourFormat(hours24) {
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  return { hours12, ampm };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatTime(date) {
  const { hours12, ampm } = convertTo12HourFormat(date.getHours());
  const minutes = pad(date.getMinutes());
  const hours = pad(hours12);
  return `${hours}:${minutes} ${ampm}`;
}

function addMinutesToCurrentTime(minutes) {
  const now = getCurrentTime();
  const later = addMinutes(now, minutes);
  return formatTime(later);
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function formatDateToMDY(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function addDaysToGivenDate(numberOfDays = 1, date = new Date()) {
  const futureDate = addDays(date, numberOfDays);
  return formatDateToMDY(futureDate);
}

export { addMinutesToCurrentTime, addDaysToGivenDate, formatDateToMDY };
