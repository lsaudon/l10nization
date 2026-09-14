export function sortArb(map: Map<string, unknown>): Map<string, unknown> {
	return new Map(
		[...map].sort(([keyA], [keyB]) => {
			if (keyA === "@@locale") {
				return -1;
			}
			if (keyB === "@@locale") {
				return 1;
			}

			const compared = keyA.replace("@", "").localeCompare(keyB.replace("@", ""));
			if (compared !== 0) {
				return compared;
			}
			if (keyA.startsWith("@")) {
				return 1;
			}
			if (keyB.startsWith("@")) {
				return -1;
			}
			return 0;
		}),
	);
}
