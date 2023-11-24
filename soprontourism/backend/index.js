const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqKyAesm4g-gJP_lBy-Gt1vCuGNjGC1pU",
  authDomain: "movieseattacker.firebaseapp.com",
  projectId: "movieseattacker",
  storageBucket: "movieseattacker.appspot.com",
  messagingSenderId: "415433014794",
  appId: "1:415433014794:web:06d9e532872dc8319be9f3",
  measurementId: "G-G0D56H66E4",
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./credentials/movieseattacker-firebase-adminsdk-c6tst-d54693fa2e.json')),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const app = express();
app.use(cors());
// Define a route to get data from Firestore
app.get('/getData', async (req, res) => {
  try {
    const firestore = admin.firestore();
    const data = await firestore.collection('Seats').get();

    // Process the data as needed and send it as the response
    const responseData = data.docs.map(doc => doc.data());
    res.json(responseData);
  } catch (error) {
    console.error('Error getting data from Firestore', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});