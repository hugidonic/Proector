import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var fbConfig = {
	apiKey: "AIzaSyAV6mZhdrCuSixSqEcoDSpt_c3CZTe40rg",
	authDomain: "proecter-43dd7.firebaseapp.com",
	databaseURL: "https://proecter-43dd7.firebaseio.com",
	projectId: "proecter-43dd7",
	storageBucket: "proecter-43dd7.appspot.com",
	messagingSenderId: "33025758495",
	appId: "1:33025758495:web:9679be5962d13a44bfcc2a"
};
// Initialize Firebase
firebase.initializeApp(fbConfig);

export default firebase