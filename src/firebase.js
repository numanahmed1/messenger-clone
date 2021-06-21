import firebase from  "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBuPDCBpv8kOpbhhpUaLEdRtWXBL9FmhlE",
  authDomain: "messenger-clone-2021.firebaseapp.com",
  databaseURL: "https://messenger-clone-2021.firebaseio.com",
  projectId: "messenger-clone-2021",
  storageBucket: "messenger-clone-2021.appspot.com",
  messagingSenderId: "304575024776",
  appId: "1:304575024776:web:d8b2380039c5cac351993d",
  measurementId: "G-MBEQK5PZQ8"
})

const db = firebaseApp.firestore();

export default db;