# Changelog

Toutes les évolutions notables de `@camply/ui`.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ; versionnage [SemVer](https://semver.org/lang/fr/).

## [Non publié]

### Ajouts

- `CommandPalette` : `limit`, au plus N commandes rendues, les premières qui
  correspondent ; au-delà, une ligne sous la liste dit combien d'autres correspondent
  (`labels.moreCommands`, « 965 autres : précisez la recherche »). Une palette de plus
  de mille commandes rendait tous ses boutons à l'ouverture et à chaque frappe (une
  centaine de millisecondes).

### Corrections

- Paquet publié : `THIRD-PARTY-LICENSES.md` y entre enfin (les licences Tabler et
  Lucide des icônes exigent leurs mentions), avec `AI-CONTEXT.md`, que l'application
  peut désigner dans `node_modules/@camply/ui/`.
- `Slider` / `RangeSlider` : un glisser interrompu par le navigateur (`pointercancel`
  sur tactile : défilement, appui long) ou une perte de capture prend fin ; la poignée
  suivait ensuite le doigt. `ColorPicker` glisse de même par capture du pointeur (plus
  d'écouteurs sur `window`), et un second doigt n'y déplace plus la surface en cours.

### Interne

Même DOM, mêmes classes, même comportement : du code partagé là où il était recopié.

- `compose(theirs, ours)` (`lib/cloneTrigger.ts`) remplace les 38 blocs
  `onX?.(e); if (e.defaultPrevented) return; …` écrits à la main dans 18 composants :
  le handler du consommateur d'abord, son `preventDefault()` pour veto (règle 4).
- Un seul chemin vers la pile de renvoi : `useDismiss` prend `escapeOnly`, que
  `OverlayDialog` (avec son verrou de défilement) et les couches de survol utilisent ;
  `useEscapeAndScrollLock` disparaît.
- Champs à liste : `useListboxNav` est fondu dans `useListboxField` ; `Listbox` porte
  son portail et les classes de surface, `ListboxOption` le `preventDefault` du clic et
  l'activation au survol, recopiés jusqu'ici dans `Select`, `MultiSelect` et `Combobox`.
- Focus (`lib/focusTrap.ts`) : `focusInto` (entrée dans un dialogue ou un `Popover`),
  `tabLeavesPanel` (sortie par Tab d'un `Popover` ou d'un `ColorPicker` flottant) et
  `restoreFocus` (retour au déclencheur : `Popover`, `DropdownMenu`, `Menubar`,
  `ColorPicker`, `DatePicker`). Le focus revient désormais au déclencheur partout
  *avant* la fermeture, donc avant `onOpenChange(false)`.
- `useHoverDisclosure` porte l'état, les délais, l'ancrage et Échap de `Tooltip` et
  `HoverCard` (il absorbe `useDelayedOpen`, leur seul usage).
- `DialogFrame` (ex-`DialogHeader`) rend toute la charpente de `Modal`, `Drawer` et
  `Sheet` : en-tête, `__content > __body`, `__footer`.
- `Menubar` entre dans un menu par le `focusFirst()` de `useMenuNav` au lieu de son
  propre sélecteur d'entrées.
- `useLatest(value)` remplace les 15 copies de `const xRef = useRef(x); xRef.current = x`
  (Biome le connaît comme stable, `biome.json`).
- `fieldShell({ size, layout, error, open, disabled })` (`lib/Field.tsx`) compose les
  classes de coque des 8 champs qui la recopiaient (`Select`, `MultiSelect`,
  `Combobox`, `DatePicker`, `Input`, `NumberInput`, `TagInput`, `ColorPicker`).
- CSS, sans changement de valeur : la charpente des dialogues (colonne du panneau,
  partie commune de `__header`, `__content`, typographie de `__body`) et ce que
  `Slider` et `RangeSlider` partageaient passent dans `tokens.css` en
  multi-sélecteurs ; `ColorPicker` fusionne ses poignées et remplissages identiques.
  `RangeSlider.css` reste, vide, pour son export.
- Tests : un seul `stubLayout()` (`tests/dom/layout.ts`) pour les fichiers de
  dialogues et de couches, un seul test de Tab bouclé (compteur de lectures et Maj+Tab),
  la remise à zéro d'un formulaire rejoint `forms.test.tsx`, un seul test
  d'accumulation du typeahead.

### Vitrine et outillage

- Vitrine : la page Roadmap et le statut « à venir », jamais servis (les 60 composants
  ont leur page), disparaissent.
- Vitrine : sa palette `--sc-*`, copie des tokens, cède la place à `var(--camply-*)` ;
  ses barres de défilement prennent `--camply-scrollbar-*` (10 px au lieu de 11,
  opacités de la lib).
- Vitrine : ⌘K / Ctrl+K depuis le champ de recherche de la barre latérale ouvre la
  palette ; son propre raccourci l'ouvrait, puis celui de `useCommandPalette` la
  refermait aussitôt.
- Vitrine : un seul tableau `PAGES` (id, libellé, icône, vue) décrit les pages fixes
  pour l'App (fil d'Ariane, palette, rendu) et la barre latérale.

