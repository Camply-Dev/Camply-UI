# Camply UI — contexte pour créer une application

> Fichier à donner tel quel à une IA (ou à un développeur) qui démarre une app avec
> `@camply/ui` sans rien connaître du projet. Tout ce qui suit est vérifié sur le code.

## 1. La librairie en 30 secondes

- **`@camply/ui`** — librairie de composants React (v0.1.0).
- **58 composants** (73 exports avec les sous-composants), **2 hooks**, **2128 icônes**, **87 design tokens** CSS.
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
| Mise en page | ton CSS (flex/grid) — **la lib ne fournit aucune primitive de layout** |
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

## 4. API publique — 3 points d'entrée, pas un de plus

```tsx
import { Button, Card, useToast } from "@camply/ui";   // composants + hooks
import { Home, BrandGithub } from "@camply/ui/icons";  // les 2128 icônes
import "@camply/ui/styles.css";                        // les styles (1×)

import type { ButtonProps } from "@camply/ui";         // types
```

> ❌ **Il n'existe AUCUN sous-chemin par composant.** `@camply/ui/button` **n'existe pas**.
> Tout vient de la racine : la lib est publiée en ESM non bundlé (un module par fichier),
> donc ton bundler tree-shake automatiquement ce que tu n'utilises pas.

## 5. Composants disponibles (ne rien inventer d'autre)

**Primitifs (10)** — `Button` `ButtonGroup` `IconButton` `Toggle` `Badge` `Tag` `Kbd` `Divider` `Snippet` `Spoiler`

**Formulaires (17)** — `Input` `NumberInput` `PinInput` `Textarea` `TagInput` `Select` `MultiSelect` `Combobox` `ColorPicker` `DatePicker` `Checkbox` `RadioGroup` `Switch` `Slider` `RangeSlider` `Rating` `FileUpload`

**Surfaces (10)** — `Card` `Alert` `Banner` `Modal` `Drawer` `Sheet` `DropdownMenu` `Tooltip` `Popover` `HoverCard`

**Navigation (8)** — `Tabs` `SegmentedControl` `Menubar` `Accordion` `Breadcrumbs` `Pagination` `Steps` `Timeline`

**Feedback (6)** — `Progress` `RadialProgress` `Meter` `Spinner` `Skeleton` `Toast`

**Données (7)** — `Avatar` `Stat` `DescriptionList` `Table` `Tree` `Carousel` `CommandPalette`

**Sous-composants** (exportés aussi depuis la racine) — `AccordionItem` · `AvatarGroup` · `CardHeader` `CardTitle` `CardDescription` `CardFooter` · `MenuItem` `MenuLabel` `MenuSeparator` · `Radio` · `SkeletonText` · `Tab` `TabList` `TabPanel` · `Dots` · `ToastProvider`

**Hooks (2)** — `useToast` · `useCommandPalette`

## 6. Icônes (2128)

```tsx
import { Home, Search, ArrowRight, BrandGithub } from "@camply/ui/icons";

<Home size={20} />
<BrandGithub size={16} className="text-muted" />
```

- Nommage **PascalCase** : `ArrowRight`, `CircleCheck`, `TrendingUp`, `LayoutGrid`…
- Les **marques** sont préfixées `Brand*` : `BrandGithub`, `BrandReact`, `BrandFigma`, `BrandApple`…
- Props : `size` (défaut **16**) + tous les attributs SVG natifs (`className`, `stroke`, `onClick`…). Type `IconProps` exporté.
- Ce sont des **composants purs** → utilisables en Server Components.
- Couleur : elles héritent de `currentColor` → il suffit de définir `color` sur le parent.

## 7. Thème — 87 tokens CSS

Re-thémer = surcharger des variables. **Aucun rebuild, aucune prop de couleur** : c'est de la cascade CSS.

```css
/* Globalement */
:root { --camply-accent: #8b5cf6; }

/* Ou sur un scope isolé */
.zone-promo { --camply-accent: #f97316; }
```

Familles de tokens disponibles (préfixe `--camply-`) :

| Groupe | Tokens |
|---|---|
| Fonds | `bg` `surface` `surface-2` `elevated` `overlay` |
| Texte | `text` `text-strong` `text-muted` `text-muted-2` `text-disabled` |
| Accent | `accent` `accent-hover` `accent-contrast` `accent-soft` `accent-soft-hover` `accent-border` |
| Sémantique | `danger*` `warning*` `success*` `info*` (chacun : base, `-contrast`, `-soft`, `-border`) |
| Bordures | `border` `border-soft` `border-strong` `border-hover` |
| Formes | `radius-xs` `radius-sm` `radius` `radius-lg` `radius-xl` `radius-pill` |
| Espacement | `space-1` → `space-8` |
| Élévation | `shadow-sm` `shadow-md` `shadow-lg` `shadow-pop` · `fill-1` → `fill-4` |
| Typo | `font-sans` `font-display` `font-mono` |
| Mouvement | `ease` `ease-spring` `duration` `transition` |
| Couches | `z-dropdown` `z-tooltip` `z-modal` `z-toast` |
| Divers | `ring` `field-bg` `knob` `tooltip-bg` `scrollbar-*` `gradient-*` |

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

- `toast({ title, description?, tone?, duration? })` — tone : `default` `success` `info` `warn` `danger`.
- `useCommandPalette()` → `[open, setOpen]`, câble déjà **⌘K / Ctrl-K**. À passer à `<CommandPalette open onClose commands />`.

## 9. Next.js (App Router)

- `import "@camply/ui/styles.css"` → dans `app/layout.tsx`, une seule fois.
- **`"use client"`** en tête de tout fichier **à toi** qui utilise état/hooks ou des composants interactifs.
- Composants présentiels (`Badge`, `Card`, `Divider`, icônes) → OK en Server Component.
- Les providers (`ToastProvider`, `CommandPalette`) vivent dans un Client Component dédié.

## 10. Ce que la lib NE fournit PAS (à prévoir)

- **Layout** : aucun `Container` / `Grid` / `Stack` / `Box` → mise en page en CSS maison.
- **Typographie** : aucun `Heading` / `Text` → tes propres styles (les tokens `--camply-font-*` sont là).
- **Thème clair prêt à l'emploi** : le défaut est sombre ; surcharger les tokens pour un thème clair.
- Routing, data fetching, auth, i18n, validation de formulaires.

## 11. Règles pour une IA (important)

1. **N'utiliser que les composants du §5.** Ne rien inventer.
2. **Ne jamais importer `@camply/ui/<composant>`** — ça n'existe pas. Tout depuis la racine.
3. **Toujours** `import "@camply/ui/styles.css"` une fois à l'entrée de l'app.
4. Chaque composant accepte **`className`** et **`style`**.
5. Pour colorer/thémer : **tokens CSS**, jamais de props de couleur arbitraires.
6. **Doute sur une prop ?** Lire les types (`node_modules/@camply/ui/dist/index.d.ts`) — ne pas improviser.
7. La mise en page se fait en **CSS (flex/grid)**, il n'y a pas de composants de layout.

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
