import firebase from "firebase";

	const firebaseApp = firebase.initializeApp({
		apiKey: "AIzaSyCcDoVTkOdNvKbfk8YI4mHt7-xksUuKYpM",
		authDomain: "insta-app-af05f.firebaseapp.com",
		databaseURL: "https://insta-app-af05f.firebaseio.com",
		projectId: "insta-app-af05f",
		storageBucket: "insta-app-af05f.appspot.com",
		messagingSenderId: "161727804879",
		appId: "1:161727804879:web:a31d9472905807720bceba",
		measurementId: "G-MCLWNBY3B8"
	  });
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}