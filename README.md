#  🎮 Backend Game

This is a **backend implementation** of the classic multiplayer card game **Raja-Mantri-Chor-Sipahi** using **Node.js** and **Express.js**.  
The backend manages **rooms, players, roles, guesses, and scoring**. 

**(Successfully tested using Postman ✅✅)**

---
**(Successfully tested using render ✅✅)**
```md
https://backend-guy-1.onrender.com/
```

---

## 🧾Table of Contents

- [Game Rules](#game-rules)     
- [API Endpoints](#ENDPoints) 
- [Tech Stack](#Tech-Stack)
- [Collaborations](#Collaborations)
- [About-Me](#About-Me)

---

## 🔖Game Rules

- 4 players join a room.

- Roles assigned randomly:  
  - **Raja** – Observer  
  - **Mantri** – Must guess the Chor  
  - **Chor** – Avoid getting caught  
  - **Sipahi** – Waits for result
  - 
- Default Points:  
  - Raja: 1000  
  - Mantri: 800  
  - Sipahi: 500  
  - Chor: 0
    
- If Mantri guesses the Chor correctly:  
  - Mantri & Sipahi keep points  
  - Chor gets 0 points  
- If Mantri guesses wrong:  
  - Chor steals points of Mantri & Sipahi  

---
## 🔚ENDPoints
|Method|Endpoint|Work|
|------|--------|----|
|POST| /room/create|Create a new game room|
|POST|/room/join| Join an existing room|
|GET|/room/players/:roomId|All players - See player names only|
|POST| /room/assign/:roomId| System - Randomly assign roles after 4 players|
|GET| /role/me/:roomId/:playerId|Individual - See your role only|
|POST|/guess/:roomId|Mantri - Submit guessed playerId|
|GET| /result/:roomId| All players - Final roles + points|
|GET|/leaderboard/:roomId| All players NAMES and Scores in Descending order|

---

## ⚙️Tech-Stack

- Node.js  
- Express.js  
- In-memory storage (no database)

---

## 👨‍💻 Collaborations
 For collaboration on frontend projects : you can send me a pull request on my REPO 🎯 :
 ```md
 https://github.com/backend-glitch/CHIT_AND_CHAT
```

If you like this project:

⭐ Star this repo

🍴 Fork it

---
## 😁About-Me
<img src="https://gitstar-xcj1.vercel.app/github?user=backend-glitch&emoji=🚀">

---
ARJUN 💚 BACKEND 🧡 2025
