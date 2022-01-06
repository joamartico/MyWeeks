import { IonPage, useIonRouter } from '@ionic/react';

import React, { useContext, useEffect, useState, useRef } from 'react';
import WeekHeader from '../components/WeekHeader';

import { Body } from '../components/styledComponents';

import { Temporal } from 'proposal-temporal';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import Days from '../components/Days';
import MainCard from '../components/MainCard';
import useGlobalState from '../hooks/useGlobalState';
import useNotes from '../hooks/useNotes';
import useObjectives from '../hooks/useObjectives';

const nowDate = Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());

function getWeekDate() {
  const daysAfterMonday = nowDate.dayOfWeek - 1;
  const weekDate = nowDate.add({ days: -daysAfterMonday });
  return weekDate;
}

const Week = () => {
  const [date, setDate] = useState(getWeekDate());
  const { repeatedObjectives } = useObjectives(date, 'weeks');

  const ref = useRef();

  // setTimeout(() => {
  //   ref.current.scrollToPoint(0, 100, 500);
  // }, 1000);

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
        <Body intoTabs ref={ref}>
          <MainCard
            repeatedObjectives={repeatedObjectives}
            date={date}
            type="week"
            time="weeks"
          />

          <Days repeatedObjectives={repeatedObjectives} date={date} nowDate={nowDate} />
        </Body>
      </IonPage>
    </>
  );
};

export default Week;
