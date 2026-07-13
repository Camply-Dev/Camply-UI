import type { ComponentType } from "react";
import {
	AlignLeft,
	ArrowRight,
	Bell,
	Book,
	Check,
	ChevronRight,
	Clock,
	Compass,
	Copy,
	Database,
	Download,
	Home,
	type IconProps,
	Layers,
	LayoutGrid,
	Palette,
	Plus,
	RotateCcw,
	Search,
	Shapes,
} from "../../src/lib/icons";

const REGISTRY: Record<string, ComponentType<IconProps>> = {
	home: Home,
	book: Book,
	components: LayoutGrid,
	tokens: Palette,
	arrow: ArrowRight,
	chevron: ChevronRight,
	copy: Copy,
	check: Check,
	plus: Plus,
	search: Search,
	download: Download,
	reset: RotateCcw,
	clock: Clock,
	form: AlignLeft,
	surface: Layers,
	nav: Compass,
	feedback: Bell,
	data: Database,
	shapes: Shapes,
};

type Props = { name: string; size?: number } & Omit<IconProps, "name" | "size">;

export function Icon({ name, size = 16, ...rest }: Props) {
	const Cmp = REGISTRY[name];
	return Cmp ? <Cmp size={size} {...rest} /> : null;
}
