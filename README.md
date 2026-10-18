# @camply/ui

Bibliothèque de **60 composants React** pour Camply — thème sombre premium, accent cyan, customisable de A à Z via design tokens. ESM only, tree-shakable, zéro dépendance runtime.

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
tirerait **toutes** les feuilles pour un seul composant importé — le bundle CSS complet,
soit une quarantaine de fois la feuille d'un `Button` (2,2 Ko minifié). Le CSS est donc
découplé du JS, et tu l'importes toi-même.

Deux façons, au choix :

```tsx
// A. Tout, une fois (recommandé) — tokens + utilitaires + toutes les feuilles
import "@camply/ui/styles.css";

// B. Au composant près, si tu n'en utilises qu'une poignée
import "@camply/ui/tokens.css";              // couche partagée : toujours requise
import "@camply/ui/DatePicker/styles.css";   // …puis la feuille voulue
```

> ⚠️ `styles.css` est le bundle **complet** (`tokens.css` + la feuille de chaque
> composant) : ne pas le combiner avec l'option B, ce serait charger deux fois les mêmes
> règles. L'option B part de `tokens.css`, qui porte les tokens `--camply-*` et les
> utilitaires partagés (`.camply-field-shell`, `.camply-focus-ring`, overlays…) dont
> chaque feuille de composant dépend. **Dans le doute : option A.**

Le **JS**, lui, est tree-shakable dans les deux cas : importer `{ Button }` n'embarque
que Button. Un sous-chemin dédié existe si tu veux court-circuiter le barrel (casse
exacte du dossier, `@camply/ui/button` n'existe pas) :

```tsx
import { Button } from "@camply/ui/Button";
```

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

Chaque icône accepte `size` (défaut 16) et tous les attributs SVG natifs (`className`, `stroke`, `onClick`…). Le type `IconProps` est exporté. Ce sont des composants purs, et le **seul module de la lib sans `"use client"`** : les seuls réellement rendables en Server Component.

### Thémer

Tous les composants lisent les variables `--camply-*` définies dans `styles.css`. Thémer = surcharger ces variables (globalement ou sur un scope) :

```css
:root {
	--camply-accent: #8b5cf6; /* accent violet au lieu de cyan */
}
```

Chaque composant accepte aussi `className` et `style`, appliqués à sa **racine**. Pour
atteindre le contrôle interne d'un champ (`Input`, `Textarea`…), cibler `.camply-field-control`.

**Variables de composant.** Ce qu'une application règle souvent sur un seul composant passe
par une variable à son nom, posée sur un parent, un thème ou une media query — jamais par
une classe interne (`.camply-x__y`), qui n'est pas une API :

| Variable | Défaut | Effet |
|---|---|---|
| `--camply-segmented-rail`, `-rail-border`, `-thumb`, `-thumb-shadow`, `-thumb-ink` | fond des champs, accent | rail et curseur d'un `SegmentedControl` |
| `--camply-progress-height`, `--camply-progress-track` | `7px` (`5px` en `sm`), `fill-3` | hauteur et piste d'un `Progress` |
| `--camply-table-edge-padding` | `16px` | marge des colonnes du bord d'une `Table` (l'aligner sur la `Card` parente) |
| `--camply-toast-offset-x`, `--camply-toast-offset-y` | `22px` | écart des toasts au bord de l'écran (au-dessus d'une barre d'onglets) |

```css
/* Thème clair d'une application : un curseur blanc en relief plutôt qu'à l'accent. */
[data-camply-theme="light"] {
	--camply-segmented-rail: var(--camply-surface-2);
	--camply-segmented-thumb: var(--camply-surface);
	--camply-segmented-thumb-shadow: 0 0 0 1px var(--camply-border), var(--camply-shadow-sm);
	--camply-segmented-thumb-ink: var(--camply-text-strong);
}
```

## Développement

- **Bun** — runtime et gestionnaire de paquets
- **TypeScript 7** strict — types, et `tsc --emitDeclarationOnly` pour les `.d.ts`
- **esbuild** — émission du JS (ESM, non bundlé, minifié) et minification du CSS
- **Biome** (lint + format) · **Knip** (code mort) · **Vitest** · **Vite** (vitrine docs)

```bash
bun install          # dépendances
bun run dev          # vitrine docs (http://localhost:5173)
bun run build        # build de la lib dans dist/
bun run typecheck    # TypeScript sans emit
bun run test         # vitest (helpers de src/lib + rendu DOM des composants)
bun run check        # Biome (lint + format, lecture seule)
bun run fix          # Biome (lint + format, écriture)
bun run knip         # code mort (job CI dédié)
```

### Structure

```
src/
  components/       # un dossier par composant (MonComposant.tsx + .css + index.ts)
  lib/              # helpers internes (cn, Portal, icons, useAnchor…)
  styles/tokens.css # tokens + utilitaires partagés → @camply/ui/tokens.css, et tête de styles.css
docs/               # vitrine / documentation visuelle (Vite)
scripts/            # build (esbuild pour le JS + tsc pour les .d.ts + post-steps), sync barrel
dist/               # sortie du build (généré)
```

> `target` et `jsx` sont définis **deux fois** : dans `tsconfig.json` (typecheck +
> déclarations) et dans `scripts/build.js` (émission du JS par esbuild). Les changer des
> deux côtés.

### Ajouter un composant

