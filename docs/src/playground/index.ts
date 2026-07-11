// Registre des playgrounds : id de composant → config déclarative.
import { DONNEES } from "./donnees";
import type { PlaygroundConfig } from "./engine";
import { FEEDBACK } from "./feedback";
import { FORMULAIRES } from "./formulaires";
import { NAVIGATION } from "./navigation";
import { PRIMITIFS } from "./primitifs";
import { SURFACES } from "./surfaces";

export { PlaygroundView } from "./engine";

export const PLAYGROUNDS: Record<string, PlaygroundConfig> = {
	...PRIMITIFS,
	...FORMULAIRES,
	...SURFACES,
	...NAVIGATION,
	...FEEDBACK,
	...DONNEES,
};
