# Easter Egg VS Code Page - Design Spec

**Goal:** Créer une page `/yannick` qui simule un éditeur VS Code affichant un composant React absurde avec la photo de profil en "aperçu live".

**Architecture:** Page Next.js App Router standalone (`src/app/yannick/page.tsx`), rendu statique, noindex. Aucun état côté client, aucune dépendance supplémentaire. Tout le layout VS Code est fait en Tailwind + classes `font-mono`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, `next/image`, police Sora/DM Sans héritée du layout.

---

## Route & Metadata

- **Route :** `/yannick`
- **Metadata :** `title: 'Yannick.tsx - Valdence Digital'`, `robots: { index: false, follow: false }`
- **Pas de Navbar ni Footer** - page autonome, plein écran

## Layout VS Code (dark, `#1e1e1e`)

### Barre de titre
- Boutons macOS simulés (rouge `#ff5f56`, jaune `#ffbd2e`, vert `#27c93f`)
- Titre centré : `yannick.tsx - Valdence Digital`
- Fond `#3c3c3c`

### Explorer latéral (gauche, ~220px)
Titre `EXPLORATEUR` puis arborescence :
```
📁 VALDENCE-DIGITAL
  📄 yannick.tsx         ← actif (surligné)
  📄 fix-FINAL-v3-REAL.ts
  📄 README_personne_lit.md
  📁 node_modules        (22 847 fichiers)
  📄 TODO-urgent-pas-vraiment.txt
```

### Onglets éditeur
Un seul onglet actif : `● yannick.tsx` (point = unsaved changes)

### Panneau principal - Éditeur (gauche 55%)
Faux code TypeScript avec syntax highlighting via classes Tailwind + couleurs VS Code :
- Numéros de ligne à gauche
- JSDoc absurde de ~10 lignes pour la fonction principale
- Commentaires humouristiques :
  - `// TODO: refactorer quand j'ai du temps (ouvert depuis 2019)`
  - `// BUG: fonctionne. raison inconnue. ne pas toucher.`
  - `// FIXME: ce n'est pas un bug, c'est une feature`
  - `// @deprecated mais ça marche alors on laisse`
- Props typées absurdement : `humeurDuMatin: 'caféinée' | 'décaféinée'`
- Le composant renvoie `<Image src="/photo_yb.webp" ... />`

### Panneau preview (droite 45%)
- En-tête `Aperçu en direct` avec icône ▶
- Ta photo `photo_yb.webp` centrée, `object-cover`, `rounded-sm`

### Barre de statut (bas)
Fond `teal` (couleur de la charte Valdence) :
- `⎇ main ● 247 commits en retard`
- `TypeScript 5.0`
- `Ln 42, Col 1`
- `UTF-8`
- `Espaces: 2`

## Contraintes

- Plein écran `100vw x 100vh`, pas de scroll
- Police `font-mono` pour tout le code
- Responsive : sur mobile, cacher l'explorer et la preview, montrer uniquement l'éditeur + barre de statut
- Image `photo_yb.webp` servie via `next/image` (déjà en `public/`)
- Aucun état React nécessaire (`'use client'` non requis)