## [0.3.0] — 2026-10-18

Ce qu'une application devait contourner (classes internes surchargées, composants
maison) devient une API, et une revue complète des 60 composants corrige 36 défauts
de comportement et d'accessibilité. `tsc` signale les ruptures de type ; celles qu'il
ne voit pas sont marquées **⚠️ silencieuse**, les changements de rendu **⚠️ visuel**.

### ⚠️ Changements cassants

- **`NumberInputProps` devient une union** discriminée sur `allowEmpty` (voir Ajouts) :
  un `interface X extends NumberInputProps` ne compile plus — écrire
  `type X = NumberInputProps & { … }`.
- ⚠️ **silencieuse** — **Dialogues : seul le contenu défile.** Le panneau d'une `Modal`
  ne défile plus en entier (en-tête et pied restent à l'écran) ; `.camply-modal__content`
  devient la zone qui défile, **sans marge**, et la marge passe à un nouveau
  `.camply-modal__body`. Même structure pour `Drawer` et `Sheet`
  (`.camply-drawer__body`, `.camply-sheet__body`). Une feuille qui retouchait la marge
  de `__content` vise désormais `__body`.
- ⚠️ **silencieuse** — **`DescriptionList` : classes de mise en page renommées**
  `camply-descriptionlist__layout-row` / `__layout-stacked` (et `__layout-split`). En
  `row`, la liste portait la classe de ses lignes (`camply-descriptionlist__row`) et en
  recevait une marge verticale de 12 px : elle disparaît.
- ⚠️ **silencieuse** — **Empilement des couches.** Couches flottantes (menus, listes,
  popovers, cartes de survol) et dialogues partagent un niveau (`--camply-float-z` vaut
  `--camply-z-modal`) : la dernière ouverte passe dessus. Une `Modal` ouverte depuis un
  `Popover` n'est plus peinte sous lui ; un menu ouvert depuis une `HoverCard` passe sur
  elle (la carte n'est plus au niveau des infobulles). `--camply-z-dropdown` reste exposé.
- ⚠️ **silencieuse** — **Plus de `disabled` qui jette le focus** : un `Button` en
  `loading` porte `aria-disabled` et `aria-busy` (clic et soumission annulés) ; les
  flèches de `Pagination` et de `Carousel` arrivées au bout portent `aria-disabled`.
  Un sélecteur CSS `:disabled` ne les vise plus.
- ⚠️ **silencieuse** — `Table` : `rowKey(row, index)` reçoit le rang de la ligne dans
  `data`, plus sa position après tri (une clé tirée de l'index changeait de ligne au
  tri). Les textes se trient selon la locale (`Intl.Collator` : accents et casse
  ignorés, « 9 » avant « 10 ») : l'ordre peut changer.
- ⚠️ **silencieuse** — `Combobox` : liste fermée, Entrée n'est plus captée, le formulaire
  s'envoie (elle choisissait une autre option, d'après un index périmé).
- ⚠️ **silencieuse** — `FileUpload` : `onChange(File[])` ne part plus à chaque progression
  d'un envoi, seulement quand la liste change (`onFilesChange` suit toujours tout).
- ⚠️ **silencieuse** — `Tabs` : les ids d'onglets et de panneaux encodent la valeur
  (`encodeURIComponent`) ; ils changent pour une valeur à espaces ou caractères spéciaux.
- ⚠️ **silencieuse** — `Tooltip`, `HoverCard`, `Menubar` : `onOpenChange` /
  `onOpenIndexChange` ne sont plus émis quand rien ne change (pointeur qui traverse).
- ⚠️ **visuel** — **`Stat`** : une hausse prend le ton `success` (et non plus l'accent,
  qui se lisait comme une alerte avec un accent rouge ou jaune) ; un écart nul est
  neutre ; l'écart est mis en forme selon la locale (« +12,5 » en fr-FR, deux décimales
  au plus) ; la ligne du bas n'est plus rendue vide.
