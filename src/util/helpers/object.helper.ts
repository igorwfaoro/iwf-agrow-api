export const toPlain = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
