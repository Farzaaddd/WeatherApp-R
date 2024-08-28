const calculateLocalTime = (timezoneOffset) => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC time in milliseconds
  const localTime = new Date(utc + 1000 * timezoneOffset); // Convert to local time using timezone offset
  return localTime;
};

export default calculateLocalTime;
