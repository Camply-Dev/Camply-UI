import { useState } from "react";

/** État ouvert/fermé minimal, partagé par les aperçus d'overlay de la vitrine. */
export function useDisclosure() {
	const [open, setOpen] = useState(false);
	return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false) };
}
