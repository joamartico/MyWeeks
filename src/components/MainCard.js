import { IonList } from '@ionic/react';
import React from 'react';
import { Card, InputNotes, Subtitle } from '../components/styledComponents';
import useGlobalState from '../hooks/useGlobalState';
import useGoogleCalendar from "../hooks/useGoogleCalendar";
import useNotes from '../hooks/useNotes';
import AddButton from './AddButton';
import Objective from './Objective';

const MainCard = ({ repeatedObjectives, date, type, time }) => {
  const { newDocId, objectives } = useGlobalState();
  const { notes, updateNotes } = useNotes(date, time);


  return (
    <Card>
      <Subtitle>Objectives</Subtitle>

      <IonList>
        {objectives
          ?.filter(objective => (type ? objective.type == type : true))
          .sort((a, b) => {
            return a.n - b.n;
          })
          .map(objective => (
            <Objective
              key={objective.id || newDocId}
              n={objective.n}
              order={objective.order}
              text={objective.text}
              id={objective.id ? objective.id : newDocId}
              isDone={objective.done}
              weekDate={date}
              time={time}
              type={type}
              repeatValue={objective.repeatValue}
            />
          ))}
        {repeatedObjectives
          ?.filter(objective => objective.repeatTime === type && objective.repeatValue == type)
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

      <AddButton type={type} time={time} date={date} />

      <Subtitle>Notes</Subtitle>

      <InputNotes
        value={notes}
        onIonInput={updateNotes}
        multiline={true}
        rows={20}
        placeholder={`Write your achievements, mistakes, learnings and thoughts of the ${type}`}
        // autoGrow={time == "weeks" ? false : true}
        autoGrow
      />
    </Card>
  );
};

export default MainCard;
