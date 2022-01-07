import { useIonRouter } from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';
import { authentication, db } from '../../firebase';
import useGlobalState from './useGlobalState';

function getDocName(date, time) {
  if (time == 'weeks') return date.toString();
  if (time == 'Months') return `${date.year}-${date.month}`;
  if (time == 'Years') return date.year.toString();
  if (time == 'Five Years') return `${date.year}-${date.year + 5}`;
  if (time == 'Ten Years') return `${date.year}-${date.year + 10}`;
}

const useObjectives = (date, time) => {
  const router = useIonRouter();
  const [repeatedObjectives, setRepeatedObjectives] = useState([]);
  const { objectives, setObjectives, removed, setNewDocId, newDocId } = useGlobalState();

  const repObjRef =
    authentication.currentUser &&
    db.collection('users').doc(authentication.currentUser.uid).collection('repeatedObjectives');

  const timeRef =
    time &&
    date &&
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(date, time));

  // time &&
  // date &&
  // authentication.currentUser &&
  // db
  //   .collection('users')
  //   .doc(authentication.currentUser.uid)
  //   .collection(time)
  //   .doc(getDocName(date, time));

  useEffect(() => {
    if (router.routeInfo.pathname == '/tabs/week' && time != 'weeks') return null;
    if (router.routeInfo.pathname == '/tabs/plan' && time == 'weeks') return null;
    getObjectives();
  }, [date, time, removed, router.routeInfo]);

  async function getObjectives() {
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

  async function addObjective(type) {
    if (newDocId && objectives.length > 0) {
      var newObjectives = await objectives.slice();
      newObjectives[newObjectives.length - 1].id = await newDocId;
      // newObjectives[newObjectives.length - 1].order = await newObjectives.length ;
      await setObjectives(newObjectives);
    }

    await setObjectives(prevObjectives => [
      ...prevObjectives,
      {
        text: '',
        done: false,
        n: prevObjectives.length,
        order: objectives.length,
        // NO SE POR QUE CUANDO LO DESCOMENTO NO FUNCIONA
        type: type || '',
        repeatValue: type ? 'never' : '',
      },
    ]);

    const newDoc = await timeRef.collection('objectives').doc();

    await setNewDocId(newDoc.id);

    await newDoc.set({
      text: '',
      done: false,
      order: objectives.length,
      type: type || '',
      repeatValue: type ? 'never' : '',
    });
  }

  return { objectives, setObjectives, repeatedObjectives, setRepeatedObjectives, addObjective };
};

export default useObjectives;
