# @camply/ui

Bibliothèque de **58 composants React** pour Camply — thème sombre premium, accent cyan, customisable de A à Z via design tokens. ESM only, tree-shakable, zéro dépendance runtime.

## Utilisation

```bash
bun add @camply/ui   # ou npm i @camply/ui
```

Importer les design tokens **une seule fois** (entrée de l'app) :

```tsx
import "@camply/ui/styles.css";
```

Puis utiliser les composants :

```tsx
import { Button, Badge } from "@camply/ui";

export function Example() {
	return (
		<>
			<Button variant="primary">Cliquer</Button>
			<Badge tone="accent" dot>Actif</Badge>
		</>
	);
}
```

Le CSS de chaque composant est chargé automatiquement par le bundler (side-effects) : **seul le CSS des composants réellement importés** est inclus dans le bundle final. Pas besoin d'importer manuellement `DatePicker.css` ou `ColorPicker.css` — importer `{ DatePicker }` depuis `@camply/ui` suffit ; si tu n'utilises pas ces composants, leur CSS n'est pas embarqué.

```tsx
// ✅ CSS de Button + Badge uniquement
import { Button, Badge } from "@camply/ui";

// ✅ CSS de DatePicker en plus (plus lourd — ~9 Ko JS + ~3 Ko CSS minifié)
import { DatePicker } from "@camply/ui";
```

Les design tokens et utilitaires partagés (`.camply-field-shell`, `.camply-focus-ring`, overlays…) vivent dans `styles.css`, importé une fois au démarrage de l'app.

### Icônes

Un **pack de plus de 2100 icônes** (tracés sous licence permissive — voir [`THIRD-PARTY-LICENSES.md`](THIRD-PARTY-LICENSES.md)) est fourni et réutilisable, tree-shakable, sans CSS à importer :

```tsx
import { Home, Star, Search } from "@camply/ui/icons";

<Home size={20} />;
```

Chaque icône accepte `size` (défaut 16) et tous les attributs SVG natifs (`className`, `stroke`, `onClick`…). Le type `IconProps` est exporté. Ce sont des composants purs (compatibles Server Components).

### Thémer

Tous les composants lisent les variables `--camply-*` définies dans `styles.css`. Thémer = surcharger ces variables (globalement ou sur un scope) :

```css
:root {
	--camply-accent: #8b5cf6; /* accent violet au lieu de cyan */
}
```

Chaque composant accepte aussi `className` et `style`.

## Développement

- **Bun** — runtime et gestionnaire de paquets
- **TypeScript** strict · **tsc** (build `dist/`, TS 7) · **Biome** · **Vite** (docs)

```bash
bun install          # dépendances
bun run dev          # vitrine docs (http://localhost:5173)
bun run build        # build de la lib dans dist/
bun run typecheck    # TypeScript sans emit
bun run check        # Biome (lint + format)
```

### Structure

```
src/
  components/       # 58 composants (MonComposant.tsx + .css + index.ts)
  lib/              # helpers internes (cn, Portal, icons, useAnchor…)
  styles/tokens.css # design tokens (source de @camply/ui/styles.css)
docs/               # vitrine / documentation visuelle (Vite)
scripts/            # build (tsc + post-steps), sync barrel
dist/               # sortie du build (généré)
```

### Ajouter un composant

1. Créer `src/components/MonComposant/` avec `MonComposant.tsx`, `MonComposant.css` et `index.ts` (qui importe le CSS et ré-exporte les symboles)
2. `bun run sync` (régénère `src/index.ts`)
3. `bun run build`
4. Vérifier le rendu dans la vitrine (`bun run dev`)

### Conventions

- Classes CSS : `camply-<slug>__<élément>` ; aucune couleur en dur, tout passe par les tokens `--camply-*`
- Composant à racine DOM unique → `forwardRef` + `displayName` ; tous acceptent `className` + `style`
- a11y : patterns WAI-ARIA (listbox pilotée par `aria-activedescendant`, Échap ferme les overlays…) ; toute suppression Biome est inline et justifiée

## Publication

```bash
bun run build      # lancé aussi automatiquement par prepublishOnly
npm publish        # package scopé public (publishConfig.access = public)
```
