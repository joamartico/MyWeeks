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

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

  const onAddObjective = async type => {
    await setObjectives([
      ...objectives,
      {
        text: '',
        done: false,
        type,
        n: objectives.length,
      },
    ]);

    const newDoc = await weekRef.collection('objectives').doc();

    await setNewDocId(newDoc.id);

    await newDoc.set({
      text: '',
      done: false,
      type,
      order: objectives.length,
      repeatValue: 'never',
    });

    // setTimeout(() => {
    //   await ref.current.setFocus()
    //   console.log('REF: ', ref.current);
    // }, 3000);
  };

  function dayDate(daysAfterMonday) {
    const day = date.add({ days: daysAfterMonday }).day;
    const month = date.add({ days: daysAfterMonday }).month;
    return `${day}/${month}`;
  }

  const shouldDisplay = (objective, day, dayDate) => {
    if (date.toString() != objective.date && date.toString() != objective.exceptionDate) {
      if (
        objective.repeatTime.date == `${dayDate.day}/${dayDate.month}` &&
        (dayDate.year - objective.repeatTime.year) % 5 === 0
      ) {
        return true;
      }
      if (objective.repeatTime == `${dayDate.day}/${dayDate.month}`) {
        return true;
      }
      if (objective.repeatTime == day) {
        return true;
      }
      if (objective.repeatTime == dayDate.day) {
        return true;
      }
    }
  };

  return (
    <>
      <IonPage>
        <Body pt="70px" intoTabs>
          <WeekHeader
            onClickNext={() => onChangeDate('+')}
            onClickPrevious={() => onChangeDate('-')}
            date={date}
            time="weeks"
          />
          <Card>
            <Subtitle>Objectives</Subtitle>

            <IonList>
              {objectives
                ?.filter(objective => objective.type === 'week')
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
                    time="weeks"
                    type="week"
                    // repeatTime={objective.repeatTime}
                    repeatValue={objective.repeatValue}
                    // forwardedRef={ref}
                  />
                ))}
              {repeatedObjectives
                ?.filter(
                  objective => objective.repeatTime === 'week' && objective.repeatValue == 'week'
                )
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
                    time="weeks"
                    type={objective.type}
                    repeatValue={objective.repeatValue}
                  />
                ))}
            </IonList>
            <AddButton
              onClick={() => {
                onAddObjective('week')
                // .then(() => {
                //   ref.current.setFocus();
                // });
              }}
            />

            <Subtitle>Notes</Subtitle>

            <InputNotes
              value={notes}
              onIonChange={e => {
                setNotes(e.detail.value);
                weekRef.set({ notes: e.detail.value });
              }}
              multiline={true}
              rows={20}
              placeholder="Write your achievements, mistakes, learnings and thoughts of the week"
            />
          </Card>

          {days.map((day, index) => (
            <Card key={index}>
              <Subtitle>
                {`${day} ${dayDate(index)}`}
                {dayDate(index) == `${nowDate.day}/${nowDate.month}` && (
                  <TodayText>Today 🎉</TodayText>
                )}
              </Subtitle>

              {objectives
                ?.filter(objective => objective.type === day)
                .map(objective => (
                  <Objective
                    key={objective.id}
                    n={objective.n}
                    text={objective.text}
                    id={objective.id ? objective.id : newDocId}
                    isDone={objective.done}
                    time="weeks"
                    weekDate={date}
                    dayDate={date.add({ days: index })}
                    type={objective.type}
                    repeatValue={objective.repeatValue}
                    notifTime={objective.notifTime}
                  />
                ))}
              {repeatedObjectives
                ?.filter(objective => objective.type != 'week')
                .map(objective => {
                  if (shouldDisplay(objective, day, date.add({ days: index }))) {
                    return (
                      <Objective
                        key={objective.id}
                        n={objective.n}
                        text={objective.text}
                        id={objective.id ? objective.id : newDocId}
                        isDone={objective.done}
                        time="weeks"
                        actualWeekDate={date}
                        weekDate={objective.date}
                        dayDate={date.add({ days: index })}
                        repeatTime={objective.repeatTime}
                        repeatValue={objective.repeatValue}
                        notifTime={objective.notifTime}
                      />
                    );
                  }
                })}

              <AddButton onClick={() => onAddObjective(day)} />
            </Card>
          ))}
        </Body>
      </IonPage>
    </>
  );
};

export default Week;

const TodayText = styled.span`
  margin-left: auto;
  font-weight: bold;
  font-style: 12px !important;
`;
