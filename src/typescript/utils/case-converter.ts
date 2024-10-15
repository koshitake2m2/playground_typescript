type StringKeyObject = {
  [key in string]: any;
};

const isStringKeyObject = (arg: any): arg is StringKeyObject =>
  arg !== null &&
  typeof arg === "object" &&
  Object.keys(arg).every((key) => typeof key === "string");

// e.g. `aa_bb` -> `aaBb`
export const toLowerCamelFromSnake = (snake: string): string => {
  return snake.replace(/_./g, (str) => str.charAt(1).toUpperCase());
};

// e.g. `aaBb` -> `aa_bb`
export const toSnakeFromLowerCamel = (camel: string): string => {
  return camel.replace(/([A-Z])/g, (str) => "_" + str.charAt(0).toLowerCase());
};

export const convertObjectKeyToLowerCamelFromSnake = (obj: any): any =>
  Array.isArray(obj)
    ? obj.map(convertObjectKeyToLowerCamelFromSnake)
    : isStringKeyObject(obj)
    ? Object.keys(obj).reduce((acc: StringKeyObject, key) => {
        acc[toLowerCamelFromSnake(key)] = convertObjectKeyToLowerCamelFromSnake(
          obj[key]
        );
        return acc;
      }, {})
    : obj;

export const convertObjectKeyToSnakeFromLowerCamel = (obj: any): any =>
  Array.isArray(obj)
    ? obj.map(convertObjectKeyToSnakeFromLowerCamel)
    : isStringKeyObject(obj)
    ? Object.keys(obj).reduce((acc: StringKeyObject, key) => {
        acc[toSnakeFromLowerCamel(key)] = convertObjectKeyToSnakeFromLowerCamel(
          obj[key]
        );
        return acc;
      }, {})
    : obj;
