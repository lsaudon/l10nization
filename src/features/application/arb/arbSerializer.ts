import { buildUpdatedArbContent } from "../../../core/arb/buildUpdatedArbContent";
import type { L10nObject } from "../../../core/arb/l10nObject";

export function toJson(text: string, l10nKey: L10nObject | null, sorted: boolean): string {
	return buildUpdatedArbContent(text, l10nKey, sorted);
}