1. Créer `src/components/MonComposant/` avec `MonComposant.tsx`, `MonComposant.css` et `index.ts` (qui ré-exporte les symboles — **sans importer le CSS**, voir plus haut)
2. `bun run sync` (régénère `src/index.ts` **et** la map `exports` du `package.json`)
3. `bun run build`
4. Vérifier le rendu dans la vitrine (`bun run dev`)

### Conventions

Une librairie de 60 composants ne reste utilisable que si elle se comporte comme
**un seul** composant décliné 60 fois. Ces règles ne sont pas du style : chacune
corrige une divergence qui a réellement coûté un bug ici.

**1. Un concept, un nom, une valeur.** Le vocabulaire partagé vit dans
`src/lib/types.ts` : `Size` (`sm`/`md`/`lg`), `Tone`, `Option<T>`. Un composant
qui ne supporte qu'un sous-ensemble le **dérive** — jamais ne le recopie :

```ts
export type AlertTone = Extract<Tone, "info" | "success" | "warn" | "danger">;
```

Un ton mal orthographié ne compile alors plus. C'est ainsi que `warning` avait
divergé de `warn` sur un seul composant sans que rien ne le signale.

**2. Un seul contrat contrôlé/non contrôlé.** `value` + `defaultValue` +
`onChange` pour la valeur principale, `open` + `defaultOpen` + `onOpenChange`
(interface `Controllable`) pour une ouverture. Un composant qui porte un second
état indépendant le nomme par son axe, sur le même modèle : `Tree` expose
`expanded` / `defaultExpanded` / `onExpandedChange` à côté de sa sélection. Tout
passe par `useControllable` : le mode se décide une fois, pas à chaque rendu.

Exception assumée : `Modal`, `Drawer`, `Sheet` et `CommandPalette` exigent `open`
et `onClose`, sans mode non contrôlé. Un dialogue modal est toujours piloté par
l'application ; un `defaultOpen` y serait un piège.

**3. Chaque prop sait où elle atterrit.** Tous les composants sont des
`forwardRef` et acceptent les attributs natifs. Où ils vont dépend de la forme du
composant :

- **Composant simple** : `ref`, `...rest`, `className` et `style` sur la racine.
- **Champ** (`Input`, `Select`, `Rating`…) : `className` et `style` sur
  l'**enveloppe** (`.camply-field`, qui porte libellé, aide et erreur) — c'est elle
  qu'on positionne dans une mise en page. `ref` et `...rest` sur le **contrôle** —
  c'est lui qu'on focalise, qui porte `name`, `value` et les `aria-*`.
  *Écart connu* : `Slider`, `RangeSlider`, `ColorPicker` et `FileUpload` posent
  encore les quatre sur une racine qui englobe l'enveloppe.
- **Dialogue portalisé** : tout vise le **panneau**, jamais le voile. Un composant
  qu'on ne peut ni référencer ni marquer d'un `data-testid` n'est pas testable.

Ce qu'un `...rest` ne doit jamais pouvoir écraser, c'est l'invariant du
composant — `role`, `aria-modal`, le nom accessible calculé. Ces attributs-là
sont posés **après** le spread, et retirés du type public.

**4. Composer, jamais écraser.** Un `onClick`, un `onBlur` ou une `ref` fournis
par le consommateur s'appellent **avant** les nôtres ; `e.defaultPrevented`
permet d'annuler le comportement par défaut. Voir `lib/cloneTrigger.ts`. L'ordre
du spread JSX est un piège : `{...props}` après `onClick={…}` supprime le nôtre,
l'inverse supprime le sien.

**5. Aucun libellé en dur.** Tout texte rendu par la lib se résout en
`prop ?? labels.clé` (`src/lib/i18n.tsx`). La prop couvre l'instance,
`CamplyProvider` couvre l'application. Une clé jamais lue est un mensonge sur le
contrat public : aucun outil ne les détecte, seule une relecture de
`CamplyLabels` le peut.

**6. Ce qui se répète trois fois monte dans `src/lib/`.** `HiddenField`
(soumission des widgets non natifs), `sliderKeys` (clavier APG), `Field`
(label/aide/erreur), `OverlayDialog` (dialogue modal), `Listbox`. La troisième
copie est celle qui finit par diverger : l'oubli de `disabled` sur l'input caché
était présent dans 9 composants sur 10.

**7. Classes CSS `camply-<slug>__<élément>`**, aucune couleur **de thème** en
dur : tout passe par les tokens `--camply-*`, pour qu'un thème repeigne toute la
lib. Seule exception, la palette décorative d'`Avatar` (cinq dégradés attribués
par hachage du nom, et l'encre sombre de ses initiales), volontairement identique
dans les deux thèmes. Le style d'un
composant est surchargeable **sans `!important`** : pas de style inline pour ce qui
peut vivre en feuille.

**8. a11y : le pattern WAI-ARIA APG fait foi**, et un `aria-*` qui pointe dans le
vide est un bug (`aria-controls` vers une liste fermée, `aria-activedescendant`
vers un index hors bornes). Toute suppression Biome est inline et justifiée.

> **Ce que les outils vérifient, et ce qu'ils ne voient pas.** `typecheck` rattrape
> les règles 1 et 3 (un invariant retiré du type ne compile plus), `knip` les
> exports morts, Biome le style, `publint` le paquet publié, et la CI la fraîcheur
> du barrel. Les règles 2, 4, 5 et 8 ne reposent que sur les tests de rendu et la
> relecture : ce sont celles à surveiller en revue.

## Publication

```bash
bun run build      # lancé aussi automatiquement par prepublishOnly
npm publish        # package scopé public (publishConfig.access = public)
```
