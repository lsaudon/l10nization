import { empty } from './constants';

export const camelize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/u, empty)
    .split(/[^a-zA-Z0-9]/u)
    .map((element, index) => (index === 0 ? element.toLowerCase() : element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()))
    .join(empty);
