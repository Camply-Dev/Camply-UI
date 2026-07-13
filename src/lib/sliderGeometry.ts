import { clamp } from "./clamp";

export function snapToStep(value: number, min: number, max: number, step: number): number {
	const stepped = Math.round((value - min) / step) * step + min;
	return clamp(stepped, min, max);
}

export function ratioToValue(clientX: number, rect: DOMRect, min: number, max: number): number {
	const ratio = (clientX - rect.left) / rect.width;
	return min + ratio * (max - min);
}

export function valueToPercent(value: number, min: number, max: number): number {
	return ((value - min) / (max - min)) * 100;
}
