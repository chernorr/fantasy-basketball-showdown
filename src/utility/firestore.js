import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import Player from '../game/player.js'

const firebaseConfig = {
  apiKey: "AIzaSyAVkUAefZbSd5_rol9Sj2RcfuAiee7PGX4",
  authDomain: "fantasy-basketball-showdown.firebaseapp.com",
  projectId: "fantasy-basketball-showdown",
  storageBucket: "fantasy-basketball-showdown.appspot.com",
  messagingSenderId: "404695465073",
  appId: "1:404695465073:web:15ecd56ce1776e5c5eefd0",
  measurementId: "G-PQGFJXKHRP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllPlayers() {
  let playersList = [];
  const querySnapshot = await getDocs(collection(db, "players"));
  querySnapshot.forEach((doc) => {
    playersList.push({ id: doc.id, name: doc.data().name, team: doc.data().team })
  });

  return playersList;
}

async function getPlayer(name, id) {
  const querySnapshot = await getDocs(collection(db, "players", id, "performances"));
  const performances = querySnapshot.docs.map(doc => doc.data());

  for (let i = performances.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [performances[i], performances[j]] = [performances[j], performances[i]];
  }

  return new Player(name, performances.slice(0, 5));
}

export { getPlayer, getAllPlayers };