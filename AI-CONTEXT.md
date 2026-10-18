# Camply UI — contexte pour créer une application

> Fichier à donner tel quel à une IA (ou à un développeur) qui démarre une app avec
> `@camply/ui` sans rien connaître du projet. Tout ce qui suit est vérifié sur le code.

## 1. La librairie en 30 secondes

- **`@camply/ui`** — librairie de composants React (v0.3.0).
- **60 composants** (80 exports avec les sous-composants), **4 hooks**, **2128 icônes**, **92 design tokens** CSS.
- **ESM uniquement**, **zéro dépendance runtime**, types TypeScript fournis.
- **Thème sombre par défaut**, entièrement thémable via variables CSS.

## 2. Stack à utiliser

| Besoin | Choix |
|---|---|
| Framework | **Next.js** (App Router) si SEO/SSR — **Vite + React** si SPA/dashboard |
| React | **≥ 18** + react-dom ≥ 18 (peer dependencies) |
| Langage | TypeScript recommandé (types fournis, mais JS pur fonctionne) |
| Routing | Next.js intégré, ou React Router côté Vite |
| Formulaires | react-hook-form + zod (**non fourni** par la lib) |
| Mise en page | **`Stack`** (flex : `direction` `gap` `align` `justify` `wrap`, gap calé sur `--camply-space-*`) — ton CSS pour les grilles |
| Gestionnaire de paquets | bun / npm / pnpm |

## 3. Installation & setup (obligatoire)

```bash
bun add @camply/ui react react-dom
```

```tsx
// Vite : src/main.tsx   —   Next.js : app/layout.tsx
// UNE SEULE FOIS dans toute l'application
import "@camply/ui/styles.css";
```

> ⚠️ **Erreur n°1** : sans cette ligne, les composants s'affichent **sans aucun style**.
> Un composant qui a l'air « cassé » ? Vérifier cet import en premier.

## 4. API publique

```tsx
import { Button, Card, useToast } from "@camply/ui";   // composants + hooks
import { Home, BrandGithub } from "@camply/ui/icons";  // les 2128 icônes
import "@camply/ui/styles.css";                        // les styles (1×)

import type { ButtonProps } from "@camply/ui";         // types
```

> ✅ **Par défaut, tout importer depuis la racine.** La lib est publiée en ESM non bundlé
> (un module par fichier), donc `import { Button } from "@camply/ui"` n'embarque que Button :
> ton bundler tree-shake automatiquement ce que tu n'utilises pas.
>
> Des **sous-chemins par composant** existent aussi (un par dossier de `src/components/`,
> générés par `bun run sync`) : `@camply/ui/Button` (JS + types) et
> `@camply/ui/Button/styles.css` (feuille du seul composant). Ils ne gagnent rien face à la
> racine, ils ne servent qu'à court-circuiter le barrel. La casse est celle du dossier :
> `@camply/ui/Button`, **jamais** `@camply/ui/button`.
>
> ⚠️ Un sous-chemin désigne un **dossier**, pas un export : `RadioGroup` vit dans
> `@camply/ui/Radio`, `ToastProvider` et `useToast` dans `@camply/ui/Toast`,
> `AccordionItem` dans `@camply/ui/Accordion`. `@camply/ui/RadioGroup` **n'existe pas**.
> Encore une raison de tout importer depuis la racine.
>
> ⚠️ `@camply/ui/<Nom>/styles.css` ne contient **que** la feuille de ce composant : seule,
> elle ne marche pas. Elle se combine avec `@camply/ui/tokens.css` (tokens + utilitaires
> partagés), **jamais** avec `@camply/ui/styles.css`, qui est le bundle complet et la
> contient déjà. → **dans le doute, n'importer que `@camply/ui/styles.css`.**

## 5. Composants disponibles (ne rien inventer d'autre)

**Primitifs (11)** — `Button` `ButtonGroup` `IconButton` `Toggle` `Badge` `Tag` `Kbd` `Stack` `Divider` `Snippet` `Spoiler`

**Formulaires (17)** — `Input` `NumberInput` `PinInput` `Textarea` `TagInput` `Select` `MultiSelect` `Combobox` `ColorPicker` `DatePicker` `Checkbox` `RadioGroup` `Switch` `Slider` `RangeSlider` `Rating` `FileUpload`

