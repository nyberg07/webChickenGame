# Web Chicken Game

## Beskrivning
Web Chicken Game är ett tvåspelars tärningsspel där målet är att samla poäng utan att gå över 100 poäng. Spelarna turas om att kasta tärning, och kan välja att stanna och spara poäng. Den som först når 100 poäng vinner. Vinnaren kan skriva in sitt namn och highscore sparas på servern.

## Funktioner
- Två spelare turas om att kasta tärning.
- Möjlighet att stanna och låta motståndaren fortsätta.
- Highscore sparas på servern och visas i en lista med alla spelare och deras totala vinster.
- Spelets utseende kan enkelt ändras via `style.css`.

## Teknisk beskrivning

### Frontend
- **HTML (`index.html`)** – UI och struktur.
- **CSS (`style.css`)** – Layout, färger och stil.
- **JavaScript (`game.js`)** – Spel-logik, tärningskast, turbyte, nytt spel och highscore via backend.

### Backend
- **Node.js med Express (`server.js`)** – Hanterar:
  - `GET /api/highscores` – hämtar highscores.
  - `POST /api/highscores` – sparar vinst.
- **`highscores.json`** – lagrar highscores som JSON-objekt.

## Installation och körning
1. Klona projektet eller kopiera filerna.
2. Installera Node.js och Express:
   ```bash
   npm install express
