const PARENT_DIRECTORY = "..";

export const resolvePath = (inputPath: string): string => {
	const segments = inputPath.replaceAll("\\", "/").split("/");
	const resolved: string[] = [];

	for (const segment of segments) {
		if (segment === "" || segment === ".") {
			continue;
		}

		if (segment === PARENT_DIRECTORY) {
			if (resolved.length > 0 && resolved[resolved.length - 1] !== "**") {
				resolved.pop();
			}
			continue;
		}

		resolved.push(segment);
	}

	return resolved.join("/");
};