- ⚠️ **visuel** — **Contrastes AA** : thème clair, accent `#0284c7` → `#0369a1` (avec
  `-hover`, `-soft`, `-border`, l'anneau et le dégradé) et avertissement `#b45309` →
  `#a14a0a` ; thème sombre, `--camply-text-muted-2` `#6b7d95` → `#7587a0`. Titres
  d'`Alert` poussés vers l'encre forte, initiales d'`Avatar` à l'encre sombre dans les
  deux thèmes, toast `success` au ton `success`.
- ⚠️ **visuel** — `TagInput` plein : la saisie reste affichée, en lecture seule (elle
  disparaissait et perdait le focus). `DatePicker` vide s'ouvre sur le mois du jour.

### Ajouts

- **`initialFocus`** sur `Modal`, `Drawer` et `Sheet` : l'élément focalisé à l'ouverture
  (un champ de recherche). Un contrôle `autoFocus` du contenu est aussi respecté, et le
  focus revient dans tous les cas au déclencheur.
- **`NumberInput allowEmpty`** : le champ peut rester vide (`null`), pour une valeur
  facultative ; `value`, `defaultValue` et `onChange` passent à `number | null`.
- **`SegmentedControl label` / `hint`** : un libellé visible et une aide, comme
  `RadioGroup`, quand le groupe est un champ de formulaire.
- **`Stat variant="plain"`** (à plat, dans un panneau) et **`size="sm"`** (compacte).
- **`DescriptionList layout="split"`** : le libellé prend la place, la valeur se range à
  droite en chiffres alignés — des montants.
- **`Table bordered={false}`** : bord à bord, dans une `Card`.
- **`Card as`** (`article`, `section`, `aside`, `li`) et **`CardTitle headingLevel={1}`**.
- **`MenuLabel uppercase={false}`** : le texte tel quel (une adresse e-mail).
- **Variables de composant** (API publique) : `--camply-segmented-*` (rail, curseur),
  `--camply-progress-height` / `-track`, `--camply-table-edge-padding`,
  `--camply-toast-offset-x` / `-y` (zone sûre des écrans à encoche ajoutée).
- **Remise à zéro des formulaires** : un `<button type="reset">` ramène à leur valeur par
  défaut les widgets non contrôlés qui soumettent par un champ caché (`Select`,
  `Combobox`, `MultiSelect`, `DatePicker`, `Rating`, `Slider`, `RangeSlider`,
  `PinInput`, `TagInput`, `ColorPicker`, `SegmentedControl`).
- **Déclencheurs imbriquables** : `<DropdownMenu trigger={<Tooltip><button/></Tooltip>}>`
  fonctionne (les props du menu vont au bouton), comme l'inverse.
- Libellé `avatarStatus` (`CamplyLabels`) : le statut d'un `Avatar` entre dans son nom
  accessible.

### Corrections

**Clavier et focus**

- `DatePicker` : le calendrier se pilote enfin au clavier (pattern APG : flèches,
  Origine/Fin, Page préc./suiv., Maj pour l'année ; flèche bas depuis le champ), Tab y
  reste, Échap et le jour choisi rendent le focus au champ, et il se referme quand le
  focus le quitte. En plage, le bouton annonce son libellé **et** les dates.
- `Popover` : le focus entre dans le panneau à l'ouverture (portalisé, il était hors
  d'atteinte) ; Tab au bout le referme et revient au déclencheur.
- Piège à focus des dialogues : il ne mesure plus que les bords (une fenêtre de
  centaines de boutons se figeait à chaque Tab) ; un menu ouvert depuis un dialogue gère
  Tab, se referme et rend le focus, au lieu de rester ouvert sans focus.
- `CommandPalette` : focus d'entrée par `initialFocus` (plus de `requestAnimationFrame`) ;
  le survol ne vole plus la sélection clavier ; Entrée qui valide une composition (IME)
  ne lance plus de commande — de même dans `Combobox` et `TagInput`.
- `Menubar` : un menu ouvert au survol ne prend plus le focus de la page ; un menu
  ouvert au montage (`defaultOpenIndex`) n'est plus invisible.
- `PinInput` : retaper le chiffre déjà présent fait avancer le focus.
- `Tree` : les flèches partent de l'élément focalisé, même atteint autrement qu'au clic.
- `Carousel` : « Lecture » relance la rotation même focus dans le carrousel.

**Valeurs**

- `NumberInput` : un pas décimal ne cumule plus d'erreur de flottant ; rien d'émis hors
  bornes pendant la frappe (la sortie ramène dans les bornes) ni en sortant sans
  changement ; les espaces de milliers sont lus (« 1 000,5 »).
- `Slider` / `RangeSlider` : calage aux décimales de `min` ; Page± avance d'un pas au
  moins ; deux poignées confondues à `max` se reprennent à la souris.
- `Table` : un clic sur l'icône d'un bouton de ligne ne déclenche plus `onRowClick` ;
  « Tout sélectionner » garde les lignes sélectionnées hors de l'affichage.
- `Toast` : `duration: Infinity` garde le toast (il partait aussitôt) ; fermer un toast
  focalisé passe le focus au voisin, et les autres ne restent plus suspendus.
- `Snippet` : plus de « Copié » quand le presse-papiers est indisponible.

**Rendu et accessibilité**

- `Checkbox` : une case partielle (`indeterminate`) montre un tiret.
- `--camply-hover-soft` redéfini dans le thème clair : posé sous `<html>`, le thème
  héritait du survol sombre (menus et listes sans surbrillance visible).
- `Spinner` / `Dots` : le nom est le texte de la région live (certains lecteurs d'écran
  taisaient l'`aria-label`).
- `Tabs` : ids valides pour toute valeur ; `aria-controls` et `aria-labelledby` ne
  pointent plus dans le vide.

## [0.2.0] — 2026-10-11

Changements depuis `0.1.0-beta.0`. `tsc` signale la plupart des ruptures ; celles
qu'il ne voit pas sont marquées **⚠️ silencieuse** et se relisent à la main.

### ⚠️ Changements cassants

#### Vocabulaire : `variant` dit la forme, `tone` dit le sens

- **`ButtonVariant` perd `"danger"`** — l'union confondait la forme
  (`primary`/`secondary`/`ghost`/`soft`) et la sémantique. Un axe `tone?: Tone`
  (défaut `accent`) apparaît sur `Button` et `IconButton`.
  - `<Button variant="danger">` → `<Button tone="danger">` (rendu identique :
    `primary` est déjà la forme par défaut).
  - `<IconButton variant="danger">` → `<IconButton variant="soft" tone="danger">`
    — **pas** `tone="danger"` seul : l'ancien `danger` d'IconButton peignait un
    fond *doux*, et sa forme par défaut est `secondary`.
- **`"warning"` n'est plus accepté**, ni sur `Badge` ni sur `Tooltip` : écrire
  `tone="warn"`. Le rendu est identique.
- ⚠️ **silencieuse** — Les classes `.camply-button__danger` /
  `.camply-iconbutton__danger` disparaissent : viser `.camply-button__tone-danger`
  et y redéfinir les variables du ton (`--_c`, `--_soft`, `--_ink`…), ce qui
  repeint toutes les formes d'un coup. Une classe de ton est de plus toujours
  émise (`camply-button__tone-accent` même sans prop `tone`) : instantanés et
  sélecteurs `[class="…"]` exacts sont à régénérer.
- ⚠️ **silencieuse** — Les tokens `--camply-warning`, `-contrast`, `-soft` et
  `-border` deviennent `--camply-warn*` dans les deux thèmes, et
  `.camply-tooltip__warning` devient `.camply-tooltip__warn`. Une feuille de thème
  qui les surchargeait cesse de s'appliquer. (`--camply-gradient-warn` ne bouge pas.)
- ⚠️ **silencieuse** — `Badge` prend ses tons dans la table partagée de `Button`.
  Le ton `neutral` avait dérivé et se réaligne (texte `text-muted` → `text`, fond
  `border-soft` → `fill-2`), et ses variables privées passent de `--_fg` / `--_bg`
  / `--_solid-bg` à `--_ink` / `--_soft` / `--_c`.

#### État : un seul contrat

- **`Alert`, `Banner` et `Spoiler` deviennent pilotables** (`open` / `defaultOpen` /
  `onOpenChange`) : un bandeau refermé ne pouvait jamais être rouvert. `onDismiss`
  disparaît — `<Alert dismissible onDismiss={f} />` →
  `<Alert dismissible onOpenChange={(o) => { if (!o) f(); }} />`.
- ⚠️ **silencieuse** — `Meter.formatValue` passe de `(value, max)` à
  `(value, min, max)`. Un callback à deux paramètres compile toujours, mais son
  2ᵉ argument reçoit désormais `min`.
- `Carousel` : `dots` est supprimé au profit de `indicator`, qui accepte en plus
  `"none"` — `dots={false}` → `indicator="none"`.
- `DatePickerProps` devient une **union discriminée** sur `mode` : `mode="single"`
  et `mode="range"` n'acceptent plus les props de l'autre. Un
  `interface X extends DatePickerProps` ne compile plus — écrire
  `type X = DatePickerProps & { … }`.
- ⚠️ **silencieuse** — `DatePicker` déduit le premier jour de la semaine de la
  locale quand `weekStartsOn` est absent (`locale="en-US"` commence dimanche).
  Passer `weekStartsOn={1}` pour retrouver le lundi systématique.

#### Les invariants ARIA ne s'écrasent plus

Ce dont dépend la sémantique d'un composant est posé **après** `...rest` et
**retiré du type public** : passer l'un de ces attributs ne compile plus. Il était
jusqu'ici soit ignoré, soit accepté puis faussé en silence.

- `Select`, `Combobox`, `MultiSelect` : `role`, `aria-expanded`, `aria-haspopup`,
  `aria-controls`, `aria-activedescendant`, `aria-required` (+ `aria-autocomplete`).
- `Tab` / `TabList` / `TabPanel` : `role`, `id`, `aria-selected`, `aria-controls`,
  `tabIndex`, `aria-orientation`, `aria-labelledby`.
- `RadialProgress` : `role` et `aria-valuenow` / `-min` / `-max`.
- `Switch` : `role`. `RadioGroup` : `role`, `aria-required`. `Rating` : `role`,
  `aria-orientation`, `aria-disabled`, `aria-readonly`, `aria-required`.
  `SegmentedControl` : `role`, `aria-orientation`, `aria-readonly`, `aria-required`.
- `Toggle` : `role`, `aria-pressed`. `Tree` : `role`. `ToastProvider` : `aria-live`,
  `aria-atomic`.
- `IconButton` : `aria-label` — `label` le fournit déjà ; `aria-labelledby` reste
  ouvert pour nommer par un élément existant.
- `Modal`, `Drawer`, `Sheet`, `CommandPalette` : `role`, `aria-modal`, `tabIndex`,
  `dangerouslySetInnerHTML`.
- ⚠️ **silencieuse** — Un `aria-describedby` ou `aria-labelledby` passé à un champ
  ne **remplace** plus le lien vers le message d'aide ou d'erreur du `Field`, il
  s'y **ajoute**. Avant, un champ affichait « Email invalide » sans que le lecteur
  d'écran ne l'annonce.

#### Dialogues

- `Modal`, `Drawer`, `Sheet` et `CommandPalette` acceptent **`ref`, `id`, `aria-*`,
  `data-*`** et les attributs natifs de leur panneau ; la ref vise le **panneau**
  (`role="dialog"`), pas le voile. Ce sont donc des composants `forwardRef` : un
  code qui les annotait `React.FC<ModalProps>` ou les appelait comme une fonction
  ne compile plus → `typeof Modal`, et `<Modal {...props} />`.
- `CommandPaletteProps` n'accepte plus d'enfants (ils étaient déjà ignorés au
  rendu) : passer par `commands` / `emptyMessage` / `placeholder`.

#### Comportements

- ⚠️ **silencieuse** — **`preventDefault()` du consommateur fait barrage.** Le
  déclencheur d'un `Popover` ou d'un `DropdownMenu` ignorait le veto posé dans son
  `onClick`. Conséquence : un déclencheur `<a href="#">` dont l'`onClick` coupe la
  navigation n'ouvre plus la couche — utiliser un `<button type="button">`.
- ⚠️ **silencieuse** — **La recherche clavier des menus accumule les frappes**
  (pattern APG) : dans `DropdownMenu` et `Menubar`, « pr » vise « Profil » au lieu
  de la première entrée en « r ».
- ⚠️ **silencieuse** — **`Menubar` appelle `onSelect` avant de fermer**, comme
  `DropdownMenu` : il fermait d'abord, et reprenait de force le focus qu'un
  `onSelect` venait de déplacer (vers une modale, un champ). Ses entrées gagnent
  aussi le veto `preventDefault()`.
- ⚠️ **silencieuse** — **Un champ désactivé ne soumet plus sa valeur.** Les
  widgets dont le contrôle n'est pas un `<input>` (`Select`, `MultiSelect`,
  `Combobox`, `DatePicker`, `ColorPicker`, `Rating`, `SegmentedControl`, `Slider`,
  `RangeSlider`, `TagInput`) émettaient un `<input type="hidden">` qui ignorait
  `disabled`. Conforme au HTML natif désormais — vérifier les traitements serveur.
- ⚠️ **silencieuse** — **`Slider`, `RangeSlider` et `Rating` passent par `Field`**
  (voir *Ajouté*). Le DOM change : un `<div class="camply-field">` s'intercale et
  le libellé devient un `<label class="camply-field__label">` — une surcharge
  visant `.camply-slider__label` doit passer à
  `.camply-slider__root .camply-field__label`.

#### Types

- **`Column<Row>` est une union** : une colonne adossée à un champ (`key` = une
  clé de `Row` dont la valeur est affichable) garde `cell` optionnel ; une colonne
  calculée (`key` libre) **exige `cell`**. Une faute de frappe sur `key` échoue à
  la compilation au lieu de rendre une cellule vide.
  - `{ key: "actions", header: "" }` → ajouter `cell: (r) => <Actions row={r} />`
  - `{ key: "createdAt", header: "Créé le" }` (champ `Date`, non affichable) →
    ajouter `cell: (r) => r.createdAt.toLocaleDateString()`
  - Sur un `Row` typé lâche (`Record<string, unknown>`), *toute* colonne exige un
    `cell` : typer les lignes avec une interface concrète.
- **`TreeNode<T>` porte des données** (`data?: T`) et `onSelect?: (id, node)`
  reçoit le nœud ; les rappels à un paramètre compilent toujours. `Tree` étant
  générique, `ComponentProps<typeof Tree>` ne marche plus : écrire
  `TreeProps<MonType>`.
- **`Avatar.size` accepte l'échelle nommée** : `Size | number` (`"md"` vaut les
  52 px d'avant). Casse la *lecture* de la valeur (`size * 2`), pas son écriture.
- `AvatarGroupProps.avatars` n'accepte plus `size` ni `status` par entrée : le
  groupe les imposait de toute façon.
- `Meter.label` passe de `ReactNode` à `string` : il sert de nom accessible.

### Corrigé

- **Échap fermait deux couches d'un coup** : un `Select` ouvert dans une `Modal`
  partait avec elle. Dialogues et couches de survol (`Tooltip`, `HoverCard`)
  s'empilent maintenant dans la pile partagée — Échap ferme un niveau à la fois,
  et un clic dans un dialogue ouvert depuis un `Popover` ne referme plus ce dernier.
- **`CamplyProvider` ne traduisait pas la moitié de la librairie** : une quinzaine
  de textes étaient codés en dur en français. Toute la lib suit désormais
  `prop ?? labels.clé` ; `CamplyLabels` passe de 23 à 51 clés.
- `Select`, `Combobox`, `RadioGroup` et `Tree` ne pouvaient pas être vidés depuis
  le parent : remettre `value` à `undefined` faisait resurgir l'état interne.
- `Toggle` : un `onClick` du consommateur **écrasait** le basculement interne.
- `ToastProvider` : un `onFocus` ou `onPointerEnter` du consommateur écrasait la
  pause des notifications au survol et au focus (WCAG 2.2.1).
- Les props `onKeyDown` (`DropdownMenu`, `Menubar`), `onMouseLeave` (`Menubar`) et
  `onMouseEnter` / `onMouseLeave` (`HoverCard`) étaient acceptées puis jetées.
- `PinInput` : vider une cellule du milieu décalait tous les caractères suivants.
- `DatePicker` : effacer le texte ne vidait pas la date, l'ancienne valeur
  revenait au blur.
- `Combobox` : sélectionner une option renvoyait le focus sur `<body>` ; quitter
  le champ au clavier laissait la liste ouverte ; l'option active se
  réinitialisait à chaque rendu du parent quand `options` était un littéral.
- `ColorPicker` : les écouteurs de glisser posés sur `window` n'étaient retirés ni
  sur `pointercancel` ni au démontage.
- `Carousel` : en mode contrôlé, l'autoplay repartait à chaque rendu du parent.
- `Input` et `Textarea` : `className` allait sur l'enveloppe et `style` sur le
  contrôle — les deux visent maintenant l'enveloppe, comme sur les autres champs.
- `Modal` : une `description` sans `title` n'était jamais rendue.
- `formatFileSize` s'arrêtait aux mégaoctets (« 5120.0 Mo » pour 5 Go) et codait
  les unités françaises en dur.
- `Table` : les noms accessibles de ses cases de sélection échappaient à
  `CamplyProvider`.
- `Spinner` / `Dots` : un `aria-label` du consommateur restait inaudible (le
  composant se posait `aria-hidden` faute de prop `label`).
- `Kbd` : une séquence répétant une touche (`["⌘", "K", "K"]`) produisait des
  clés React dupliquées.
- `TabsVariant` n'était pas exporté.
- ⚠️ **silencieuse** — Deux libellés par défaut tutoyaient le lecteur, à rebours
  de tous les autres (infinitif ou nom) : `dropFiles` / `browseFiles` (« Glisse
  tes fichiers ou parcours » → « Déposer des fichiers ou parcourir ») et
  `commandPalettePlaceholder` (« Tape une commande ou recherche… » → « Rechercher
  une commande… »). Le ton appartient à l'application, via `CamplyProvider` ; un
  test l'impose désormais à toutes les clés.

### Accessibilité

- **Contraste forcé** (Windows High Contrast) : le focus visible disparaissait sur
  tous les composants (les ombres n'y sont pas peintes). Un bloc
  `@media (forced-colors: active)` repeint focus et états actifs.
- `CommandPalette` implémente le pattern APG « Combobox with Listbox Popup » : la
  navigation aux flèches était muette pour un lecteur d'écran.
- `Accordion` : le bouton d'en-tête vit dans un `<hN>` (prop `headingLevel`).
- `Tooltip` respecte WCAG 1.4.13 « Hoverable » : on peut amener le pointeur
  dessus sans qu'il disparaisse (prop `closeDelay`).
- `Select`, `MultiSelect` : `aria-controls` et `aria-activedescendant` ne pointent
  plus dans le vide ; `MultiSelect` gagne Home/End. Plus aucun `aria-controls` ne
  vise un élément absent (`Tabs`, `DatePicker`).
- `Rating` : son `role="radiogroup"` n'avait aucun nom accessible — il le tire
  maintenant de son `label`. `SegmentedControl` se nomme par `aria-label`.
- `Spinner` : les points échappaient au reset `prefers-reduced-motion`.
- Le piège de focus des dialogues couvre `iframe`, `audio/video[controls]`,
  `details > summary`, `[contenteditable]`, et ignore les sous-arbres `inert`.

### Ajouté

- **Tous les composants acceptent une `ref`** : `Select`, `MultiSelect`,
  `Combobox`, `DatePicker` et les 4 dialogues étaient les 8 seuls à ne pas le
  faire — `ref.current.focus()` après une erreur de validation, branchement direct
  sur react-hook-form.
- **`Accordion` contrôlé** (`value` / `onChange`, en plus de `defaultValue`) et
  **`Tree` au dépliage contrôlé** (`expanded` / `onExpandedChange`, en plus de
  `defaultExpanded`).
- **`ButtonGroup` accepte `size`** et la propage à ses `Button` / `IconButton` ;
  un enfant qui porte sa propre `size` l'emporte.
- **`Slider`, `RangeSlider` et `Rating` gagnent `hint` et `error`**, avec le
  câblage `aria-describedby` / `aria-invalid` des autres champs ; le `label` de
  `Rating` devient un libellé visible.
- **`@camply/ui/tokens.css`** : la couche partagée seule (tokens + utilitaires),
  sans laquelle les feuilles `@camply/ui/<Composant>/styles.css` étaient
  inutilisables.
- **`EmptyState`**, 60ᵉ composant (famille Feedback) : une zone sans contenu et
  la marche à suivre — `title`, `description`, `icon` décorative, `actions`,
  `headingLevel`, `align` (`center` · `start`). Ce n'est pas une région live :
  rien n'est annoncé d'office, le titre se lit dans le plan de la page.
- **`Button` et `IconButton` acceptent `asChild`** : l'unique enfant (un `<a>`,
  le `Link` d'un routeur) reçoit l'apparence, les icônes et la ref du bouton ;
  classes, styles et handlers se composent, ceux de l'enfant d'abord (règle 4).
  Désactivé ou en chargement, il porte `aria-disabled` et son clic est annulé
  avant tout handler — un `Link` désactivé ne navigue plus. Les deux boutons
  perdent le soulignement hérité des liens.
- **`toast({ action })`** : un bouton sous le texte (`{ label, onClick }`, type
  `ToastAction`), qui ferme le toast après `onClick` sauf `preventDefault()`.
- **`CardTitle` prend `headingLevel`** (défaut 3, le `<h3>` d'avant). Le type
  `HeadingLevel` (`2` à `6`) est partagé avec `AccordionItem` et `EmptyState`
  (règle 1).
- **`Stack` prend `as`** (`section`, `ul`, `nav`, `form`…, type `StackElement`) :
  la mise en page ne coûte plus la sémantique. Marges, retraits et puces de `ul`,
  `ol` et `fieldset` sont neutralisés. Sa ref devient `HTMLElement` — une ref de
  `HTMLDivElement` reste acceptée.
- **`Progress` prend `max`** (défaut 100) : `value` s'exprime dans cette échelle,
  `aria-valuemax` la suit et le pourcentage affiché en découle.
- **`Modal` prend `size="full"`** (type `ModalSize`) : toute la fenêtre, marges
  du voile comprises.
- **`Radio` prend `hint`** : une précision sous l'option, annoncée comme sa
  description — et non mêlée à son nom.
- Types publics : `ButtonTone`, `IconButtonTone`, `RenderableKey<Row>`,
  `FieldColumn<Row>`, `ComputedColumn<Row>`, `TabsVariant`, `ToastAction`,
  `CardTitleProps`, `StackElement`, `ModalSize`, `EmptyStateProps`,
  `EmptyStateAlign`.
- **Tests de rendu** (jsdom + Testing Library) dans un projet vitest « dom » :
  143 tests contre 27, tous sur des helpers purs, dans la bêta. Ils couvrent
  la pile d'Échap, le piège et la restauration du focus, le verrou de défilement,
  la soumission des champs désactivés, le mode contrôlé et la composition des
  handlers. `tests/` et la vitrine sont couverts par `typecheck`.
- CI : fraîcheur du barrel, `publint --strict` sur le paquet et plafond de taille
  de `dist`. `.gitattributes` (`eol=lf`) pour les contributeurs Windows.

### Documentation

- `AI-CONTEXT.md` niait trois API publiées (sous-chemins par composant, `Stack`,
  `CamplyProvider` / thème clair) ; ses compteurs et son tableau de tokens sont
  réalignés sur le code.
- Vitrine : les tableaux de props des 60 composants sont reconfrontés à leur
  interface réelle ; page `EmptyState`, démos de `toast({ action })`,
  `Progress max`, `Modal size="full"` et `Radio hint`.
- `AI-CONTEXT.md` : règles « un lien qui ressemble à un bouton » (`asChild`) et
  « titres et sémantique » (`headingLevel`, `Stack as`).
- `README.md` : les 8 conventions de la librairie, et ce que les outils vérifient
  ou non ; l'import CSS « au composant près » part de `@camply/ui/tokens.css`.

## [0.1.0-beta.0] — 2026-07-24

Première publication : 59 composants React en ESM non bundlé, un sous-chemin par
composant (`@camply/ui/Button`, `@camply/ui/Button/styles.css`), styles importés
par le consommateur (`@camply/ui/styles.css`), thème sombre par défaut et thème
clair scopable (`data-camply-theme="light"`), `CamplyProvider` (textes et locale),
directive `"use client"`, licence MIT.
