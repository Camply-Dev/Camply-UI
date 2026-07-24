# @camply/ui

Bibliothèque de **58 composants React** pour Camply — thème sombre premium, accent cyan, customisable de A à Z via design tokens. ESM only, tree-shakable, zéro dépendance runtime.

## Utilisation

```bash
bun add @camply/ui   # ou npm i @camply/ui
```

Importer la feuille de styles **une seule fois** (entrée de l'app) :

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
			<Badge tone="accent" icon={<Check />}>Actif</Badge>
		</>
	);
}
```

### Le CSS n'est PAS importé par le JS

C'est délibéré : si `Button/index.js` importait sa feuille, le graphe de modules du barrel
tirerait les **58** feuilles pour un seul composant importé (75 Ko de CSS pour un `Button`
dont la feuille pèse 2 Ko). Le CSS est donc découplé du JS, et tu l'importes toi-même.

Deux façons, au choix :

```tsx
// A. Tout, une fois (recommandé) — tokens + utilitaires + 58 composants
import "@camply/ui/styles.css";

// B. Au composant près, si tu n'en utilises qu'une poignée
import "@camply/ui/styles.css";              // tokens + utilitaires : toujours requis
import "@camply/ui/DatePicker/styles.css";   // …puis la feuille voulue
```

Le **JS**, lui, est tree-shakable dans les deux cas : importer `{ Button }` n'embarque
que Button. Un sous-chemin dédié existe si tu veux court-circuiter le barrel :

```tsx
import { Button } from "@camply/ui/Button";
```

Les design tokens et utilitaires partagés (`.camply-field-shell`, `.camply-focus-ring`,
overlays…) vivent dans `styles.css` : il est requis dans tous les cas.

### Textes et locale

Par défaut, les libellés internes (`Fermer`, `Page suivante`, `aria-label`…) sont en
français. `CamplyProvider` les surcharge — il est optionnel :

```tsx
import { CamplyProvider } from "@camply/ui";

<CamplyProvider locale="en-US" labels={{ close: "Close", next: "Next" }}>
	<App />
</CamplyProvider>;
```

### Thème clair

Le sombre est le défaut. Le thème clair s'active sur n'importe quel conteneur :

```tsx
<div data-camply-theme="light">…</div>
```

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
bun run test         # vitest (helpers purs de src/lib)
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

1. Créer `src/components/MonComposant/` avec `MonComposant.tsx`, `MonComposant.css` et `index.ts` (qui ré-exporte les symboles — **sans importer le CSS**, voir plus haut)
2. `bun run sync` (régénère `src/index.ts` **et** la map `exports` du `package.json`)
3. `bun run build`
4. Vérifier le rendu dans la vitrine (`bun run dev`)

### Conventions

- Classes CSS : `camply-<slug>__<élément>` ; aucune couleur en dur, tout passe par les tokens `--camply-*`
- Composant à racine DOM unique → `forwardRef` + `displayName` ; tous acceptent `className`, `style` et les attributs natifs de leur racine
- a11y : patterns WAI-ARIA (listbox pilotée par `aria-activedescendant`, Échap ferme les overlays…) ; toute suppression Biome est inline et justifiée
- Aucun texte en dur dans un composant : passer par `useLabels()` (voir `src/lib/i18n.tsx`) ou une prop

## Publication

```bash
bun run build      # lancé aussi automatiquement par prepublishOnly
npm publish        # package scopé public (publishConfig.access = public)
```
