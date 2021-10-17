import firebase from "firebase";


var firebaseConfig = {
	apiKey: "AIzaSyDAR5g7QWbl0MR7zSpNG-A2nJUHog1UQFw",
	authDomain: "my-weeks.firebaseapp.com",
	projectId: "my-weeks",
	storageBucket: "my-weeks.appspot.com",
	messagingSenderId: "551662700296",
	appId: "1:551662700296:web:8c8cf22c7913d92ca68ebd",
	measurementId: "G-MTC3EMG236",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();


const db = firebase.firestore();
const authentication = firebase.auth();
const msg = firebase.messaging()

db.enablePersistence();

export { db, authentication, msg };
