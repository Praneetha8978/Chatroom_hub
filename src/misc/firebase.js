import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: "AIzaSyATBnXZ-u9eC0AeOPPPiRO_mebvGcRSGrI",
    authDomain: "chatroomhub-5ffa3.firebaseapp.com",
    databaseURL: "https://chatroomhub-5ffa3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatroomhub-5ffa3",
    storageBucket: "chatroomhub-5ffa3.appspot.com",
    messagingSenderId: "600693016942",
    appId: "1:600693016942:web:5812a2d907226b26db197f"
};

const app = initializeApp(config);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth,database,storage };