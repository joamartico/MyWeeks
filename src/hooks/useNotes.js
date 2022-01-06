import { useEffect, useState } from 'react';
import { authentication, db } from '../../firebase';
import useGlobalState from './useGlobalState';

function getDocName(date, time) {
  if (time == 'weeks') return date.toString();
  if (time == 'Months') return `${date.year}-${date.month}`;
  if (time == 'Years') return date.year.toString();
  if (time == 'Five Years') return `${date.year}-${date.year + 5}`;
  if (time == 'Ten Years') return `${date.year}-${date.year + 10}`;
}

const useNotes = ( date, time ) => {
  const [notes, setNotes] = useState([]);
  const { removed } = useGlobalState();

  const timeRef =
    time && date &&
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(date, time));

  useEffect(() => {
    timeRef
      ?.get()
      .then(doc => {
        doc.data() ? setNotes(doc.data().notes) : setNotes('');
      })
      .catch(err => console.log(err));
  }, [date, removed]);

  return { notes, setNotes };
};

export default useNotes;
