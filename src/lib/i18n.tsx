import { createContext, type ReactNode, useContext, useMemo } from "react";

/** Tous les textes que la lib rend elle-même (aria-labels, boutons internes…). */
export interface CamplyLabels {
	close: string;
	clear: string;
	previous: string;
	next: string;
	increase: string;
	decrease: string;
	pagination: string;
	previousPage: string;
	nextPage: string;
	breadcrumb: string;
	carousel: string;
	notifications: string;
	steps: string;
	calendar: string;
	openCalendar: string;
	chooseYear: string;
	colorPicker: string;
	uploading: string;
	remove: string;
	play: string;
	pause: string;
	search: string;
	noResults: string;
}

const FR: CamplyLabels = {
	close: "Fermer",
	clear: "Effacer",
	previous: "Précédent",
	next: "Suivant",
	increase: "Augmenter",
	decrease: "Diminuer",
	pagination: "Pagination",
	previousPage: "Page précédente",
	nextPage: "Page suivante",
	breadcrumb: "Fil d'Ariane",
	carousel: "Carrousel",
	notifications: "Notifications",
	steps: "Progression par étapes",
	calendar: "Calendrier",
	openCalendar: "Ouvrir le calendrier",
	chooseYear: "Choisir l'année",
	colorPicker: "Sélecteur de couleur",
	uploading: "Envoi…",
	remove: "Retirer",
	play: "Lecture",
	pause: "Pause",
	search: "Rechercher",
	noResults: "Aucun résultat",
};

interface CamplyContextValue {
	labels: CamplyLabels;
	/** Locale Intl (dates, tailles de fichier…). */
	locale: string;
}

const CamplyContext = createContext<CamplyContextValue>({ labels: FR, locale: "fr-FR" });

export interface CamplyProviderProps {
	/** Surcharge partielle des textes — le reste retombe sur le français. */
	labels?: Partial<CamplyLabels>;
	/** Locale Intl utilisée par DatePicker & co (défaut "fr-FR"). */
	locale?: string;
	children: ReactNode;
}

/**
 * Fournit textes et locale à toute la librairie. Sans lui, tout retombe sur les
 * valeurs françaises par défaut — le composant reste donc utilisable seul.
 */
export function CamplyProvider({ labels, locale = "fr-FR", children }: CamplyProviderProps) {
	const value = useMemo(() => ({ labels: { ...FR, ...labels }, locale }), [labels, locale]);
	return <CamplyContext.Provider value={value}>{children}</CamplyContext.Provider>;
}

/** Textes de la lib (surchargés par CamplyProvider si présent). */
export function useLabels(): CamplyLabels {
	return useContext(CamplyContext).labels;
}

/** Locale Intl de la lib. */
export function useLocale(): string {
	return useContext(CamplyContext).locale;
}
