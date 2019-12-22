import {initializeApp, database} from 'firebase';

const config = {
  apiKey: "AIzaSyB9wHgh7Gcd0RIZlxE0kXy55yes2NTOQKc",
  authDomain: "market-survey-1.firebaseapp.com",
  databaseURL: "https://market-survey-1.firebaseio.com",
  projectId: "market-survey-1",
  storageBucket: "market-survey-1.appspot.com",
  messagingSenderId: "207081464400",
  appId: "1:207081464400:web:6230fbc11a48a827fbe755",
  measurementId: "G-RQTC4JRRPK"
};

initializeApp(config);
export const db = database().ref();

export const participantsRef = db.child("participants");
export const answersRef = db.child("answers");