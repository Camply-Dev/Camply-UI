import { createContext, type ReactNode, useContext, useMemo } from "react";

/**
 * Tous les textes que la lib rend elle-même (aria-labels, boutons internes…),
 * résolus en `prop ?? labels.clé` (règle 5).
 */
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

	/** Snippet : bouton de copie, avant et après la copie. */
	copy: string;
	copied: string;
	/** Spoiler : déplier / replier. */
	showMore: string;
	showLess: string;
	/** Placeholders des champs à choix (Select, MultiSelect, TagInput, DatePicker). */
	selectPlaceholder: string;
	addTag: string;
	datePlaceholder: string;
	colorPlaceholder: string;
	/** DatePicker : bouton « aujourd'hui » et format de saisie attendu. */
	today: string;
	dateFormatHint: string;
	/** Carousel : `aria-roledescription` et nom d'une diapositive (index 0-based). */
	carouselRoleDescription: string;
	slideRoleDescription: string;
	slide: (index: number) => string;
	/** CommandPalette : nom accessible, placeholder et état vide. */
	commandPalette: string;
	commandPalettePlaceholder: string;
	noCommands: string;
	/** ColorPicker : nom complet de chacune des trois surfaces de réglage. */
	colorPickerSaturation: string;
	colorPickerHue: string;
	colorPickerAlpha: string;
	/** Table : noms accessibles des cases de sélection. */
	selectAll: string;
	selectRow: (index: number) => string;
	/** RangeSlider : suffixes des deux poignées. */
	minimum: string;
	maximum: string;
	/** FileUpload : zone de dépôt et messages de rejet. */
	dropFiles: string;
	browseFiles: string;
	fileTypeRejected: (name: string) => string;
	fileTooLarge: (name: string, max: string) => string;
	/** Unités de taille de fichier, de l'octet au téraoctet. */
	fileSizeUnits: [string, string, string, string, string];
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
	search: "Rechercher…",
	noResults: "Aucun résultat",

	copy: "Copier",
	copied: "Copié",
	showMore: "Voir plus",
	showLess: "Voir moins",
	selectPlaceholder: "Sélectionner…",
	addTag: "Ajouter…",
	datePlaceholder: "Choisir une date",
	colorPlaceholder: "Choisir une couleur",
	today: "Aujourd'hui",
	dateFormatHint: "JJ/MM/AAAA",
	carouselRoleDescription: "carrousel",
	slideRoleDescription: "diapositive",
	slide: (index) => `Diapositive ${index + 1}`,
	commandPalette: "Palette de commandes",
	commandPalettePlaceholder: "Rechercher une commande…",
	noCommands: "Aucune commande",
	colorPickerSaturation: "Sélecteur de couleur — saturation et luminosité",
	colorPickerHue: "Sélecteur de couleur — teinte",
	colorPickerAlpha: "Sélecteur de couleur — opacité",
	selectAll: "Tout sélectionner",
	selectRow: (index) => `Sélectionner la ligne ${index + 1}`,
	minimum: "minimum",
	maximum: "maximum",
	dropFiles: "Déposer des fichiers ou",
	browseFiles: "parcourir",
	fileTypeRejected: (name) => `Type non accepté : ${name}`,
	fileTooLarge: (name, max) => `${name} dépasse ${max}`,
	fileSizeUnits: ["o", "Ko", "Mo", "Go", "To"],
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