**Surfaces (10)** — `Card` `Alert` `Banner` `Modal` `Drawer` `Sheet` `DropdownMenu` `Tooltip` `Popover` `HoverCard`

**Navigation (8)** — `Tabs` `SegmentedControl` `Menubar` `Accordion` `Breadcrumbs` `Pagination` `Steps` `Timeline`

**Feedback (7)** — `Progress` `RadialProgress` `Meter` `Spinner` `Skeleton` `ToastProvider` `EmptyState`

**Données (7)** — `Avatar` `Stat` `DescriptionList` `Table` `Tree` `Carousel` `CommandPalette`

**Sous-composants** (exportés aussi depuis la racine) — `AccordionItem` · `AvatarGroup` · `CardHeader` `CardTitle` `CardDescription` `CardFooter` · `MenuItem` `MenuLabel` `MenuSeparator` · `Radio` · `SkeletonText` · `Tab` `TabList` `TabPanel` · `Dots`

**Hooks (4)** — `useToast` · `useCommandPalette` · `useLabels` · `useLocale`

**Provider i18n** — `CamplyProvider` (textes de la lib + locale, optionnel ; sans lui tout retombe en français, voir §8)

## 6. Icônes (2128)

```tsx
import { Home, Search, ArrowRight, BrandGithub } from "@camply/ui/icons";

<Home size={20} />
<BrandGithub size={16} className="text-muted" />
```

- Nommage **PascalCase** : `ArrowRight`, `CircleCheck`, `TrendingUp`, `LayoutGrid`…
- Les **marques** sont préfixées `Brand*` : `BrandGithub`, `BrandReact`, `BrandFigma`, `BrandApple`…
- Props : `size` (défaut **16**) + tous les attributs SVG natifs (`className`, `stroke`, `onClick`…). Type `IconProps` exporté.
- Ce sont des **composants purs**, et le **seul module de la lib sans `"use client"`** → les seuls réellement utilisables en Server Components (voir §9).
- Couleur : elles héritent de `currentColor` → il suffit de définir `color` sur le parent.

## 7. Thème — 92 tokens CSS

Re-thémer = surcharger des variables. **Aucun rebuild, aucune prop de couleur** : c'est de la cascade CSS.

```css
/* Globalement */
:root { --camply-accent: #8b5cf6; }

/* Ou sur un scope isolé */
.zone-promo { --camply-accent: #f97316; }
```

**Thème clair : FOURNI**, scopable sur n'importe quel conteneur (`color-scheme` aligné, donc
contrôles natifs et barres de défilement suivent). Le sombre reste le défaut :

```tsx
<div data-camply-theme="light">…</div>
```

Familles de tokens disponibles (préfixe `--camply-`) :

