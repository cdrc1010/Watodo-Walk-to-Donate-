var config = {
    apiKey: "AIzaSyApeQ9gEavCoqIb1bK89oFPgUAP-kMol8c",
    authDomain: "watodo-ebc09.firebaseapp.com",
    databaseURL: "https://watodo-ebc09-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "watodo-ebc09",
    storageBucket: "watodo-ebc09.appspot.com",
    messagingSenderId: "599872692177",
    appId: "1:599872692177:web:534a9e051dad1a811e4af0",
    measurementId: "G-LC8NBE488N"
        };
firebase.initializeApp(config);

//make  auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();  

db.settings({timestampsInSnapshots:true});


