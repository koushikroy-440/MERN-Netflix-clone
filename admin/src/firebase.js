import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBfFV1ySIFurxdnWHXCWAzJArUoXt_nfnA",
    authDomain: "netflix-bb1ee.firebaseapp.com",
    projectId: "netflix-bb1ee",
    storageBucket: "netflix-bb1ee.appspot.com",
    messagingSenderId: "514347668904",
    appId: "1:514347668904:web:46ec3cc987fac6f5e9b99d",
    measurementId: "G-S2HBLF1JQ5"
};

initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;