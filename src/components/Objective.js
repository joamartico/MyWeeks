import React, { useContext, useRef, useEffect, useState } from 'react';
import { InputObjective } from '../../constants/styledComponents';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import styled from 'styled-components';
import { COLORS } from '../../constants/theme';
import { IonCheckbox, IonItem, IonItemSliding } from '@ionic/react';
import SlideOptions from './SlideOptions';

const objective = ({ isDone, id, n, text, dayDate, weekDate, time, type, repeatValue, actualWeekDate }, ref) => {
  const { objectives, setObjectives, removed, setRemoved } = useContext(Context);

  // NECESITO QUE LA PROP repeatValue NO RE RENDERIZE EL COMPONENTE CUANDO CAMBIA

  // date y dayDate deben ser las fechas del Lunes de cada semana

  function getDocName(DATE) {
    if (time == 'weeks') return DATE.toString();
    if (time == 'Months') return `${DATE.year}-${DATE.month}`;
    if (time == 'Years') return DATE.year.toString();
    if (time == 'Five Years') return `${DATE.year}-${DATE.year + 5}`;
    if (time == 'Ten Years') return `${DATE.year}-${DATE.year + 10}`;
  }

  const repObjRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('repeatedObjectives')
      .doc(id);

  const objRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(weekDate))
      .collection('objectives')
      .doc(id);

  const onChangeObjective = text => {
    console.log("date: ", weekDate)
    console.log("daydate: ", dayDate)
    if (repeatValue == 'never' || repeatValue == undefined) {
      objectives.sort((a, b) => a.n - b.n);
      const newObjectives = objectives.slice();
      newObjectives[n].text = text;
      setObjectives(newObjectives);
      objRef.update({ text: text });
    } else {
      repObjRef.update({ text: text });
      objRef.update({ text: text });
      // setRemoved(removed + 1);
    }
  };

  const onChangeCheckBox = () => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isDone;
    setObjectives(newObjectives);
    objRef.update({ done: !isDone });
  };

  useEffect(() => {
    // setTimeout(() => {
    // console.log(ref.current)
    // ref.current.setFocus()
    // }, 1000);
  }, []);

  return (
    <IonItemSliding style={{ paddingTop: 0 }}>
      <ObjectiveBody key={id}>
        <Checkbox mode="ios" slot="start" checked={isDone} onClick={() => onChangeCheckBox()} />

        <InputObjective
          placeholder="Type here..."
          value={text}
          onIonChange={e => onChangeObjective(e.detail.value)}
          //autofocus // POR QUE NO FUNCIONA
          ref={ref}
        />
        {/* <p>{weekDate.toString()}</p> */}
      </ObjectiveBody>

      <SlideOptions
        objRef={objRef}
        time={time}
        type={type}
        repeatValue={repeatValue}
        id={id}
        dayDate={dayDate}
        weekDate={weekDate}
        text={text}
        actualWeekDate={actualWeekDate}
      />
    </IonItemSliding>
  );
};

const Objective = React.forwardRef(objective);

export default Objective;

const Checkbox = styled(IonCheckbox)`
  --background-checked: ${COLORS.secondary};
  --border-color-checked: ${COLORS.secondary};
  margin-left: 0 !important;
`;

const ObjectiveBody = styled(IonItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  --padding-start: 0px !important;
  --padding-bottom: 0px !important;
  --padding-top: 10px !important;
  padding-bottom: 0px !important;
  --min-height: 100% !important; // sirve, pero que hace?
`;
