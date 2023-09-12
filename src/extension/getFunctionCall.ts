export function getFunctionCall(appLocalizationsVariable: string, key: string, variables: string[]): string {
  const functionCall = `${appLocalizationsVariable}.${key}`;
  if (variables.length === 0) {
    return functionCall;
  }
  const variablesString = variables.map((v, i) => (i === variables.length - 1 ? `${v}` : `${v}, `)).reduce((a, p) => a + p);
  return `${functionCall}(${variablesString})`;
}
