/**
 * Clavier d'un slider, pattern WAI-ARIA APG : flèches d'un pas, Page± d'un
 * dixième de plage (en pas entiers, un pas au moins : sinon le calage ramenait la
 * valeur sur place et la touche ne faisait rien), Home/End aux bornes. Renvoie `null` si la touche n'est pas
 * une commande de slider — l'appelant laisse alors filer l'événement.
 *
 * Fonction pure : partagée par Slider et RangeSlider, et testable sans DOM.
 */
export function nextSliderValue(
	key: string,
	current: number,
	min: number,
	max: number,
	step: number,
): number | null {
	const big = Math.max(step, Math.round((max - min) / 10 / step) * step);
	switch (key) {
		case "ArrowRight":
		case "ArrowUp":
			return current + step;
		case "ArrowLeft":
		case "ArrowDown":
			return current - step;
		case "PageUp":
			return current + big;
		case "PageDown":
			return current - big;
		case "Home":
			return min;
		case "End":
			return max;
		default:
			return null;
	}
}
