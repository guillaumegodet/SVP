# Configuration du routage React Router

## URLs disponibles

L'application utilise maintenant React Router (avec HashRouter) pour gérer les différentes pages avec des URLs distinctes :

- **Dashboard** : `https://relic-pants-21068819.figma.site/#/dashboard`
- **Publications** : `https://relic-pants-21068819.figma.site/#/publications`
- **Expertises** : `https://relic-pants-21068819.figma.site/#/expertises`

## Fonctionnement

### Structure des composants

1. **App.tsx** : Composant wrapper qui enveloppe l'application dans `<BrowserRouter>`
2. **AppContent** : Composant principal qui contient toute la logique de l'application
3. **AppRouter** : Composant utilitaire qui synchronise l'URL avec l'état `currentPage`
4. **Sidebar** : Composant de navigation qui utilise les `<Link>` de React Router

### Navigation

La sidebar utilise des composants `<Link>` de React Router pour la navigation :
- Cliquer sur un lien change l'URL dans le navigateur
- Le composant `AppRouter` détecte le changement d'URL
- L'état `currentPage` est mis à jour
- Le contenu principal s'affiche en fonction de `currentPage`

### Redirection par défaut

Si l'utilisateur accède à la racine `/`, il est automatiquement redirigé vers `/publications`.

## Notes techniques

- Le système utilise `HashRouter` pour garantir la compatibilité avec Figma Make
- HashRouter utilise le symbole `#` dans l'URL mais fonctionne sans configuration serveur
- La navigation préserve l'état de l'application (filtres, tri, etc.)
- Les URLs contiennent un `#` (par exemple `/#/publications`) ce qui est nécessaire pour le routing côté client sans serveur
