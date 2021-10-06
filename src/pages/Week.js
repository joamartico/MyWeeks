import { IonPage, IonContent, useIonRouter, IonHeader, IonToolbar } from '@ionic/react';

import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/theme';
import WeekHeader from '../components/WeekHeader';

import { InputNotes, Subtitle, Card, ScrollBody } from '../../constants/styledComponents';

import { Temporal } from 'proposal-temporal';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import Objective from '../components/Objective';
import AddButton from '../components/AddButton';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const nowDate = Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());

function getWeekDate() {
  const daysAfterMonday = nowDate.dayOfWeek - 1;
  const weekDate = nowDate.add({ days: -daysAfterMonday });
  return weekDate;
}

const Week = () => {
    const router = useIonRouter()
  // const insets = useSafeAreaInsets();
  const { objectives, setObjectives, actualRoute, setActualRoute } = useContext(Context);
  const [date, setDate] = useState(getWeekDate());
  const [notes, setNotes] = useState('');

  const weekRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('weeks')
      .doc(date.toString());

  useEffect(() => {
    weekRef
      ?.get()
      .then(doc => {
        doc.data() ? setNotes(doc.data().notes) : setNotes('');
      })
      .catch(err => console.log(err));

    weekRef
      ?.collection('objectives')
      .orderBy('order', 'asc')
      .get()
      .then(snapshot => {
        setObjectives(
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
    setActualRoute(router.routeInfo.pathname);
  }, [date, actualRoute]);

  const onChangeDate = symbol => {
    if (symbol === '+') {
      const newDate = date.add({ days: 7 });
      setDate(newDate);
    }
    if (symbol === '-') {
      const newDate = date.add({ days: -7 });
      setDate(newDate);
    }
  };

  const onAddObjective = type => {
    weekRef
      .collection('objectives')
      .add({
        text: '',
        done: false,
        type,
        order: objectives.length,
      })
      .then(res => {
        console.log(res);
        setObjectives([
          ...objectives,
          {
            text: '',
            done: false,
            type,
            n: objectives.length,
            id: res.id,
          },
        ]);
      });
  };

  function dayDate(daysAfterMonday) {
    const day = date.add({ days: daysAfterMonday }).day;
    const month = date.add({ days: daysAfterMonday }).month;
    return `${day}/${month}`;
  }

  return (
    <>
    <IonPage>
      
      
      <IonContent className="scroll" fullscreen>
        <WeekHeader
          onClickNext={() => onChangeDate('+')}
          onClickPrevious={() => onChangeDate('-')}
          date={date}
          time="weeks"
        />
      </IonContent>
    </IonPage>
    </>
  );
};

export default Week;
