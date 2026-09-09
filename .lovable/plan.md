# AgriSmart — Smart Farming Web App

A nature-inspired farming app: clean greens, soft shadows, rounded cards, desktop sidebar + mobile bottom navigation.

## Pages

1. **Landing** (`/`) — hero with "Smart Farming, Better Future", tagline, feature highlights, top navigation, calls to action into login/register.
2. **Login** (`/login`) and **Register** (`/register`) — friendly forms with validation messages.
3. **Dashboard** (`/dashboard`) — farm overview metrics (fields, active crops, yield estimate, alerts), weather summary card, pending tasks list, personalised recommendations.
4. **Crops** (`/crops`) — searchable, filterable catalog (Wheat, Rice, Cotton, Tomato, Potato, Maize, Sugarcane, Onion) with a detail view per crop covering season, growth stages, soil needs, irrigation, common pests and diseases.
5. **Pesticides** (`/pesticides`) — directory filtered by crop and pest, with dosage per acre, application interval, and safety/handling guidance.
6. **Fertilizers** (`/fertilizers`) — grouped tabs for Organic, Inorganic, Biofertilizers with nutrient content, best-use crops, and application rates.
7. **Weather** (`/weather`) — today's conditions plus a 5-day forecast and farming advisories tied to the conditions.
8. **Plant Scan** (`/scan`) — upload a leaf photo, animated scanning simulation, then a diagnosis card with confidence, severity, treatment steps and prevention tips.
9. **Alerts** (`/alerts`) — notification center with severity badges, categories (weather, pest, irrigation, task), read/unread and filtering.
10. **Settings** (`/settings`) — farmer profile, farm details, units, language, notification toggles.

## Look and feel

Green primary palette with warm earth accents, soft elevated cards, generous rounding, subtle hover lifts, and a legible modern typeface pairing. Light and dark modes both supported through design tokens.

## Technical notes

- TanStack Start file routes; a shared app-shell layout provides the collapsible desktop sidebar and mobile bottom nav for all signed-in pages, while landing and auth pages stay standalone.
- shadcn components (card, tabs, input, select, badge, dialog, progress, sheet, sidebar) styled through tokens in `src/styles.css` — no hardcoded colors.
- Content for crops, pesticides, fertilizers, weather, alerts and scan results lives in typed local data modules, so every screen is fully populated.
- Auth and scanning are front-end demos: login/register accept input and route into the dashboard, and the scan produces results from the bundled sample diagnoses. No backend or real image analysis yet.
- Per-page SEO metadata (title, description, social tags) on every route.

## Not included yet

Real accounts, saved data, live weather feeds, and true AI disease detection all need a backend — say the word and I'll add Cloud and wire them up.
