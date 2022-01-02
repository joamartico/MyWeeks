import React, { useContext, useEffect, useState } from 'react';
import { Body, Card, InputNotes, Subtitle } from '../../constants/styledComponents';
import WeekHeader from '../components/WeekHeader';
import { Temporal } from 'proposal-temporal';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import Objective from '../components/Objective';
import AddButton from '../components/AddButton';
import { IonLabel, IonPage, IonSegment, IonSegmentButton, useIonRouter } from '@ionic/react';
import MainCard from '../components/MainCard';

const getDate = () => {
  return Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
};

const Plan = () => {
  const router = useIonRouter();

  const { objectives, setObjectives, removed, newDocId, setNewDocId } = useContext(Context);

  const [selectedSegment, setSelectedSegment] = useState('Months');
  const [date, setDate] = useState(getDate());
  const [notes, setNotes] = useState('');

  const changeTime = (selectedSegmentt, symbol) => {
    switch (selectedSegmentt) {
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

  function getDocName(selectedSegmentt) {
    if (selectedSegmentt == 'Months') return `${date.year}-${date.month}`;
    if (selectedSegmentt == 'Years') return date.year.toString();
    if (selectedSegmentt == 'Five Years') return `${date.year}-${date.year + 5}`;
    if (selectedSegmentt == 'Ten Years') return `${date.year}-${date.year + 10}`;
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
    if (router.routeInfo.pathname == '/tabs/plan') {
      timeRef
        ?.get()
        .then(doc => {
          doc.data() ? setNotes(doc.data().notes) : setNotes('');
        })
        .catch(err => console.log(err));

      timeRef
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
    setNewDocId();
  }, [date, selectedSegment, router.routeInfo, removed]);

  useEffect(() => {
    setDate(getDate());
  }, [selectedSegment]);

  return (
    <IonPage>
      {/* <SegmentedControl
				style={{ zIndex: 999999999, marginTop: insets.top + 15, maxWidth: 700, justifyContent: "center" }}
				values={segmentValues}
				selectedIndex={selectedIndex}
				onChange={(event) => {
					setSelectedSegment(
						segmentValues[event.nativeEvent.selectedSegmentIndex]
					);
					setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
				}}
			/> */}

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
            // paddingLeft: "10%",paddingRight: "10%",
            width: '90%',
            // justifyContent: 'center',
            // background: "red"
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
      <Body intoTabs pt="80px">
        <MainCard
          notes={notes}
          setNotes={setNotes}
          date={date}
          timeRef={timeRef}
          time={selectedSegment}
          type=""
        />

        {/* <Card
          style={{ marginTop: '12vh' }}
          // style={{marginTop: "50%", marginBottom: "50%"}}
        >
          <Subtitle>Objectives</Subtitle>

          {objectives

            .sort((a, b) => {
              return a.n - b.n;
            })
            .map(objective => (
              <Objective
                key={objective.id}
                n={objective.n}
                text={objective.text}
                id={objective.id ? objective.id : newDocId}
                isDone={objective.done}
                weekDate={date}
                time={selectedSegment}
              />
            ))}

          <AddButton timeRef={timeRef} />

          <Subtitle>Notes</Subtitle>

          <InputNotes
            value={notes}
            onIonInput={e => {
              setNotes(e.target.value);
              timeRef.set({ notes: e.target.value });
            }}
            autoGrow
            rows={20}
            placeholder="Write your achievements, mistakes, learnings and thoughts of the week"
          />
        </Card> */}
      </Body>
    </IonPage>
  );
};

export default Plan;
