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

- [Game Rules](game-rules)     
- [API Endpoints](api-endpoints) 
- [Tech Stack](tech-stack)  

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
/room/create → create a room

/room/join → join a room

/room/players/:roomId → see all player names

/room/assign/:roomId - System - Randomly assign roles after 4 players

/role/me/:roomId/:playerId → see private role

/guess/:roomId → Mantri guesses Chor

/result/:roomId → see results (roles + points)

/leaderboard/:roomId → leaderboard
---

## ⚙️Tech Stack

- Node.js  
- Express.js  
- In-memory storage (no database)

---
ARJUN 💚 BACKEND 🧡 2025
