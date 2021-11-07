import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDAR5g7QWbl0MR7zSpNG-A2nJUHog1UQFw',
  authDomain: 'my-weeks.firebaseapp.com',
  projectId: 'my-weeks',
  storageBucket: 'my-weeks.appspot.com',
  messagingSenderId: '551662700296',
  appId: '1:551662700296:web:8c8cf22c7913d92ca68ebd',
  measurementId: 'G-MTC3EMG236',
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
