const express = require("express");
const app = express();
app.use(express.json());

let rooms = {}; // all rooms stored in memory

// POINTS
const BASE_POINTS = {
  Raja: 1000,
  Mantri: 800,
  Sipahi: 500,
  Chor: 0
};

// 1️⃣ CREATE ROOM
app.post("/room/create", (req, res) => {
  const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();

  rooms[roomId] = {
    players: [],
    status: "waiting",
    mantriGuess: null
  };

  res.send({ roomId });
});

//TO JOIN
app.post("/room/join", (req, res) => {
  const { roomId, playerName } = req.body;
  const room = rooms[roomId];

  if (!room) return res.status(404).send({ error: "Room not found" });
  if (room.players.length >= 4) return res.status(400).send({ error: "Room full" });

  const playerId = Math.random().toString(36).substring(2, 10);

  room.players.push({
    playerId,
    name: playerName,
    role: null,
    points: 0
  });

  // if 4 players → assign roles
  if (room.players.length === 4) assignRoles(room);

  // Find the current player in room (fixed)
  const currentPlayer = room.players.find(p => p.playerId === playerId);

  res.send({ playerId, message: "Joined room", role: currentPlayer.role });
});


// 3️⃣ GET PRIVATE ROLE
app.get("/room/:roomId/role/:playerId", (req, res) => {
  const { roomId, playerId } = req.params;

  const room = rooms[roomId];
  if (!room) return res.status(404).send({ error: "Room not found" });

  const player = room.players.find(p => p.playerId === playerId);
  if (!player) return res.status(404).send({ error: "Player not found" });

  res.send({ role: player.role });
});

// 4️⃣ MANTRI GUESS
app.post("/room/:roomId/guess", (req, res) => {
  const { roomId } = req.params;
  const { mantriId, chorId } = req.body;

  const room = rooms[roomId];
  if (!room) return res.status(404).send({ error: "Room not found" });

  const mantri = room.players.find(p => p.role === "Mantri");

  if (!mantri || mantri.playerId !== mantriId)
    return res.status(400).send({ error: "You are not the Mantri" });

  room.mantriGuess = chorId;
  room.status = "guessed";

  res.send({ message: "Guess received" });
});

// 5️⃣ RESULTS
app.get("/room/:roomId/results", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (!room) return res.status(404).send({ error: "Room not found" });

  calculatePoints(room);

  res.send({
    roles: Object.fromEntries(room.players.map(p => [p.name, p.role])),
    points: Object.fromEntries(room.players.map(p => [p.name, p.points]))
  });
});


// --------------------------------------
// FUNCTIONS
// --------------------------------------

function assignRoles(room) {
  let roles = ["Raja", "Mantri", "Sipahi", "Chor"];
  roles.sort(() => Math.random() - 0.5);

  room.players.forEach((player, index) => {
    player.role = roles[index];
  });

  room.status = "roles_assigned";
}

function calculatePoints(room) {
  const mantri = room.players.find(p => p.role === "Mantri");
  const chor = room.players.find(p => p.role === "Chor");
  const sipahi = room.players.find(p => p.role === "Sipahi");
  const raja = room.players.find(p => p.role === "Raja");

  // Default Raja score
  raja.points = 1000;

  if (room.mantriGuess === chor.playerId) {
    // Mantri correct
    mantri.points = 800;
    sipahi.points = 500;
    chor.points = 0;
  } else {
    // Mantri wrong → Chor steals
    mantri.points = 0;
    sipahi.points = 0;
    chor.points = 800 + 500;
  }

  room.status = "completed";
}

// --------------------------------------

//app.listen(3000, () => console.log("Server running on port 3000"));
app.listen(process.env.PORT || 3000);
