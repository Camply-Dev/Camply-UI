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

1. Créer un dossier dans `src/components/MonComposant/`
2. Exporter depuis `src/index.ts`
3. Tester dans `playground/src/App.tsx`

## Utilisation (après publication)

```bash
bun add @camply/ui
```

```tsx
import { Button } from "@camply/ui";
import "@camply/ui/styles.css";

export function Example() {
  return <Button variant="primary">Cliquer</Button>;
}
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
