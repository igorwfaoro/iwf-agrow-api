export class Weather {
  public airPressureAtSeaLevel: number;
  public airTemperature: number;
  public cloudAreaFraction: number;
  public relativeHumidity: number;
  public windFromDirection: number;
  public windSpeed: number;
  public fogAreaFraction: number;
  public precipitationAmount1h: number;
}

export const WeatherCreate = (props: {
  airPressureAtSeaLevel: number;
  airTemperature: number;
  cloudAreaFraction: number;
  relativeHumidity: number;
  windFromDirection: number;
  windSpeed: number;
  fogAreaFraction: number;
  precipitationAmount1h: number;
}) => {
  const weather = new Weather();
  Object.assign(weather, props);
  return weather;
};
