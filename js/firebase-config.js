// ============================================================
// firebase-config.js
// ⚠️ REPLACE THESE VALUES with your own Firebase project config
// Get them from: Firebase Console → Project Settings → Your Apps → SDK setup
// ============================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCCHC-QMVSxVsyfzQPhUOr_vIJSPqGszEo",
  authDomain: "test2-cc9a1.firebaseapp.com",
  databaseURL: "https://test2-cc9a1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test2-cc9a1",
  storageBucket: "test2-cc9a1.firebasestorage.app",
  messagingSenderId: "512384166021",
  appId: "1:512384166021:web:ec54ef7849b589f7f9a1ec"
};

// ImageBB API Key — get from https://api.imgbb.com/
const IMAGEHOST_KEY = "27c528db427de3446824abe1f6ec4f22";

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
