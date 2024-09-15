import backgrounds from "../constants/backgrounds";
import icons from "../constants/icons";

const backgroundOpt = (weather, checkDay) => {
  let background;
  if (window.innerWidth >= 0 && checkDay === "night") {
    switch (weather) {
      case "Clear":
        background = backgrounds[0].path;
        break;

      case "Haze":
        background = backgrounds[0].path;
        break;

      case "Rain":
        background = backgrounds[5].path;
        break;
      case "Clouds":
        background = backgrounds[3].path;
        break;

      case "Storm":
        background = backgrounds[8].path;
        break;

      case "Storm":
        background = backgrounds[8].path;
        break;

      case "Mist":
        background = backgrounds[9].path;
        break;

      case "Fog":
        background = backgrounds[12].path;
        break;

      case "Smoke":
        background = backgrounds[13].path;
        break;

      case "Dust":
        background = backgrounds[8].path;
        break;

      case "Sunny":
        background = backgrounds[10].path;
        break;

      case "Snow":
        background = backgrounds[6].path;
        background.style.color = "#000";
        break;

      default:
        background = backgrounds[10].path;
        break;
    }
    return background;
  } else if (window.innerWidth >= 0 && checkDay === "day") {
    switch (weather) {
      case "Clear":
        background = backgrounds[1].path;
        break;

      case "Haze":
        background = backgrounds[1].path;
        break;

      case "Rain":
        background = backgrounds[4].path;
        break;

      case "Clouds":
        background = backgrounds[2].path;
        break;

      case "Storm":
        background = backgrounds[7].path;
        break;

      case "Tornado":
        background = backgrounds[7].path;
        break;

      case "Mist":
        background = backgrounds[9].path;
        break;

      case "Fog":
        background = backgrounds[11].path;
        break;

      case "Smoke":
        background = backgrounds[13].path;
        break;

      case "Dust":
        background = backgrounds[9].path;
        break;

      case "Sunny":
        background = backgrounds[10].path;
        break;

      case "Snow":
        background = backgrounds[6].path;
        break;

      default:
        background = backgrounds[10].path;
        break;
    }
    return background;
  }
};

const wIcon = (weather) => {
  let icon;
  switch (weather) {
    case "01d":
      // icon = icons[3].path;
      icon = `url(https://openweathermap.org/img/wn/01d.png)`;
      break;

    case "01n":
      // icon = icons[4].path;
      icon = `url(https://openweathermap.org/img/wn/01n.png)`;
      break;

    case "02d":
      // icon = icons[5].path;
      icon = `url(https://openweathermap.org/img/wn/02d.png)`;
      break;
    case "02n":
      // icon = icons[6].path;
      icon = `url(https://openweathermap.org/img/wn/02n.png)`;
      break;

    case "03d":
      // icon = icons[7].path;
      icon = `url(https://openweathermap.org/img/wn/03d.png)`;
      break;

    case "03n":
      // icon = icons[8].path;
      icon = `url(https://openweathermap.org/img/wn/03n.png)`;
      break;

    case "04d":
      // icon = icons[9].path;
      icon = `url(https://openweathermap.org/img/wn/04d.png)`;
      break;

    case "04n":
      // icon = icons[10].path;
      icon = `url(https://openweathermap.org/img/wn/04n.png)`;
      break;

    case "09d":
      // icon = icons[11].path;
      icon = `url(https://openweathermap.org/img/wn/09d.png)`;
      break;

    case "09n":
      // icon = icons[12].path;
      icon = `url(https://openweathermap.org/img/wn/09n.png)`;
      break;

    case "10d":
      // icon = icons[13].path;
      icon = `url(https://openweathermap.org/img/wn/10d.png)`;
      break;

    case "10n":
      // icon = icons[14].path;
      icon = `url(https://openweathermap.org/img/wn/10n.png)`;
      break;

    case "11d":
      // icon = icons[15].path;
      icon = `url(https://openweathermap.org/img/wn/11d.png)`;
      break;

    case "11n":
      // icon = icons[16].path;
      icon = `url(https://openweathermap.org/img/wn/11n.png)`;
      break;

    case "13d":
      // icon = icons[17].path;
      icon = `url(https://openweathermap.org/img/wn/13d.png)`;
      break;

    case "13n":
      // icon = icons[18].path;
      icon = `url(https://openweathermap.org/img/wn/13n.png)`;
      break;

    case "50d":
      // icon = icons[19].path;
      icon = `url(https://openweathermap.org/img/wn/50d.png)`;
      break;

    case "50n":
      // icon = icons[20].path;
      icon = `url(https://openweathermap.org/img/wn/50n.png)`;
      break;

    default:
      // icon = icons[5].path;
      icon = `url(https://openweathermap.org/img/wn/02d.png)`;
      break;
  }

  return icon;
};

export { backgroundOpt, wIcon };
