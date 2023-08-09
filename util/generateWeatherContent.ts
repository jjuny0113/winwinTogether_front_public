import { TodayWeather } from "@/app/chat/hooks/query/useGetTodayWeather";

export class GenerateWeatherContent {
  private constructor(private readonly todayWeather: TodayWeather) {}

  static getContent(todayWeather: TodayWeather) {
    return new GenerateWeatherContent(todayWeather).getWheatherComment();
  }

  private getWheatherComment() {
    const temperature = this.getTemperature();
    const humidity = this.getHumidity();
    const wind = this.getWind();
    return `${temperature}, ${humidity} wind:${wind} ${
      this.getRain() ? this.getRain() : ""
    }`.trim();
  }
  private getTemperature() {
    let comment = "";
    if (this.todayWeather.maxTemp - this.todayWeather.minTemp > 10) {
      comment += "There's a big difference between the highs and lows today";
    }
    if (this.todayWeather.temp > 30) {
      comment += `\n it's very hot`;
    } else if (20 < this.todayWeather.temp && this.todayWeather.temp <= 30) {
      comment += `\n it's hot`;
    } else if (10 < this.todayWeather.temp && this.todayWeather.temp <= 20) {
      comment += `\n The temperature is good`;
    } else if (0 < this.todayWeather.temp && this.todayWeather.temp <= 10) {
      comment += `\n it's cold`;
    } else if (this.todayWeather.temp <= 0) {
      comment += `\n it's very cold`;
    }

    return comment;
  }

  private getHumidity() {
    let comment = "";
    if (this.todayWeather.humidity > 80) {
      comment += "It's really humid and very uncomfortable";
    } else if (
      60 < this.todayWeather.humidity &&
      this.todayWeather.humidity <= 80
    ) {
      comment += "It's humid little uncomfortable";
    } else if (
      40 < this.todayWeather.humidity &&
      this.todayWeather.humidity <= 60
    ) {
      comment += "The humidity is good";
    } else if (
      20 < this.todayWeather.humidity &&
      this.todayWeather.humidity <= 40
    ) {
      comment += "It's a little dry";
    } else if (this.todayWeather.humidity <= 20) {
      comment += "It's very dry";
    }
    return comment;
  }

  private getWind() {
    let comment = "";
    const windSpeed = Number(
      this.todayWeather.windSpeed?.replace("meter/sec", "").trim()
    );
    if (windSpeed < 1) {
      comment += "Calm";
    } else if (1 <= windSpeed && windSpeed <= 5) {
      comment += "Light Air";
    } else if (6 <= windSpeed && windSpeed <= 11) {
      comment += "Light Breeze";
    } else if (12 <= windSpeed && windSpeed <= 19) {
      comment += "Gentle Breeze";
    } else if (20 <= windSpeed && windSpeed <= 28) {
      comment += "Moderate Breeze";
    } else if (29 <= windSpeed && windSpeed <= 38) {
      comment += "Fresh Breeze";
    } else if (39 <= windSpeed && windSpeed <= 49) {
      comment += "Strong Breeze";
    } else if (50 <= windSpeed && windSpeed <= 61) {
      comment += "Near Gale";
    } else if (62 <= windSpeed && windSpeed <= 74) {
      comment += "Gale";
    } else if (75 <= windSpeed && windSpeed <= 88) {
      comment += "Strong Gale";
    } else if (89 <= windSpeed && windSpeed <= 102) {
      comment += "Storm";
    } else if (windSpeed > 102) {
      comment += "Violent Storm";
    }
    return comment;
  }

  private getRain() {
    if (!this.todayWeather.rain) return;
    let comment = "";
    const rainfall = Number(
      (this.todayWeather.rain.match(/\d/) ?? [])[0] ?? ""
    );
    if (0.1 <= rainfall && rainfall <= 2.5) {
      comment += "light";
    } else if (2.6 <= rainfall && rainfall <= 7.6) {
      comment += "Moderate";
    } else if (7.6 <= rainfall && rainfall <= 50) {
      comment += "Heavy";
    } else if (rainfall > 50) {
      comment += "Very heavy ";
    }
    comment += " rain";
    return comment;
  }
}
