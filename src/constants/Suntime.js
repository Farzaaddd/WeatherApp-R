import SunCalc from "suncalc";

const sunTime = (sys) => {
  // Sunset & Sunrize
  // Sunrise
  // Assuming sunrise is the Unix timestamp representing sunrise time
  const sunriseTimestamp = sys.sunrise;

  // Convert Unix timestamp to milliseconds
  const sunriseMilliseconds = sunriseTimestamp * 1000;

  // Create a Date object from the sunrise milliseconds
  const sunriseDate = new Date(sunriseMilliseconds);

  // Get the timezone offset of the local time in minutes
  const timezoneOffsetMinutes = sunriseDate.getTimezoneOffset();

  // Calculate the timezone offset in milliseconds
  const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000;

  // Subtract the timezone offset and 4 hours from the sunrise time
  const adjustedSunriseMilliseconds =
    sunriseMilliseconds - timezoneOffsetMilliseconds - 4 * 60 * 60 * 1000;

  // Create a Date object representing the adjusted sunrise time
  const adjustedSunriseDate = new Date(adjustedSunriseMilliseconds);

  // Get the hour and minute components of the adjusted sunrise time
  const adjustedSunriseMinute = adjustedSunriseDate.getMinutes();

  // Sunset
  // Assuming sunset is the Unix timestamp representing sunset time
  const sunsetTimestamp = sys.sunset;

  // Convert Unix timestamp to milliseconds
  const sunsetMilliseconds = sunsetTimestamp * 1000;

  // Create a Date object from the sunset milliseconds
  const sunsetDate = new Date(sunsetMilliseconds);

  // Get the hour component of the sunset time
  // const sunsetHour = sunsetDate.getHours();

  // Get the minute component of the sunset time
  const sunsetMinute = sunsetDate.getMinutes();
  let sunriseX;
  let sunsetX;

  if (sys.country === "US") {
    const adjustedSunriseHour = adjustedSunriseDate.getHours() - 8;
    // Get the hour component of the sunrise time
    sunriseX = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

    // Get the hour component of the sunset time
    const sunsetHour = sunsetDate.getHours() + 4;
    sunsetX = `${sunsetHour}:${sunsetMinute}PM`;
  } else if (sys.country === "GB") {
    // Get the hour component of the sunrise time
    const adjustedSunriseHour = adjustedSunriseDate.getHours() - 3;
    sunriseX = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

    // Get the hour component of the sunset time
    const sunsetHour = sunsetDate.getHours() - 15;
    sunsetX = `${sunsetHour}:${sunsetMinute}PM`;
  } else if (sys.country === "IR") {
    // Get the hour component of the sunrise time
    const adjustedSunriseHour = adjustedSunriseDate.getHours() - 1;
    sunriseX = `${adjustedSunriseHour}:${adjustedSunriseMinute + 30}AM`;

    // Get the hour component of the sunset time
    const sunsetHour = sunsetDate.getHours();
    sunsetX = `${sunsetHour}:${sunsetMinute}PM`;
  } else if (sys.country === "CA") {
    // Get the hour component of the sunrise time
    const adjustedSunriseHour = adjustedSunriseDate.getHours() - 8;
    sunriseX = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

    // Get the hour component of the sunset time
    const sunsetHour = sunsetDate.getHours() + 4;
    sunsetX = `${sunsetHour}:${sunsetMinute}PM`;
  } else {
    // Get the hour component of the sunrise time
    const adjustedSunriseHour = adjustedSunriseDate.getHours();
    sunriseX = `${adjustedSunriseHour}:${adjustedSunriseMinute}AM`;

    // Get the hour component of the sunset time
    const sunsetHour = sunsetDate.getHours() - 12;
    sunsetX = `${sunsetHour}:${sunsetMinute}PM`;
  }

  return { sunriseX, sunsetX };
};

const cities = [
  { name: "Dubai", latitude: 25.276987, longitude: 55.296249 },
  { name: "Tehran", latitude: 35.6892, longitude: 51.389 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Windsor", latitude: 42.3149, longitude: -83.0364 },
];

export { sunTime, cities };
