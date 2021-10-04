import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

/*

Copy/paste your *client-side* Firebase credentials below. 

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

*/
const CLIENT_CONFIG = {
  apiKey: "AIzaSyCYoEVCr8AEpdQ0obGNG87qoj9HshWEN_o",
    authDomain: "nextjs-web-addoca.firebaseapp.com",
    databaseURL: "https://nextjs-web-addoca-default-rtdb.firebaseio.com",
    projectId: "nextjs-web-addoca",
    storageBucket: "nextjs-web-addoca.appspot.com",
    messagingSenderId: "133595280869",
    appId: "1:133595280869:web:d4bb98e6a45b1d00df6b0c",
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;

  console.log('firebase inicializou');

};



export { firebaseClient };
export default {CLIENT_CONFIG};
