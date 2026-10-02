# Valdence Digital - Site One-Page : Design Spec
Date : 2026-05-19

---

## 1. Objectif

Créer un site one-page professionnel pour **Valdence Digital** présentant les offres commerciales de Yannick Bernard (développeur full-stack indépendant). Le site doit inspirer confiance, refléter une expertise technique réelle, et inciter les visiteurs à prendre contact.

---

## 2. Offres commerciales

1. Sites vitrines
2. Sites e-commerce
3. Applications web
4. Intervention en Assistance Technique / Consulting en entreprise

---

## 3. Stack technique

| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS |
| Formulaire | Server Action + Nodemailer (SMTP OVH) |
| Avis Google | Google Places API (fetch côté serveur) |
| Conteneurisation | Dockerfile multi-stage (standalone Next.js) |
| Déploiement | Coolify sur OVH Cloud Instance (via dépôt GitHub) |

---

## 4. Structure de fichiers

```
app/
  layout.tsx                  ← metadata SEO, polices, globals
  page.tsx                    ← import de toutes les sections
  actions/
    contact.ts                ← Server Action : validation + honeypot + Nodemailer
components/
  sections/
    Navbar.tsx
    Hero.tsx
    Services.tsx
    WhyUs.tsx
    Portfolio.tsx
    About.tsx
    Reviews.tsx
    Contact.tsx
    Footer.tsx
  ui/
    Button.tsx
    SectionWrapper.tsx
public/
  logo-dark.svg               ← logo noir (fond clair)
  logo-light.svg              ← logo blanc (footer/fond sombre)
docs/
  superpowers/specs/          ← specs de conception
Dockerfile                    ← multi-stage build
.env.local                    ← variables d'environnement (non commité)
.gitignore                    ← template Node mis à jour
```

---

## 5. Variables d'environnement

| Variable | Usage |
|---|---|
| `SMTP_HOST` | Serveur SMTP OVH |
| `SMTP_PORT` | Port SMTP (465 ou 587) |
| `SMTP_USER` | Adresse email d'envoi |
| `SMTP_PASS` | Mot de passe SMTP |
| `SMTP_TO` | Adresse de réception des formulaires |
| `GOOGLE_PLACES_API_KEY` | Clé API Google Places |
| `GOOGLE_PLACE_ID` | Identifiant de la fiche Google Business |

Toutes injectées via Coolify au déploiement.

---

## 6. Design visuel

### Palette

| Rôle | Valeur |
|---|---|
| Fond principal | `#f5f7f6` |
| Texte principal | `#111827` |
| Texte secondaire | `#6b7280` |
| Accent / couleur de marque | `#0d9488` (teal) |
| Fond footer | `#0f2a27` (teal très sombre) |
| Blanc | `#ffffff` |

### Typographie

- Titre display : **Sora** (Google Fonts) - grasse, géométrique, moderne
- Corps : **DM Sans** (Google Fonts) - lisible, sobre, bonne lisibilité à petite taille

### Motifs décoratifs

Cercles teal concentriques en arrière-plan du Hero et d'autres sections, opacité faible (5-15%), positionnés en coin supérieur droit. Ils apportent profondeur et identité sans alourdir la lecture.

### Logo

- Fond clair → `logo-dark.svg` (noir)
- Footer (fond sombre) → `logo-light.svg` (blanc)

---

## 7. Sections - détail

### 7.1 Navbar

- Logo gauche (noir, `logo-dark.svg`)
- Liens ancres : Services · Pourquoi Valdence · Réalisations · À propos · Avis · Contact
- Bouton CTA droit : "Parlons de votre projet" (teal, lien vers `#contact`)
- Sticky, fond blanc légèrement translucide au scroll

### 7.2 Hero

**Accroche principale :**
> Du code au clic - construisons ensemble.

**Sous-titre :**
> Développeur full-stack indépendant, nous travaillons avec vous - pas à votre place - pour créer des outils digitaux qui vous ressemblent.

**CTAs :**
- Principal : "Parlons de votre projet" → `#contact`
- Secondaire : "Nos services" → `#services`

**Décoration :** cercles teal en coin supérieur droit, positionnés derrière le texte.

### 7.3 Services

4 cartes en grille (2×2 sur desktop, 1 col sur mobile) :

| Offre | Description courte |
|---|---|
| Sites vitrines | Présence en ligne professionnelle, rapide à lancer et facile à maintenir. |
| Sites e-commerce | Boutiques performantes, conçues pour convertir et fidéliser. |
| Applications web | Outils métier sur mesure, robustes, évolutifs et bien documentés. |
| Consulting / AT | Accompagnement technique en entreprise : audit, conseil, renfort d'équipe. |

### 7.4 Pourquoi Valdence

3 arguments avec icône, titre et courte description :

