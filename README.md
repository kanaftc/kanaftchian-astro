# Kanaftchian.com — Ultra Premium Photography Website

> Site web ultra premium pour Hani Kanaftchian, photographe professionnel à Bruxelles.

## Stack

- **Framework** : [Astro 5](https://astro.build) (Static Site Generation + Islands Architecture)
- **CSS** : Tailwind CSS 4
- **Composants interactifs** : React 19 (islands)
- **Animations** : CSS natif + GSAP pour les effets cinématiques
- **Déploiement** : Cloudflare Pages

## Structure

```
src/
├── layouts/          # BaseLayout, ServiceLayout
├── components/
│   ├── ui/           # Button, Card, PhotoCard, Lightbox
│   ├── sections/     # Hero, Stats, Portfolio, Testimonials, CTA
│   └── navigation/   # Nav, MegaNav, Footer
├── pages/            # Routes (slugs exacts de kanaftchian.com)
├── content/          # Collections Astro (services, portfolio)
├── styles/           # CSS global + tokens
└── assets/images/    # Images optimisées
```

## Pages & Slugs

| Page | Slug |
|------|------|
| Accueil | `/` |
| Portrait | `/portrait` |
| Studio (portfolio) | `/studio` |
| Mariage | `/mariage` |
| Grossesse | `/grossesse` |
| Paysages | `/paysages` |
| Vidéos | `/videaste-bruxelles` |
| Tarifs | `/tarifs-photographe` |
| Le Studio | `/studio-photo-bruxelles` |
| Références | `/avis-clients-google` |
| À Propos | `/a-propos` |
| Contact | `/contact` |
| Réservation | `/reservation-shooting-photo` |
| Portfolio | `/photos` |

## Développement

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # Build statique dans dist/
pnpm preview    # Preview du build
```

## Design System

- **Style** : Cinématique sombre (Art Gallery)
- **Palette** : Fond #050507, Accent or chaud #C8A87C
- **Typographie** : Playfair Display (display) + Inter (body)
- **Approche** : Mobile-first, performance-first

---

Orchestré par [Kanexio](https://weblevel.pro) — © 2026
