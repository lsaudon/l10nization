import { empty } from './constants';

export function camelize(value: string): string {
  const valueSplitted = value
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/u, empty)
    .split(/[^a-zA-Z0-9]/u);
  let result = empty;
  for (let index = 0; index < valueSplitted.length; index += 1) {
    let element = valueSplitted[index];
    element = element.toLowerCase();
    if (index !== 0) {
      element = element.charAt(0).toUpperCase() + element.substring(1);
    }
    result += element;
  }
  return result;
}
