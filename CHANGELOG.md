# Changelog

Toutes les évolutions notables de `@camply/ui`.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ; versionnage [SemVer](https://semver.org/lang/fr/).

## [Non publié]

### ⚠️ Changements cassants

- **Le CSS n'est plus importé automatiquement par le JS.** Importer un composant
  embarquait les feuilles des 57 autres (75 KB de CSS pour un `Button` dont la
  feuille fait 2,2 KB). Le consommateur importe désormais les styles une fois :
  ```ts
  import "@camply/ui/styles.css";           // tout (tokens + 58 composants)
  import "@camply/ui/Button/styles.css";    // ou au composant près
  ```
- `useAnchor` renvoie `{ style, placement, side }` au lieu d'un objet de style.
  (Primitive interne — sans impact si vous n'importiez que des composants.)

### Corrigé

- **Le paquet publié depuis Linux/macOS était cassé** : `dist/index.js` importait
  un `./styles/tokens.css` jamais émis (comparaison de chemin sensible aux
  séparateurs Windows). Le build vérifie maintenant que **chaque import émis
  résout**, et échoue sinon.
- **Le paquet n'était pas résolvable en ESM Node** : les imports relatifs émis
  n'avaient pas d'extension (`from "./Button"`). Ils sont désormais suffixés.
- **Les couches flottantes passaient sous le voile modal** : un `Select` ou un
  `Popover` ouvert dans une `Modal` était peint derrière. Ordre des z-index
  corrigé (modal < dropdown < tooltip < toast).
- **Token fantôme `--camply-hover-soft`** : le surlignage de survol / navigation
  clavier était invisible dans 5 composants.
- `isFileAccepted` compilait l'attribut `accept` en RegExp sans échappement — un
  type MIME contenant `+` (`image/svg+xml`) pouvait faire planter le rendu.
- `snapToStep` renvoyait des flottants dérivés (`0.30000000000000004`) et
  `valueToPercent` un `NaN` (plage nulle), jusque dans l'API publique et le DOM.
- `cloneTrigger` **écrasait** la `ref` et les handlers du trigger fourni par le
  consommateur ; ils sont désormais **composés**.
- `DropdownMenu` se fermait sur `onPointerDown` du conteneur : l'entrée était
  démontée avant que son `click` ne parte, et un clic sur un label ou un
  séparateur fermait le menu. La fermeture part maintenant de `MenuItem`.
- `useDismiss` ignorait l'empilement : une seule Échap fermait tout le stack et
  un portail enfant comptait comme « extérieur ». Pile de couches introduite.

### Accessibilité

- `Modal`, `Drawer`, `Sheet`, `CommandPalette` : **piège de focus**, **restauration
  du focus** au déclencheur, et **nom accessible** (`aria-labelledby` sur le titre).
  `aria-modal="true"` tient enfin sa promesse.
- `Tooltip` est enfin annoncé (`aria-describedby`) et sa flèche suit le côté
  réellement retenu après un flip.
- `DropdownMenu` : navigation clavier ARIA APG (flèches, Home/End, typeahead).
- **`prefers-reduced-motion`** respecté sur toute la librairie.

### Ajouté

- **Thème clair**, scopable : `data-camply-theme="light"` sur n'importe quel
  conteneur (le sombre reste le défaut). `color-scheme` aligné.
- **Exports par sous-chemin** : `@camply/ui/Button` (JS tree-shaké) et
  `@camply/ui/Button/styles.css`.
- **`CamplyProvider`** : surcharge des textes de la lib (`labels`) et de la
  locale Intl (`locale`). Sans lui, tout retombe en français.
- **Tests** (`vitest`) sur les helpers purs, avec des tests de régression sur les
  bugs ci-dessus. Job CI dédié.
- `LICENSE` (MIT, cohérent avec `package.json`).
- Directive `"use client"` sur les modules clients (compatibilité RSC / Next App
  Router).
