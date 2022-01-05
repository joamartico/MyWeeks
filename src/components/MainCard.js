import { IonList } from '@ionic/react';
import React, { useContext, useRef } from 'react';
import { Card, InputNotes, Subtitle } from '../components/styledComponents';
import { Context } from '../context/ContextComponent';
import AddButton from './AddButton';
import Objective from './Objective';

const MainCard = ({ repeatedObjectives, notes, date, timeRef, setNotes, type, time }) => {
  const { newDocId, objectives } = useContext(Context);

  console.log('aca: ', objectives);

  return (
    <Card>
      <Subtitle>Objectives</Subtitle>

      <IonList>
        {console.log('-----------------')}
        {objectives
          ?.filter(objective => (type ? objective.type == type : true))
          .sort((a, b) => {
            return a.n - b.n;
          })
          .map(objective => (
            <Objective
              key={objective.order}
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

      <AddButton type={type} timeRef={timeRef} />

      <Subtitle>Notes</Subtitle>

      <InputNotes
        value={notes}
        onIonInput={e => {
          timeRef.set({ notes: e.target.value });
          setNotes(e.target.value);
        }}
        multiline={true}
        rows={20}
        placeholder={`Write your achievements, mistakes, learnings and thoughts of the ${type}`}
      />
    </Card>
  );
};

export default MainCard;
