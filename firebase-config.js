// ============================================================
// firebase-config.js
// ⚠️ REPLACE THESE VALUES with your own Firebase project config
// Get them from: Firebase Console → Project Settings → Your Apps → SDK setup
// ============================================================

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ImageBB API Key — get from https://api.imgbb.com/
const IMAGEHOST_KEY = "YOUR_IMAGEHOST_KEY";

// Initialize Firebase (called once globally)
function initFirebase() {
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  return {
    db: firebase.database(),
    auth: firebase.auth()
  };
}
