export class CoordinatePoint {
  public lat: number;
  public lon: number;
}

export const CoordinatePointCreate = (props: {
  lat: number;
  lon: number;
}): CoordinatePoint => {
  const coordinatePoint = new CoordinatePoint();
  Object.assign(coordinatePoint, props);
  return coordinatePoint;
};
