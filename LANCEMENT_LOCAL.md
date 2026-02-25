# 🚀 Guide de lancement local - SoVisuPlus (SVP)

Ce projet utilise **Vite** et **React**. La structure est particulière car elle possède une branche `main` pour le code source et une branche `gh-pages` pour le déploiement.

## 🏃 Lancement rapide

Si vous venez d'ouvrir le projet ou si vous étiez sur la branche de déploiement :

1.  **S'assurer d'être sur la bonne branche (Code Source) :**
    ```powershell
    git checkout main
    ```

2.  **Lancer le serveur :**
    Ouvrez un terminal et tapez :
    ```powershell
    cmd /c "npm install && npm run dev"
    ```
    *Note : On utilise `cmd /c` pour éviter les problèmes de droits de scripts (Execution Policy) sur Windows.*

3.  **Accéder au site :**
    👉 [http://localhost:3000/SVP/](http://localhost:3000/SVP/)

---

## 🛠️ Commandes utiles

| Commande | Action |
| :--- | :--- |
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Prépare les fichiers pour la mise en ligne (dossier `build`) |
| `npm run deploy` | Envoie la version compilée sur GitHub Pages |

## ⚠️ Points d'attention
*   **Branche `gh-pages`** : Ne modifiez jamais de fichiers quand vous êtes sur cette branche. C'est une branche "automatique" qui ne contient que le résultat du build.
*   **Port** : Le serveur est configuré sur le port `3000`.
*   **Tailwind v4** : La configuration se fait principalement dans `src/index.css`.
