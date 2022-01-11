import { useEffect, useState } from 'react';
import { authentication, db } from '../../firebase';

// function hasDailyNotifChecked() {
//   db.collection('users')
//     .doc(authentication?.currentUser?.uid)
//     .get()
//     .then(doc => {
//       return doc.data().dailyNotif;
//     });
// }

const useCheck = () => {
  const [checked, setChecked] = useState();

  function setDailyNotif(newCheckedVal) {
    db.collection('users').doc(authentication?.currentUser?.uid).set({
      dailyNotif: newCheckedVal,
    });

    setChecked(newCheckedVal);
  }

  useEffect(() => {
    authentication.currentUser && db.collection('users')
      .doc(authentication?.currentUser?.uid)
      .get()
      .then(doc => {
        setChecked(doc.data()?.dailyNotif || false);
      });
  }, [authentication?.currentUser]);

  return authentication.currentUser ? [checked, setDailyNotif] : [checked, setChecked];
};

export default useCheck;
