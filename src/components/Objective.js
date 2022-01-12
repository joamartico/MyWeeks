import React from 'react';
import { InputObjective } from '../components/styledComponents';
import { authentication, db } from '../../firebase';
import styled from 'styled-components';
import { COLORS } from '../../styles/theme';
import { IonCheckbox, IonItem, IonItemSliding } from '@ionic/react';
import SlideOptions from './SlideOptions';
import useGoogleCalendar from '../hooks/useGoogleCalendar';
import useGlobalState from "../hooks/useGlobalState";

const Objective = ({
  isDone,
  id,
  text,
  dayDate,
  weekDate,
  time,
  type,
  actualWeekDate,
  repeatValue,
  notifTime,
  n,
}) => {
  const { objectives, setObjectives } = useGlobalState();
  const { updateEvent, isEnabled } = useGoogleCalendar();

  // NECESITO QUE LA PROP repeatValue NO RE RENDERIZE EL COMPONENTE CUANDO CAMBIA

  function getDocName() {
    if (time == 'weeks') return weekDate.toString();
    if (time == 'Months') return `${weekDate.year}-${weekDate.month}`;
    if (time == 'Years') return weekDate.year.toString();
    if (time == 'Five Years') return `${weekDate.year}-${weekDate.year + 5}`;
    if (time == 'Ten Years') return `${weekDate.year}-${weekDate.year + 10}`;
  }

  var objRef =
    authentication.currentUser &&
    id &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName())
      .collection('objectives')
      .doc(id);

  var repObjRef =
    authentication.currentUser &&
    id &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('repeatedObjectives')
      .doc(id);

  const onChangeObjective = text => {
    console.log("onChangeObjective notifTime: ", notifTime)
    isEnabled() && updateEvent({
      id,
      date: dayDate,
      text,
      repeatTime: repeatValue,
      notifTime
    });

    if (id) {
      if (actualWeekDate == undefined) {
        objectives.sort((a, b) => a.n - b.n);
        const newObjectives = objectives.slice();
        newObjectives[n].text = text;
        setObjectives(newObjectives);
        objRef?.update({ text: text });

        if (repeatValue != undefined && repeatValue != 'never') {
          repObjRef?.update({ text: text });
        }
      } else {
        repObjRef?.update({ text: text });
        objRef?.update({ text: text });

        // setRemoved(removed + 1);
      }
    }
  };

  const onChangeCheckBox = () => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isDone;
    setObjectives(newObjectives);
    objRef.update({ done: !isDone });
  };

  return (
    <IonItemSliding style={{ paddingTop: 0 }}>
      <ObjectiveBody key={id}>
        <Checkbox mode="ios" slot="start" checked={isDone} onClick={() => onChangeCheckBox()} />

        <InputObjective
          placeholder="Type here..."
          value={text}
          onIonInput={e => onChangeObjective(e.target.value)}
          autofocus

          // ref={forwardedRef}
        />
      </ObjectiveBody>

      <SlideOptions
        time={time}
        type={type}
        repeatValue={repeatValue}
        id={id}
        dayDate={dayDate}
        weekDate={weekDate}
        text={text}
        actualWeekDate={actualWeekDate}
        notifTime={notifTime}
        repObjRef={repObjRef}
        n={n}
      />
    </IonItemSliding>
  );
};

// const Objective = React.forwardRef(objective);

export default Objective;

const Checkbox = styled(IonCheckbox)`
  --background-checked: ${COLORS.secondary};
  --border-color-checked: ${COLORS.secondary};
  margin-left: 0 !important;
  margin-right: 20px !important;
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
  --background-focused: #0000; // ?
  /* z-index: -9999999999 !important; */
  /* background: red; */
`;
