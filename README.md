#  🎮Raja-Mantri-Chor-Sipahi Backend

This is a **backend implementation** of the classic multiplayer card game **Raja-Mantri-Chor-Sipahi** using **Node.js** and **Express.js**.  
The backend manages **rooms, players, roles, guesses, and scoring**.  
Players interact with the backend via **REST APIs** (testable using Postman).

---

## 🧾Table of Contents

- [Game Rules](game-rules)  
- [Tech Stack](tech-stack)    
- [API Endpoints](api-endpoints)  

---

## 🔖Game Rules

- 4 players join a room.
- 
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
Create Room → POST /room/create

Join Room → POST /room/join 4 times 

Check Private Role → GET /room/:roomId/role/:playerId

Mantri Guess → POST /room/:roomId/guess

Get Results → GET /room/:roomId/results
---

## ⚙️Tech Stack

- Node.js  
- Express.js  
- In-memory storage (no database)

---
ARJUN 💚 BACKEND 🧡 2025
