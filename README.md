# @camply/ui

Bibliothèque de composants React pour Camply, publiable sur npm.

## Stack

- **Bun** — runtime et gestionnaire de paquets
- **TypeScript** — typage strict
- **tsup** — build ESM + CJS + déclarations `.d.ts`
- **Vite** — playground de développement local

## Démarrage rapide

```bash
# Installer les dépendances
bun install

# Lancer le playground (http://localhost:5173)
bun run dev

# Builder la lib pour npm
bun run build

# Vérifier les types
bun run typecheck
```

## Structure

```
src/
  components/     # Composants React
  index.ts        # Point d'entrée public
playground/       # App de dev pour tester les composants
dist/             # Sortie du build (généré)
```

## Ajouter un composant

1. Créer un dossier dans `src/components/MonComposant/` avec `MonComposant.tsx`, `MonComposant.css` et `index.ts` (qui importe le CSS)
2. Exporter depuis `src/index.ts`
3. Lancer `bun run build` pour générer les bundles et synchroniser les exports npm
4. Tester dans `playground/src/App.tsx`

## Utilisation (après publication)

```bash
bun add @camply/ui
```

```tsx
import { Button } from "@camply/ui";

export function Example() {
  return <Button variant="primary">Cliquer</Button>;
}
```

Le CSS de chaque composant est importé automatiquement par votre bundler (Vite, webpack, etc.) via les side-effects. Seul le CSS des composants réellement utilisés est inclus.

Import direct par composant (recommandé pour un tree-shaking maximal) :

```tsx
import { Button } from "@camply/ui/button";
```

## Publication sur npm

1. Mettre à jour `name`, `author` et `repository` dans `package.json`
2. Se connecter : `npm login`
3. Pour un package scopé public : ajouter `"publishConfig": { "access": "public" }`
4. Publier :

```bash
bun run build
npm publish --access public
```

## Scripts

| Script       | Description                          |
| ------------ | ------------------------------------ |
| `bun run dev`       | Playground Vite en mode dev          |
| `bun run build`     | Build de la lib dans `dist/`         |
| `bun run typecheck` | Vérification TypeScript sans emit    |
