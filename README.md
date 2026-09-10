# Jobbportalen 💼

En modern karriär- och rekryteringsportal byggd med **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** och **Storyblok Headless CMS**.

---

## ⚡ Snabbstart (Quick Start)

För en komplett installationsguide på nya system, se **[SETUP.md](SETUP.md)**.

```bash
# 1. Gå till projektmappen
cd job-portal

# 2. Installera beroenden
npm install

# 3. Skapa miljövariabler
cp .env.example .env.local
# Fyll i din STORYBLOK_DELIVERY_API_TOKEN i .env.local

# 4. Starta utvecklingsservern
npm run dev
```

Öppna därefter [http://localhost:3000](http://localhost:3000) i webbläsaren.

---

## 🌟 Funktioner

* **Dynamisk Storyblok CMS Integration**:
  * Visuell live-redigering (Visual Editor) med `@storyblok/react`.
  * Modulära sidor via blockkomponenter (`Hero`, `Teaser`, `Grid`, `Feature`, `Button`, `TextSection`).
  * Konfigurerbar global Header och Footer via CMS.
* **Jobbannonser & Sökfunktion**:
  * Filtrering på avdelning (kopplat till Storyblok Datasource `job-departments`).
  * Fritextsökning på titlar och nyckelord.
  * Dynamiska annonssidor under `/jobs/[slug]` med rika textformat och delningsknapp.
* **Modern design & UX**:
  * Mörkt och ljust läge (Dark/Light mode) med lokal sparning i `localStorage`.
  * Responsiv layout anpassad för mobil, surfplatta och desktop.
  * Mobil lådmeny (Drawer navigation).
* **Prestanda & SEO**:
  * Statisk förgenerering (SSG) för snabb sidladdning.
  * Optimerad metadata-hierarki för sökmotorer.
  * On-demand webhook-revalidering via `/api/revalidate`.

---

## 📁 Projektstruktur

```text
job-portal/
├── app/                  # Next.js App Router (sidor, layout, API-routes)
│   ├── [slug]/           # Dynamiska CMS-sidor
│   ├── api/revalidate/   # Webhook för on-demand cache-revalidering
│   ├── jobs/             # Jobblistning och söksida
│   │   └── [slug]/       # Individuell jobbannons
│   ├── layout.tsx        # Global layout med Header, Footer och tema
│   ├── not-found.jsx     # Anpassad 404-felsida
│   └── page.tsx          # Startsida
├── COMPONENTS/           # React-komponenter & Storyblok-block
│   ├── Header.jsx & HeaderShell.jsx
│   ├── Footer.jsx & FooterLink.jsx
│   ├── JobCard.jsx & JobPost.jsx & JobsList.jsx
│   ├── Toolbar.jsx & SearchBar.jsx & DepartmentFilter.jsx
│   ├── Hero.jsx, Teaser.jsx, Grid.jsx, Feature.jsx, Button.jsx
│   └── ThemeToggle.jsx, ShareButton.jsx
├── lib/
│   └── storyblok.js      # Storyblok API-klient, queries och helpers
├── public/               # Statiska filer
├── .env.example          # Exempel på miljövariabler
├── SETUP.md              # Fullständig installationsguide för nya datorer
└── package.json          # Beroenden och npm-skript
```

---

## 📜 Licens och kontakt
Utvecklad som en del av kursen Content Management System (CMS). För frågor om Storyblok-rymden, kontakta projektansvarig.
