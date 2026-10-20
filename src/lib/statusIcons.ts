import { AlertCircle, AlertTriangle, CheckCircle, Info } from "./icons";

/** Icône sémantique par ton de statut, partagée par Alert, Banner et Toast. Interne :
 *  `@camply/ui/icons` n'exporte que des icônes. Les composants qui ont des tons
 *  supplémentaires (accent, default) ajoutent leur propre alias en local :
 *  `{ ...STATUS_ICONS, accent: Info }`. */
export const STATUS_ICONS = {
	info: Info,
	success: CheckCircle,
	warn: AlertTriangle,
	danger: AlertCircle,
} as const;
