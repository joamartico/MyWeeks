import { IonList } from '@ionic/react';
import React, { useContext, useRef } from 'react';
import { Card, InputNotes, Subtitle } from '../../constants/styledComponents';
import { Context } from '../context/ContextComponent';
import AddButton from './AddButton';
import Objective from './Objective';

const MainCard = ({ repeatedObjectives, notes, date, weekRef, setNotes }) => {
  const ref = useRef();
  const { objectives, setObjectives, removed, newDocId, setNewDocId } = useContext(Context);

  return (
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
          ?.filter(objective => objective.repeatTime === 'week' && objective.repeatValue == 'week')
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

      <AddButton type="week" weekRef={weekRef} />

      <Subtitle>Notes</Subtitle>

      <InputNotes
        value={notes}
        ref={ref}
        onIonInput={e => {
          weekRef.set({ notes: e.target.value });
          setNotes(e.target.value);
        }}
        multiline={true}
        rows={20}
        placeholder="Write your achievements, mistakes, learnings and thoughts of the week"
      />
    </Card>
  );
};

export default MainCard;
