export const convertStringToBoolean = (
  value: string | boolean | undefined
): boolean | undefined => {
  return value == undefined ? undefined : `${value}` == "true" ? true : false;
};
