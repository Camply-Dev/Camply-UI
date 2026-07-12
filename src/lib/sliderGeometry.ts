import { clamp } from "./clamp";

/** Cale une valeur brute sur le pas le plus proche, puis la borne à [min, max].
 *  Partagé par Slider et RangeSlider. */
export function snapToStep(value: number, min: number, max: number, step: number): number {
	const stepped = Math.round((value - min) / step) * step + min;
	return clamp(stepped, min, max);
}

/** Convertit une position horizontale de pointeur en valeur brute (non calée) sur
 *  l'échelle [min, max], d'après le rectangle de la piste. L'appelant conserve sa
 *  propre garde de piste absente et son propre calage. */
export function ratioToValue(clientX: number, rect: DOMRect, min: number, max: number): number {
	const ratio = (clientX - rect.left) / rect.width;
	return min + ratio * (max - min);
}
