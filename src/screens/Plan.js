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

const getDate = () => {
  return Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
};

const Plan = () => {
  const [selectedSegment, setSelectedSegment] = useState('Months');
  const [date, setDate] = useState(getDate());
  const { notes, setNotes } = useNotes(date, selectedSegment);
  useObjectives(date, selectedSegment);

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

  function getDocName(_selectedSegment) {
    if (_selectedSegment == 'Months') return `${date.year}-${date.month}`;
    if (_selectedSegment == 'Years') return date.year.toString();
    if (_selectedSegment == 'Five Years') return `${date.year}-${date.year + 5}`;
    if (_selectedSegment == 'Ten Years') return `${date.year}-${date.year + 10}`;
  }

  var timeRef =
    selectedSegment &&
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(selectedSegment)
      .doc(getDocName(selectedSegment));

  useEffect(() => {
    setDate(getDate());
  }, [selectedSegment]);

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
        <MainCard
          notes={notes}
          setNotes={setNotes}
          date={date}
          timeRef={timeRef}
          time={selectedSegment}
          type=""
        />
      </Body>
    </IonPage>
  );
};

export default Plan;
