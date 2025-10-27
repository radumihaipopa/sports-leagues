# Sports Leagues SPA

This is a single-page application (SPA) that shows a list of sports leagues with search and filter options. The project simulates a small part of an online bookmaker platform.

---

## What it does

- Fetches a list of sports leagues from TheSportsDB API.
- Lets you search leagues by name and filter by sport type (Soccer, Basketball, Motorsport, etc.).
- Displays league details: name (`strLeague`), sport (`strSport`), and alternative name (`strLeagueAlternate`).
- Clicking on a league fetches and shows its season badge.
- API responses are cached so repeated calls are avoided.
- Fully functional and responsive layout.

---

## Tech Stack

- React 18 + TypeScript
- Vite for development and bundling
- Axios for API requests
- Jest + React Testing Library for unit tests
- CSS Modules for styling

---
## Installation
```bash
git clone <your-repo-url>
cd sports-leagues
npm install
```

 ## Running the App
```bash
npm run dev
```
Then open your browser and
Visit http://localhost:5173.

## Running Tests
```bash
npm test
```
---
## Test coverage includes:

- API calls (fetchAllLeagues, fetchLeagueBadge)

- Component rendering (LeaguesPage)

- Cache functionality
---
## Design Decisions
- Component-based architecture: LeaguesPage, LeagueCard, SearchBar, SportFilter.

- Caching: In-memory cache to reduce repeated API calls.

- Responsive layout: CSS Grid for league cards.

- Error handling: Displays error messages when API calls fail.
---
## AI Tools Used
- ChatGPT: Assisted with TypeScript types, design architecture, testing setup, and code optimization.

- GitHub Copilot: Suggested component scaffolding and API call structures.

AI was mostly used for suggestions, prototyping, and speeding up development.

## API References
All Leagues: https://www.thesportsdb.com/api/v1/json/3/all_leagues.php

Season Badge: https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>

Documentation: TheSportsDB API
