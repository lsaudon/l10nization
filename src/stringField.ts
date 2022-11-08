const quotes = ['"', "'"];

export function isString(
  text: string,
  startCharacter: number,
  endCharacter: number
): boolean {
  return (
    quotes.includes(text[startCharacter]) && quotes.includes(text[endCharacter])
  );
}

export function isNotString(
  text: string,
  startCharacter: number,
  endCharacter: number
): boolean {
  return !isString(text, startCharacter, endCharacter);
}
