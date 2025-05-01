/**
 * Gets the current time and adds one hour, returning the result in HH:MM:SS AM/PM format.
 *
 * @returns {string} The formatted time string (e.g., "01:23:45 PM").
 */
function getCurrentHourPlusOne() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add one hour
  hours = (hours + 1) % 13; // Modulo 13 handles the 12 -> 1 case.
  if (hours === 0) {
    hours = 1;
  }

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

export { getCurrentHourPlusOne };
