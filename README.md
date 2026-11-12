# Badminton Career Manager 🏸

A browser-based badminton career simulator. Create your player, train, enter tournaments, earn ranking points and manage your career season by season.

## Current features

- Player creation (name, age, country, club, discipline and dominant hand)
- Training sessions for technique, physical preparation and mental performance
- Training load and fatigue management, with recovery and weekly progression
- Regional, national, junior and senior international tournaments
- Simulated match outcomes based on player development, form, energy and fatigue
- Ranking points, career results, prize money and competition costs
- Personal-life system: school, friends, family, wellbeing, stress and weekly choices\n- Living junior circuit with fictional rivals who train, compete, age and gain ranking points autonomously\n- Career history and automatic local save in the browser

## Run locally

Open `index.html` in a modern browser. No build step or dependencies are required.

## Publish with GitHub Pages

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. The workflow in `.github/workflows/deploy.yml` deploys the site whenever changes are pushed to `main`.
4. Once the first deployment finishes, open the Pages URL shown in the repository settings.

## Save data

Career data is stored in the browser using `localStorage`. It stays in that browser on that device; it is not yet synced between devices.

## Project structure

- `index.html` — app shell
- `styles.css` — interface and responsive styling
- `app.js` — career logic and game systems
- `.github/workflows/deploy.yml` — GitHub Pages deployment

---
Built iteratively as a badminton career management game.
