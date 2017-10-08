const functions = require('firebase-functions');
const admin = require('firebase-admin');
const http = require('request');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.messenger = functions.https.onRequest((request, response) => {
   if (request.method === "POST") {
       admin.database().ref("robot/url").once('value',(snapshot) => {
           http.post(snapshot.val() + "/messenger").form(JSON.stringify(request.body));
           response.sendStatus(200)
       });

   }
   else if (request.method === "GET"){
       if (request.query['hub.verify_token'] === 'RajaRam') {
           response.send(request.query['hub.challenge']);
       } else {
           response.send('Error, wrong validation token');
       }
   }
 });
