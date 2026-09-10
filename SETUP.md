# 🚀 Guide för installation och körning (Setup Guide)

Denna guide beskriver steg för steg hur du sätter upp och kör **Jobbportalen** på en ny dator eller ett nytt system.

---

## 📋 Förkrav (Prerequisites)

Innan du börjar behöver du ha följande installerat på din dator:

1. **Node.js**: Version **18.18.0** eller senare (LTS version 20 rekommenderas starkt).
   * Ladda ner från: [https://nodejs.org/](https://nodejs.org/)
   * Kontrollera i terminalen med:
     ```bash
     node -v
     ```
2. **npm** (följer med Node.js) eller annan pakethanterare:
   * Kontrollera med:
     ```bash
     npm -v
     ```
3. **Git**: För att klona och hantera versionshantering.
   * Ladda ner från: [https://git-scm.com/](https://git-scm.com/)

---

## 🛠️ Steg-för-steg installation

### Steg 1: Navigera till rätt projektmapp
Se till att du står i mappen `job-portal` (där `package.json` ligger):

```bash
# Om du befinner dig i roten av repositoryt:
cd job-portal
```

> ⚠️ **Viktigt**: Kör inte `npm` från överordnade mappar eller inifrån mappen `.git`. Terminalen måste stå i `.../job-portal`.

---

### Steg 2: Installera alla beroenden (Dependencies)
Kör följande kommando för att ladda ner och installera alla nödvändiga npm-paket:

```bash
npm install
```

Detta installerar bland annat:
* **Next.js 16** (React framework med App Router)
* **React 19 & React-DOM 19**
* **@storyblok/react** (Integration mot Storyblok CMS)
* **Tailwind CSS v4** & PostCSS
* **TypeScript & ESLint**

---

### Steg 3: Skapa miljövariabler (.env.local)
Projektet hämtar dynamiskt innehåll (jobb, sidor, menyer) från Storyblok CMS via ett API.

1. Skapa en fil med namnet `.env.local` i roten av mappen `job-portal`:
   ```bash
   cp .env.example .env.local
   # På Windows PowerShell kan du använda:
   # Copy-Item .env.example .env.local
   ```

2. Öppna `.env.local` och fyll i din Storyblok Delivery API Token:
   ```env
   STORYBLOK_DELIVERY_API_TOKEN=din_storyblok_token_har
   STORYBLOK_VERSION=draft
   ```
   *(Tips: Om du har tillgång till befintligt projektteam, be om deras `STORYBLOK_DELIVERY_API_TOKEN`).*

---

### Steg 4: Starta utvecklingsservern (Development Mode)
När beroendena är installerade och `.env.local` är på plats, starta servern med:

```bash
npm run dev
```

Servern startar normalt på [http://localhost:3000](http://localhost:3000).  
Öppna webbläsaren och gå till `http://localhost:3000`.

---

## 🏗️ Bygga för produktion (Production Build)

Om du vill testa ett optimerat produktionsbygge lokalt:

```bash
# 1. Bygg applikationen
npm run build

# 2. Starta produktionsservern
npm run start
```

---

## 🧪 Tillgängliga skript

Alla tillgängliga kommandon i `package.json`:

| Kommando | Beskrivning |
| :--- | :--- |
| `npm run dev` | Startar utvecklingsservern med Turbopack och hot-reloading |
| `npm run build` | Kompilerar och bygger Next.js för produktion samt typkontrollerar |
| `npm run start` | Kör produktionsservern (efter att `npm run build` har körts) |
| `npm run lint` | Kör ESLint för att hitta kodstil- och syntaxproblem |
| `npx tsc --noEmit` | Kontrollerar TypeScript-typer utan att generera filer |

---

## 🌐 Storyblok CMS Struktur

Projektet förväntar sig följande struktur i Storyblok-rymden (Space):

### 1. Berättelser (Stories)
* `home` (Component: `page` med blocks som `hero`, `grid`, `button`, etc.)
* `jobs/` (Mapp med startpage `jobs` samt underberättelser av typen `job-post`)
* `config` *(valfritt)*: Innehåller global header och footer. Om den saknas används portalens inbyggda fallback-header och footer.

### 2. Datakällor (Datasources)
* Slug: `job-departments`  
  Används för filtrering av avdelningar i verktygsfältet. Innehåller poster som:
  * `utveckling` -> "Utveckling"
  * `design` -> "Design"
  * `marknadsforing` -> "Marknadsföring"

### 3. Visual Editor (Live preview)
För att förhandsgranska i Storybloks redigerare:
* Sätt Location (Default Environment) i Storyblok Space Settings till:  
  `http://localhost:3000/` (eller din publika Vercel/tunnel-URL).

---

## ❓ Felsökning (Troubleshooting)

### Fel: `Could not read package.json: ENOENT`
* **Orsak**: Du kör `npm run dev` i fel mapp (t.ex. i föräldramappen `individuell` eller i `.git`).
* **Lösning**: Kontrollera din sökväg med `pwd` (eller `Get-Location` i PowerShell). Flytta dig till projektmappen:
  ```bash
  cd c:\Users\milad\Documents\CMS\individuell\job-portal
  npm run dev
  ```

### Fel: Port 3000 är upptagen
* Om port 3000 används av en annan process kommer Next.js automatiskt fråga eller starta på port `3001` ([http://localhost:3001](http://localhost:3001)).

### Inga jobb visas eller API-fel i terminalen
* Kontrollera att `.env.local` finns i `job-portal`-mappen och innehåller en giltig `STORYBLOK_DELIVERY_API_TOKEN`.
* Starta om dev-servern (`Ctrl+C` och sedan `npm run dev`) efter att du har ändrat i `.env.local`.
