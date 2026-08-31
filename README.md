# Habit Tracker — Frontend

Prosty frontend do [Habit Tracker API](https://github.com/rober-60/Habits.git) — aplikacji do śledzenia nawyków. Napisany w React + Vite, komunikuje się z backendem opartym na FastAPI.

## Funkcje

- Rejestracja i logowanie (JWT)
- Dodawanie, edycja i usuwanie nawyków
- Oznaczanie nawyku jako wykonanego danego dnia
- Streak (ile dni/tygodni z rzędu) i procent wykonania
- Przełączanie częstotliwości nawyku między dziennym a tygodniowym
- Heatmapa aktywności w stylu GitHub contribution graph
- Modale potwierdzenia dla akcji usuwania i edycji

## Stack

- React 19 + Vite
- Zwykły `fetch` do komunikacji z API
- CSS

## Uruchomienie lokalnie

Backend musi działać wcześniej — [repo backendu](https://github.com/rober-60/Habits.git) po instrukcje.

```bash
git clone https://github.com/rober-60/Habits.git
cd habit-tracker-frontend
npm install
npm run dev
```

Aplikacja wystartuje pod `http://localhost:5173`. Backend musi być dostępny pod `http://localhost:8000` (adres jest ustawiony na sztywno w `src/api.js`).

## Struktura projektu

```
src/
├── api.js          # komunikacja z backendem (fetch)
├── App.jsx         # główny komponent, obsługa logowania
├── Login.jsx       # formularz logowania/rejestracji
├── HabitList.jsx   # lista nawyków, CRUD, modale
├── HeatMap.jsx     # heatmapa aktywności
├── App.css         # style
```