import { useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { authentication, db } from '../../firebase';
import useGlobalState from './useGlobalState';

const useObjectives = (date, time) => {
  const [repeatedObjectives, setRepeatedObjectives] = useState([]);
  const { objectives, setObjectives, removed } = useGlobalState();
  const router = useIonRouter();


  const repObjRef =
    authentication.currentUser &&
    db.collection('users').doc(authentication.currentUser.uid).collection('repeatedObjectives');

  function getDocName(date, time) {
    if (time == 'weeks') return date.toString();
    if (time == 'Months') return `${date.year}-${date.month}`;
    if (time == 'Years') return date.year.toString();
    if (time == 'Five Years') return `${date.year}-${date.year + 5}`;
    if (time == 'Ten Years') return `${date.year}-${date.year + 10}`;
  }

  useEffect(() => {
    console.log('useobj date: ', date, 'time: ', time, 'path: ', router.routeInfo.pathname);
    if (router.routeInfo.pathname == '/tabs/week' && time != 'weeks') return null;
    if (router.routeInfo.pathname == '/tabs/plan' && time == 'weeks') return null;
    getObjectives();
  }, [date, time, removed, router.routeInfo]);

  async function getObjectives() {
    let timeRef =
      (await time) &&
      date &&
      authentication.currentUser &&
      db
        .collection('users')
        .doc(authentication.currentUser.uid)
        .collection(time)
        .doc(getDocName(date, time));

    timeRef
      ?.collection('objectives')
      .orderBy('order', 'asc')
      .get()
      .then(async snapshot => {
        await setObjectives([]);

        await setObjectives(
          snapshot.docs
            .filter(doc => doc.data().text != '')
            .map((doc, index) => {
              var newDoc = doc.data();
              newDoc.id = doc.id;
              newDoc.n = index;
              return newDoc;
            })
        );
      });

    timeRef
      ?.collection('objectives')
      .where('text', '==', '')
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          doc.ref.delete();
        });
      });

    // setNewDocId();
  }

  useEffect(() => {
    repObjRef.onSnapshot(snapshot => {
      setRepeatedObjectives(
        snapshot.docs.map((doc, index) => {
          var newDoc = doc.data();
          newDoc.id = doc.id;
          newDoc.n = index;
          return newDoc;
        })
      );
    });
  }, [removed]);

  return { objectives, setObjectives, repeatedObjectives, setRepeatedObjectives };
};

export default useObjectives;