| Groupe | Tokens |
|---|---|
| Fonds | `bg` `surface` `surface-2` `elevated` `overlay` |
| Texte | `text` `text-strong` `text-muted` `text-muted-2` `text-disabled` |
| Accent | `accent` `accent-hover` `accent-contrast` `accent-soft` `accent-soft-hover` `accent-border` |
| Sémantique | `danger` `danger-hover` `danger-contrast` `danger-soft` `danger-soft-hover` `danger-border` `danger-ring` · `warn` `success` `info` (ceux-là **uniquement** : base, `-contrast`, `-soft`, `-border`) |
| Bordures | `border` `border-soft` `border-strong` `border-hover` |
| Formes | `radius-xs` `radius-sm` `radius` `radius-lg` `radius-xl` `radius-pill` |
| Espacement | `space-1` `space-2` `space-3` `space-4` `space-5` `space-6` `space-8` (il n'y a **pas** de `space-7`) |
| Élévation | `shadow-sm` `shadow-md` `shadow-lg` `shadow-pop` `shadow-color` · `fill-1` `fill-2` `fill-3` `fill-4` |
| Typo | `font-sans` `font-display` `font-mono` |
| Mouvement | `ease` `ease-spring` `duration` |
| Couches | `z-dropdown` `z-tooltip` `z-modal` `z-toast` · `float-z` `float-dur` (crans de `.camply-floating-surface`). Dialogues et couches flottantes partagent un niveau : la dernière ouverte passe dessus. |
| Divers | `ring` `field-bg` `disabled-opacity` `hover-soft` `neutral-solid` `knob` `sheen` · `checker-fg` `checker-bg` (damier de transparence) |
| Infobulle | `tooltip-bg` `tooltip-fg` `tooltip-dark` |
| Défilement & dégradés | `scrollbar-size` `scrollbar-thumb` `scrollbar-thumb-hover` · `gradient-accent` `gradient-info` `gradient-warn` `gradient-danger` |

**Variables de composant** (API publique, à poser sur un parent ou un thème — jamais une
classe interne `.camply-x__y`) : `--camply-segmented-rail` `-rail-border` `-thumb`
`-thumb-shadow` `-thumb-ink` (SegmentedControl) · `--camply-progress-height`
`--camply-progress-track` (Progress) · `--camply-table-edge-padding` (Table) ·
`--camply-toast-offset-x` `--camply-toast-offset-y` (toasts).

## 8. Providers & APIs impératives

```tsx
"use client";
import { ToastProvider, useToast, Button } from "@camply/ui";

// 1. Englober l'app UNE fois, en haut de l'arbre
<ToastProvider position="bottom-right">{children}</ToastProvider>

// 2. Déclencher depuis n'importe quel composant client
const { toast } = useToast();
toast({ title: "Enregistré", tone: "success" });
```

- `toast({ title, description?, tone?, duration?, action? })` — tone : `default` `success` `info` `warn` `danger`.
  `action: { label, onClick }` ajoute un bouton (« Annuler »…) qui ferme le toast après `onClick`,
  sauf `event.preventDefault()` ; allonger alors `duration`.
- `useCommandPalette()` → `[open, setOpen]`, câble déjà **⌘K / Ctrl-K**. À passer à `<CommandPalette open onClose commands />`.

```tsx
import { CamplyProvider } from "@camply/ui";

// Optionnel. Surcharge les textes internes de la lib + la locale Intl (défaut "fr-FR").
<CamplyProvider locale="en-US" labels={{ next: "Next", previous: "Previous" }}>
  <App />
</CamplyProvider>
```

- Sans lui, tous les libellés internes (aria-labels, boutons) restent en **français**.
- `useLabels()` → les textes de la lib ; `useLocale()` → la locale utilisée par `DatePicker` / `ColorPicker`.
- Surcharge **partielle** : les clés absentes retombent sur le français.
- Un objet littéral inline dans `labels` recrée le contexte à chaque rendu — le hisser hors du composant si le parent re-rend souvent.

## 9. Next.js (App Router)

- `import "@camply/ui/styles.css"` → dans `app/layout.tsx`, une seule fois.
- **`"use client"`** en tête de tout fichier **à toi** qui utilise état/hooks ou des composants interactifs.
- **Tous les composants de `@camply/ui` portent `"use client"`**, posé au build par `addUseClient()` (`scripts/build.js`) — y compris `Badge`, `Card`, `Divider`. Tu peux les rendre depuis un Server Component sans écrire `"use client"` chez toi, **à condition de ne leur passer que des props sérialisables** : une fonction ne traverse pas la frontière serveur → client. `onClick`, `onChange`, `Table` avec des `cell`, `Meter` avec un `formatValue`, `CommandPalette` avec des `onRun` → **Client Component obligatoire**. Dans tous les cas, ils partent dans le bundle client.
- **Seul `@camply/ui/icons` est neutre** : c'est le seul module que le build n'annote pas, donc le seul réellement rendu côté serveur.
- Les providers (`ToastProvider`, `CommandPalette`) vivent dans un Client Component dédié.

## 10. Ce que la lib NE fournit PAS (à prévoir)

- **Layout avancé** : `Stack` couvre l'empilement flex ; pas de `Container` / `Grid` / `Box` → les grilles restent en CSS maison.
- **Typographie** : aucun `Heading` / `Text` → tes propres styles (les tokens `--camply-font-*` sont là).
- Routing, data fetching, auth, validation de formulaires, et la traduction de **tes** textes
  (la lib ne traduit que ses propres libellés, via `CamplyProvider` — voir §8).

## 11. Règles pour une IA (important)

1. **N'utiliser que les composants du §5.** Ne rien inventer.
2. **Importer depuis la racine** (`@camply/ui`) par défaut. `@camply/ui/<Composant>` existe (casse exacte du dossier) mais n'apporte rien : le tree-shaking se fait déjà.
3. **Toujours** `import "@camply/ui/styles.css"` une fois à l'entrée de l'app.
4. Chaque composant accepte **`className`** et **`style`** — ils s'appliquent à sa **racine**. Pour atteindre le contrôle interne d'un champ (`Input`, `Textarea`…), cibler `.camply-field-control`.
5. Pour colorer/thémer : **tokens CSS**, jamais de props de couleur arbitraires.
6. **Doute sur une prop ?** Lire les types (`node_modules/@camply/ui/dist/index.d.ts`) — ne pas improviser.
7. Empilement et espacement : **`Stack`** (gap calé sur `--camply-space-*`). Grilles et placement fin : **CSS maison (flex/grid)**.
8. Textes de la lib en français par défaut : pour les traduire, **`CamplyProvider`** (§8), jamais de fork des composants.
9. **Deux axes distincts, jamais confondus** : `variant` dit la **forme**, `tone` dit le **sens**.
   - Bouton de suppression : `<Button tone="danger">`, **jamais** `variant="danger"` (n'existe pas).
   - Ton d'avertissement : `tone="warn"`, **jamais** `"warning"` (n'existe pas).
   - Palette complète : `accent` `neutral` `success` `warn` `danger` `info` — mais **chaque composant n'en accepte qu'une partie** (`Alert` : `info` `success` `warn` `danger` ; `Progress` : `accent` `info` `warn` `danger`…), et quelques-uns ajoutent un ton neutre propre (`default` sur `Toast` et `Tooltip`, `muted` sur `Timeline`). Vérifier le type (`AlertTone`, `ToastTone`…) avant d'écrire.
10. `Modal`, `Drawer`, `Sheet` et `CommandPalette` acceptent `ref`, `id`, `aria-*` et `data-testid` — ils visent le **panneau** du dialogue.
11. **Un lien qui ressemble à un bouton** : `<Button asChild><Link to="/projets">Projets</Link></Button>`
    (ou un `<a>`, idem pour `IconButton`). Jamais de `<button>` dans un `<a>`, ni de `onClick` qui
    navigue à la main.
12. **Titres** : `CardTitle`, `EmptyState` et `AccordionItem` prennent `headingLevel` (2 à 6, défaut 3 ;
    `CardTitle` accepte 1 quand la carte porte le titre de la page) pour suivre le plan de la page.
    `Stack` et `Card` prennent `as` (`section`, `article`, `ul`…) pour garder la sémantique d'un bloc.
13. **Dialogues** : seul le contenu défile, l'en-tête et le pied restent à l'écran (un enfant
    `position: sticky; top: 0` se colle au bord de la zone qui défile). Pour focaliser un champ à
    l'ouverture, `initialFocus={ref}` (ou `autoFocus` sur le champ) ; le focus revient seul au
    déclencheur. `size="full"` occupe la fenêtre.

## 12. Exemple minimal complet (Vite + React + TS)

```tsx
// src/main.tsx
import "@camply/ui/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// src/App.tsx
import { Badge, Button, Card, ToastProvider, useToast } from "@camply/ui";
import { Rocket } from "@camply/ui/icons";

function Page() {
  const { toast } = useToast();
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 32, display: "grid", gap: 16 }}>
      <Badge tone="accent">Nouveau</Badge>
      <h1 style={{ fontFamily: "var(--camply-font-display)", color: "var(--camply-text-strong)" }}>
        Mon application
      </h1>
      <Card>
        <p style={{ color: "var(--camply-text-muted)" }}>Construite avec Camply UI.</p>
        <Button
          variant="primary"
          leftIcon={<Rocket size={16} />}
          onClick={() => toast({ title: "C'est parti", tone: "success" })}
        >
          Lancer
        </Button>
      </Card>
    </main>
  );
}

export function App() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}
```
