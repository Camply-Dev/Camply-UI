import type { ComponentType } from "react";
import { Book, Home, type IconProps, Palette, Shapes } from "../../src/lib/icons";
import { GuideView } from "./components/GuideView";
import { HomeView } from "./components/HomeView";
import { IconsView } from "./components/IconsView";
import { TokensView } from "./components/TokensView";
import { CSS, GUIDE, HOME, ICONS } from "./showcase-data";

interface Page {
	id: string;
	/** Libellé du lien latéral, du fil d'Ariane et de la palette. */
	label: string;
	icon: ComponentType<IconProps>;
	View: ComponentType<{ onNavigate: (id: string) => void }>;
}

/** Les pages fixes du site, hors pages de composant : une source pour l'App et la barre latérale. */
export const PAGES: Page[] = [
	{ id: HOME, label: "Accueil", icon: Home, View: HomeView },
	{ id: GUIDE, label: "Guide d'utilisation", icon: Book, View: GuideView },
	{ id: ICONS, label: "Icônes", icon: Shapes, View: IconsView },
	{ id: CSS, label: "CSS par défaut", icon: Palette, View: TokensView },
];
