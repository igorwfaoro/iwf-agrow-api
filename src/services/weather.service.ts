import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExternalServiceException } from '../exceptions/external-service.exception';
import { CoordinatePoint } from '../models/common/coordinate';
import { Weather, WeatherCreate } from '../models/common/weather';
import { MESSAGES } from '../util/messages';

@Injectable()
export class WeatherService {
  public async getFromLocation({
    lat,
    lon
  }: CoordinatePoint): Promise<Weather> {
    try {
      const response = await axios.get(
        `${process.env.WEATHER_API_URL}/complete`,
        {
          headers: { 'User-Agent': 'iwf-agrow' },
          params: { lat, lon }
        }
      );

      const data = response.data.properties.timeseries[0].data;

      const {
        air_pressure_at_sea_level,
        air_temperature,
        cloud_area_fraction,
        relative_humidity,
        wind_from_direction,
        wind_speed,
        fog_area_fraction
      } = data.instant.details;

      const precipitationAmount1h =
        data.next_1_hours.details.precipitation_amount || 0;

      return WeatherCreate({
        airPressureAtSeaLevel: air_pressure_at_sea_level,
        airTemperature: air_temperature,
        cloudAreaFraction: cloud_area_fraction,
        relativeHumidity: relative_humidity,
        windFromDirection: wind_from_direction,
        windSpeed: wind_speed,
        fogAreaFraction: fog_area_fraction,
        precipitationAmount1h
      });
    } catch (error) {
      console.error(error);
      throw new ExternalServiceException(MESSAGES.WEATHER_API_ERROR);
    }
  }
}
