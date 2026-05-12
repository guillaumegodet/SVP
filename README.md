# SVP-mockups — Maquettes interactives SoVisuPlus

Ce dépôt héberge les maquettes interactives de [SoVisuPlus](https://github.com/CRISalid-esr/SoVisuPlus), le portail de visualisation de la production scientifique du consortium CRISalid.

L'objectif est de permettre aux membres du consortium de **tester les nouvelles fonctionnalités avant leur développement**, de donner du feedback, et de valider les choix UX collectivement.

## Tester la maquette

La maquette est accessible en ligne :

**https://crisalid-esr.github.io/SVP-mockups/**

Elle est mise à jour automatiquement à chaque modification du code source (branche `main`).

## Donner du feedback

Toute remarque, question ou suggestion se fait via les **[Issues GitHub](https://github.com/CRISalid-esr/SVP-mockups/issues)**.

Lors de la création d'une issue, utilisez les labels suivants :

| Label | Signification |
|---|---|
| `à valider` | Fonctionnalité soumise à l'avis du groupe |
| `validé` | Fonctionnalité approuvée, prête à passer en développement |
| `rejeté` | Fonctionnalité écartée après discussion |

Pas besoin de compte développeur pour ouvrir une issue : un compte GitHub suffit.

## Circuit de validation

```
Maquette publiée → Issue ouverte sur ce dépôt → Discussion → Validation
       └─ Si validé → Issue créée sur CRISalid-esr/SoVisuPlus pour le développement
```

Chaque issue de développement sur SoVisuPlus référence l'issue de validation correspondante pour assurer la traçabilité.

## Maquette source

La maquette originale est disponible sur Figma :
[Enhance Search Perspective](https://www.figma.com/design/iypkE58IquSknUG9f9BqDJ/Enhance-Search-Perspective)

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:3000`.
