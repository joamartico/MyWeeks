import { IonPage, IonContent, useIonRouter, IonHeader, IonToolbar, IonList } from '@ionic/react';

import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/theme';
import WeekHeader from '../components/WeekHeader';

import { InputNotes, Subtitle, Card, ScrollBody, Body } from '../../constants/styledComponents';

import { Temporal } from 'proposal-temporal';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import Objective from '../components/Objective';
import AddButton from '../components/AddButton';
import Days from '../components/Days';
import MainCard from '../components/MainCard';

const nowDate = Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());

function getWeekDate() {
  const daysAfterMonday = nowDate.dayOfWeek - 1;
  const weekDate = nowDate.add({ days: -daysAfterMonday });
  return weekDate;
}

const Week = () => {
  const router = useIonRouter();
  const { objectives, setObjectives, removed, newDocId, setNewDocId } = useContext(Context);
  const [date, setDate] = useState(getWeekDate());
  const [notes, setNotes] = useState('');
  const [repeatedObjectives, setRepeatedObjectives] = useState([]);

  const ref = useRef();

  const weekRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('weeks')
      .doc(date.toString());

  const repObjRef =
    authentication.currentUser &&
    db.collection('users').doc(authentication.currentUser.uid).collection('repeatedObjectives');

  useEffect(() => {
    if (router.routeInfo.pathname == '/tabs/week') {
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
    }
  }, [router.routeInfo, date, removed]);

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
    // setTimeout(() => {
    //   ref.current.scrollToPoint(0, 100, 500);
    // }, 1000);
  }, [removed]);

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

  return (
    <>
      <IonPage>
        <WeekHeader
          onClickNext={() => onChangeDate('+')}
          onClickPrevious={() => onChangeDate('-')}
          date={date}
          time="weeks"
        />
        <Body pt="70px" intoTabs ref={ref}>
          <MainCard
            repeatedObjectives={repeatedObjectives}
            notes={notes}
            setNotes={setNotes}
            date={date}
            timeRef={weekRef}
            type="week"
            time="weeks"
          />

          <Days
            repeatedObjectives={repeatedObjectives}
            date={date}
            nowDate={nowDate}
            weekRef={weekRef}
          />
        </Body>
      </IonPage>
    </>
  );
};

export default Week;
