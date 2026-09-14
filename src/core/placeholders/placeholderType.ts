export enum PlaceholderType {
	String = "String",
	Int = "int",
	Num = "num",
	Double = "double",
	DateTime = "DateTime",
	Plural = "plural",
}

export function getPlaceholderTypes() {
	return Object.keys(PlaceholderType).filter((p) => Number.isNaN(Number(p)));
}

export function getPlaceholderType(placeholderTypeValue: string): PlaceholderType | undefined {
	return Object.values(PlaceholderType).find((p) => p.toString() === placeholderTypeValue);
}
