import React, { useContext, useEffect, useState } from 'react';
import { Body, Card, InputNotes, Subtitle } from '../components/styledComponents';
import WeekHeader from '../components/WeekHeader';
import { Temporal } from 'proposal-temporal';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import Objective from '../components/Objective';
import AddButton from '../components/AddButton';
import { IonLabel, IonPage, IonSegment, IonSegmentButton, useIonRouter } from '@ionic/react';
import MainCard from '../components/MainCard';
import useNotes from '../hooks/useNotes';
import useObjectives from '../hooks/useObjectives';

function getActualDate() {
  return Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
}

function isBetween(actualYear, lapse) {
  const start = lapse.split('-')[0];
  const end = lapse.split('-')[1];
  if (actualYear >= start && actualYear <= end) {
    return true;
  }
  return false;
}

const Plan = () => {
  const [selectedSegment, setSelectedSegment] = useState('Months');
  const [date, setDate] = useState(getActualDate());
  const { notes, setNotes } = useNotes(date, selectedSegment);
  useObjectives(date, selectedSegment);


  function getAllDocs(selectedSegment) {
    return db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(selectedSegment)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => {
          var newDoc = doc.data();
          newDoc.id = doc.id;
          return newDoc;
        });
      });
  }

  async function setValidDate() {
    const actualDate = getActualDate();
    const actualYear = actualDate.year;
    const allDocs = await getAllDocs(selectedSegment);
    let foundDoc = false;
    allDocs.map(doc => {
      if (isBetween(actualYear, doc.id)) {
        const fromYear = doc.id.split('-')[0];
        setDate(Temporal.PlainDate.from({ year: fromYear, month: 1, day: 1 }));
        foundDoc = true;
      }
    });
    if (!foundDoc) {
      setDate(actualDate);
    }
  }

  useEffect(() => {
    if (selectedSegment === 'Five Years' || selectedSegment === 'Ten Years') {
      setValidDate();
    } else {
      setDate(getActualDate());
    }
  }, [selectedSegment]);

  const changeTime = (_selectedSegment, symbol) => {
    switch (_selectedSegment) {
      case 'Months':
        if (symbol === '+') {
          const newDate = date.add({ months: 1 });
          setDate(newDate);
        }
        if (symbol === '-') {
          const newDate = date.add({ months: -1 });
          setDate(newDate);
        }
        break;
      case 'Years':
        if (symbol === '+') {
          const newDate = date.add({ years: 1 });
          setDate(newDate);
        }
        if (symbol === '-') {
          const newDate = date.add({ years: -1 });
          setDate(newDate);
        }
        break;
      case 'Five Years':
        if (symbol === '+') {
          const newDate = date.add({ years: 5 });
          setDate(newDate);
        }
        if (symbol === '-') {
          const newDate = date.add({ years: -5 });
          setDate(newDate);
        }
        break;
      case 'Ten Years':
        if (symbol === '+') {
          const newDate = date.add({ years: 10 });
          setDate(newDate);
        }
        if (symbol === '-') {
          const newDate = date.add({ years: -10 });
          setDate(newDate);
        }
        break;
    }
  };

  return (
    <IonPage>
      <WeekHeader
        date={date}
        time={selectedSegment}
        onClickNext={() => changeTime(selectedSegment, '+')}
        onClickPrevious={() => changeTime(selectedSegment, '-')}
        withSegment
      >
        <IonSegment
          style={{
            zIndex: 999999,
            maxWidth: 700,
            width: '90%',
          }}
          value={selectedSegment}
          onIonChange={e => {
            setSelectedSegment(e.detail.value);
          }}
          scrollable
        >
          <IonSegmentButton value="Months">
            <IonLabel>Months</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Years">
            <IonLabel>Years</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Five Years">
            <IonLabel>Five Years</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Ten Years">
            <IonLabel>Ten Years</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </WeekHeader>

      <Body intoTabs>
        <MainCard notes={notes} setNotes={setNotes} date={date} time={selectedSegment} type="" />
      </Body>
    </IonPage>
  );
};

export default Plan;
