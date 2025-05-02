function getCurrentTime() {
  return new Date();
}

function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
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

function addHoursToCurrentTime(hours) {
  const now = getCurrentTime();
  const later = addHours(now, hours);
  return formatTime(later);
}

export { addHoursToCurrentTime };
