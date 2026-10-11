import { createContext, useContext } from "react";
import type { Size } from "./types";

/**
 * Taille imposée par un `ButtonGroup` à ses boutons, `undefined` hors d'un groupe.
 * Partagée par `ButtonGroup`, `Button` et `IconButton` (règle 6).
 *
 * Pas de voie CSS : `.camply-button__btn` déclare `--_h` / `--_px` / `--_fs` sur
 * le bouton lui-même, ce qui bat toute valeur héritée du groupe sans `!important`
 * (proscrit) ; et ces `--_*` sont privées, pas un contrat inter-composants.
 */
export const ButtonGroupSizeContext = createContext<Size | undefined>(undefined);

/** Lue par `Button`, `IconButton` et par `ButtonGroup` lui-même (groupes imbriqués). */
export function useButtonGroupSize(): Size | undefined {
	return useContext(ButtonGroupSizeContext);
}
