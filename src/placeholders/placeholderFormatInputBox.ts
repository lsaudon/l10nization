import { showInputBox } from '../inputBox/showInputBox';

export async function showPlaceholderFormatInputBox(
  variable: string
): Promise<string> {
  const placeholderFormat = await showInputBox(
    `Enter the format for the variable ${variable}`,
    ''
  );
  return placeholderFormat;
}
