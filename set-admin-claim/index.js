import admin from 'firebase-admin';
import fs from 'fs';

// Read and parse the service account key
const serviceAccount = JSON.parse(fs.readFileSync('./service-account-key.json'));

// --- IMPORTANT ---
// Replace this with the UID of the user you want to make an admin.
const uid = 'YgVZseyePubOmY5tjvhjs5AKJ0D3';

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set the custom claim
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Successfully set admin claim for user: ${uid}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Error setting custom claim:', error);
    process.exit(1);
  });