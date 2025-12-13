const express = require("express");
const app = express();
app.use(express.json());


 // all rooms are stored in it
let rooms = {};

// To check the server

app.get("/",(req,res) =>{

 res.send( "Server is Running Successfully 👍!!" );


});


// Create the room
app.post("/room/create", (req, res) => {

  // creating a random alphanumeric roomID
  const roomId =  Math.floor(100000 + Math.random() * 900000).toString();

  // DESIGNING the room structure
  rooms[roomId] = {
    players: [],
    status: "waiting",
    mantriGuess: null

  };

  res.send({ roomId });
});

//to join the room
app.post("/room/join",(req, res) => {

  const {roomId, name} = req.body;
  

  const myroom = rooms[roomId];

  // checking the roomID
  if (!myroom){
   return res.send({ message : "Room not found" });
  }

// Checking for 4 players
  if (myroom.players.length >= 4){
     return res.send({ error: "Room full" });
  }


 // generating random player ID
  const playerId =  Math.floor(100000 + Math.random() * 900000).toString();

  //Designing the players list structure
  myroom.players.push({

    playerId: playerId,
    name: name,
    role: null,
    points: 0

  });

 

//   // find the player after giving the roles
// let currentPlayer = null;

// for (let i = 0; i < myroom.players.length; i++) {

//   if (myroom.players[i].playerId === playerId) {

//     currentPlayer = myroom.players[i];
//      break;
//   }
// }

  const curr_player = myroom.players.find(p => p.playerId === playerId);

  res.send({ name: curr_player.name, playerId:playerId, message: "Joined room"});

});

// All players can see all names
app.get("/room/players/:roomId",(req,res) => {

  const { roomId } = req.params;

  const myroom = rooms[roomId];

  // checking the roomID
 if (!myroom) {
    return res.send({ message: "Room id is invalid !!" });
  }

//   for (let i = 0; i < myroom.players.length; i++) {

//   if (myroom.players[i].playerId === playerId) {

//     names[i] = myroom.players[i];
//      break;
//   }
// }

// getting the players names linewise
  const names = myroom.players.map(p => p.name);


res.send({players:names});


});

app.post("/room/assign/:roomId",(req,res) => {

  const {roomId} = req.params;

  const myroom = rooms[roomId];

  // CHECKING THE RoomID
  if(!myroom){
    return res.send({message : "Invalid roomID"})
  }

   // Player count check
  if (myroom.players.length !== 4) {
    return res.send({ message: "Need exactly 4 players to assign roles" });
  }

    // TO Prevent re-assigning OF ROLES
  if (myroom.status !== "waiting") {
    return res.send({ message: "Roles already assigned" });
  }


  // function to give rols
    giveroles(myroom);

     // CHANGING THE STATUS
      myroom.status = "assigned";

  
 
   res.send({message : "Roles Assigned Successfully !!"});
});

// TO see roles
app.get("/role/me/:roomId/:playerId",(req, res) => {


  const { roomId, playerId } = req.params;

  const room = rooms[roomId];

  // checking roomid
  if (!room) {
    return res.send({ message: "Incorrect room id" });
  }

 
  // finding the players with that role
let player = null;

for (let i = 0; i < room.players.length; i++) {

  if (room.players[i].playerId === playerId) {

    player = room.players[i];
     break;
  }
}

// checking the id
  if (!player) {
    return res.send({ message: "Incorrect player id" });
  }

  res.send({name: player.name,role: player.role});

});

// Mantri guessing chor id

app.post("/guess/:roomId", (req, res) => {


  const { roomId } = req.params;

  const { mantriId, chorId } = req.body;

  const myroom = rooms[roomId];

 // ckecking id
  if (!myroom) {
    return res.send({ message: "Room not found" });
  }

  if (myroom.status !== "assigned") {
  return res.send({ message: "Roles not assigned yet" });
}

  // finding the player with role of mantri
  const mantri = myroom.players.find(x => x.role === "Mantri");

  if (mantri.playerId !== mantriId){

    return res.send({ message: "You are not the Mantri" });
  }

  // stroing the guess
  myroom.mantriGuess = chorId;

  // updating the status
  myroom.status = "guessed";

  res.send({ message: "!! Mantri has done the Guess !!" });

});

//RESULTS

app.get("/result/:roomId", (req, res) => {

  const { roomId } = req.params;


  const myroom = rooms[roomId];

  //checking roomID
  if (!myroom) {
    return res.send({ message: "Room not found" });
  }

  if (myroom.status !== "guessed") {
  return res.send({ message: "Guess not completed yet" });
}

  // calculating the points
  calculatePoints(myroom);
  
  const roles = {};
  const pts = {};

  // Mapping names with roles and pts
  myroom.players.forEach((p) => {
   
    roles[p.name] = p.role;
    pts[p.name] = p.points;

  });

  res.send({ roles, pts}); 

});

//displaying the Leaderboard

app.get("/leaderboard/:roomId", (req,res) =>{

  const {roomId} = req.params;

  const myroom = rooms[roomId];

  // checking the rromID
  if(!myroom){
    return res.send({ message: "invalid room  ID !!"});
  }

  // FINDING THE names and pts and mapping them
  const board  = myroom.players.map(p => ({
     
    name: p.name,
    score: p.points

  }));

  // to sort by descending
    board.sort((a, b) => b.score - a.score);

  res.send({ leaderboard : board });

});


function giveroles(room) {

  let roles = ["Raja", "Mantri", "Sipahi", "Chor"];

  // sort logic
  roles.sort(() => Math.random() - 0.5);

  //mapping random roles with players
  room.players.forEach((player, index) => {
  
    player.role = roles[index];

  });

 
}

//calculation of pts
function calculatePoints(room) {
  const mantri = room.players.find(p => p.role === "Mantri");
  const chor = room.players.find(p => p.role === "Chor");
  const sipahi = room.players.find(p => p.role === "Sipahi");
  const raja = room.players.find(p => p.role === "Raja");

  //default
  raja.points = 1000;

  if (room.mantriGuess === chor.playerId) {


    // Correct guess
    mantri.points = 800;
    sipahi.points = 500;
    chor.points = 0;
  } else {


    // Wrong guess
    mantri.points = 0;
    sipahi.points = 0;
    chor.points = 1300;
  }

  room.status = "completed";

}

 // server

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));


//app.listen(process.env.PORT || 3000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// THE END