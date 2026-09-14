export function getProjectNameFromPath(pathname: string): string {
	const pathBeforeLib = pathname.split("/lib/")[0];
	if (typeof pathBeforeLib === "undefined" || pathBeforeLib.length === 0) {
		return "";
	}
	const pathParts = pathBeforeLib.split("/");
	return pathParts.at(-1) ?? "";
}
