import { Weather } from '../common/weather';

interface WeatherItem {
  value: number;
  unit: string;
  formatted: string;
}

const UNITS = {
  airPressureAtSeaLevel: 'hPa',
  airTemperature: '°C',
  cloudAreaFraction: '%',
  relativeHumidity: '%',
  windFromDirection: '°',
  windSpeed: 'm/s',
  fogAreaFraction: '%',
  precipitationAmount1h: 'mm'
};

export class WeatherViewModel {
  public airPressureAtSeaLevel: WeatherItem;
  public airTemperature: WeatherItem;
  public cloudAreaFraction: WeatherItem;
  public relativeHumidity: WeatherItem;
  public windFromDirection: WeatherItem;
  public windSpeed: WeatherItem;
  public fogAreaFraction: WeatherItem;
  public precipitationAmount1h: WeatherItem;

  public static fromDocument(doc: Weather): WeatherViewModel {
    const viewModel = new WeatherViewModel();

    Object.keys(doc).forEach((key) => {
      viewModel[key] = {
        value: doc[key],
        unit: UNITS[key],
        formatted: `${doc[key]}${UNITS[key]}`
      };
    });

    return viewModel;
  }
}