1. **Expertise technique** - Full-stack confirmé (C#/.NET, Next.js, PostgreSQL…), 10+ ans de pratique en entreprise et en indépendant.
2. **Accompagnement sur mesure** - Chaque projet est unique. Nous adaptons notre approche à votre contexte, vos contraintes et vos objectifs.
3. **Un partenaire, pas un exécutant** - Nous construisons avec vous, pas à votre place. Votre compréhension du projet est notre priorité.

### 7.5 Réalisations (Portfolio)

Grille de 2 projets (extensible) :

| # | Titre | Catégorie | URL |
|---|---|---|---|
| 1 | Sagesse Holistique | Site vitrine | https://www.sagesse-holistique.fr/ |
| 2 | Jonathan Deymier | Refonte WordPress | https://www.jonathandeymier.com/ |

Chaque carte : capture d'écran placée dans `public/portfolio/` (format WebP recommandé, dimensions 800×500px), titre, catégorie badgée, bouton "Voir le site →" (lien externe, `target="_blank"`, `rel="nofollow noopener noreferrer`).

### 7.6 À propos

Disposition : photo (placeholder carré arrondi) à gauche + texte à droite (desktop), empilé sur mobile.

**Nom :** Yannick Bernard
**Titre :** CEO

**Texte :**
> Développeur full-stack indépendant depuis 2014, je conçois et réalise des sites vitrines, boutiques en ligne, applications web et intégrations sur mesure. Mon parcours en entreprise - de l'e-commerce grand public (Chausson.fr) aux marketplaces B2C/B2B (Opisto), en passant par des projets de R&D et de réalité augmentée - m'a forgé une vision à la fois technique et produit, rare chez un prestataire indépendant.
>
> Je travaille avec une attention constante portée à la qualité du code, à la maintenabilité et à l'évolution de votre projet dans le temps.
>
> Ce qui me distingue : je ne sous-traite pas vos besoins, je les comprends. Chaque projet démarre par une vraie conversation - pour livrer quelque chose qui vous ressemble et qui fonctionne.

**Lien :** [LinkedIn](https://www.linkedin.com/in/bernardyannick/) - icône + texte, `target="_blank"`, `rel="nofollow noopener noreferrer`

**Badges technologiques** (rangée en bas de la section) :
Icônes SVG via **Simple Icons** (bibliothèque open-source) + nom pour chaque techno : `C#` · `.NET` · `Next.js` · `React` · `TypeScript` · `PostgreSQL` · `SQL Server` · `WordPress`

### 7.7 Avis Google

- Fetch côté serveur (Server Component) via **Google Places API**
- Affichage : étoiles (★★★★★), texte de l'avis, prénom auteur, date formatée en français
- **Gestion d'erreur :** si l'appel API échoue (timeout, quota, clé manquante), affichage d'un message neutre + bouton **"Voir nos avis sur Google Maps"** renvoyant vers la fiche Google Business
- Stratégie de fetch : **ISR** avec `revalidate = 86400` (les avis se rafraîchissent tous les jours sans rebuild)

### 7.8 Contact

**Titre de section :** "Parlons de votre projet"

**Champs du formulaire :**

| Champ | Type | Obligatoire |
|---|---|---|
| Nom | text | Oui |
| Prénom | text | Oui |
| Nom de l'entreprise | text | Non (libellé "Facultatif") |
| Email | email | Oui |
| Code postal | text | Oui |
| Téléphone | tel | Oui (format +33) |
| Message | textarea | Oui (placeholder : "Dites-nous en plus sur votre projet") |
| `website` (honeypot) | text | Caché via décalage hors du viewport de 2612px car les robots détectent le display:none, doit rester vide |
| RGPD | checkbox | Oui |

**Texte RGPD :**
> J'ai été informé.e de mon droit de suppression, mon droit de consultation, et mon droit de modification des données personnelles récoltées sur ce formulaire. Mais aussi de la procédure d'exercice de mes droits, de la durée de conservation de mes données, et des conditions de gestions de ces dernières.

**Server Action `contact.ts` :**
1. Vérifier que le champ honeypot `website` est vide - sinon rejeter silencieusement
2. Valider tous les champs obligatoires côté serveur
3. Valider le format email et le format téléphone
4. Envoyer via Nodemailer + SMTP OVH vers `SMTP_TO`
5. Retourner `{ success: true }` ou `{ error: string }`

**UX :** affichage d'un message de succès ou d'erreur inline après soumission, sans rechargement de page.

### 7.9 Footer

- Fond : `#0f2a27` (teal très sombre)
- Logo blanc (`logo-light.svg`) centré ou aligné gauche
- Liens : Mentions légales · Politique de confidentialité
- Copyright : `© 2026 Valdence Digital - Tous droits réservés`

---

## 8. Dockerfile

Build multi-stage avec `output: 'standalone'` dans `next.config.ts` :

```dockerfile
# Stage 1 - Builder
FROM node:lts-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - Runner
FROM node:lts-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 9. .gitignore

Le `.gitignore` existant (template Node) sera complété avec :

```
# Next.js
.next/
out/

# Env local
.env.local
.env*.local

# Visual brainstorming sessions
.superpowers/
```

---

## 10. SEO & métadonnées

Dans `app/layout.tsx` :

- `title` : "Valdence Digital - Développement web & consulting"
- `description` : "Sites vitrines, e-commerce, applications web et consulting technique - Yannick Bernard, développeur full-stack indépendant depuis 2014."
- `og:image` placeholder
- `lang="fr"`

---

## 11. Accessibilité & responsive

- Markup sémantique (`<section>`, `<nav>`, `<main>`, `<footer>`)
- Attributs `aria-label` sur les éléments interactifs
- Contraste teal sur fond clair conforme WCAG AA
- Layout mobile-first via Tailwind (`sm:`, `md:`, `lg:`)
- Navigation clavier complète sur le formulaire

---

## 12. Ce qui est hors périmètre

- Blog / espace client
- Système de paiement
- Authentification
- CMS headless
- Mentions légales et politique de confidentialité (contenu textuel à fournir séparément)
