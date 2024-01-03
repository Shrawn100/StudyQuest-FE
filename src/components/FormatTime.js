//HELP FUNCTION
function formatTime(value) {
  if (typeof value === "number") {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const formattedTimeParts = [];

    if (hours > 0) {
      formattedTimeParts.push(`${hours}hr`);
    }

    if (minutes > 0) {
      formattedTimeParts.push(`${minutes}m`);
    }

    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedTimeParts.push(`${seconds}s`);
    }

    return formattedTimeParts.join(" ");
  } else if (value instanceof Date) {
    // Handle date formatting with custom AM/PM logic
    const hours = value.getHours();
    const minutes = value.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedTime;
  }

  return value;
}

export default formatTime;
