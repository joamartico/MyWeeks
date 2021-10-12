import React, { useContext, useRef, useEffect, useState } from 'react';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { InputObjective } from '../../constants/styledComponents';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import styled from 'styled-components';
import { COLORS } from '../../constants/theme';
import {
  IonCheckbox,
  IonDatetime,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonActionSheet,
} from '@ionic/react';
import { notifications, repeat, trash } from 'ionicons/icons';

const Objective = ({ isDone, id, n, text, date, time, repeatTime }) => {
  const { objectives, setObjectives, setRemoved, removed } = useContext(Context);
  const [selectedTime, setSelectedTime] = useState();

  function getDocName() {
    if (time == 'weeks') return date.toString();
    if (time == 'Months') return `${date.year}-${date.month}`;
    if (time == 'Years') return date.year.toString();
    if (time == 'Five Years') return `${date.year}-${date.year + 5}`;
    if (time == 'Ten Years') return `${date.year}-${date.year + 10}`;
  }

  const timeRef =
    authentication.currentUser &&
    db.collection('users').doc(authentication.currentUser.uid).collection(time).doc(getDocName());

  const onChangeObjective = text => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].text = text;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ text: text });
  };

  const onChangeCheckBox = () => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isDone;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ done: !isDone });
  };

  const onRemoveObjective = () => {
    timeRef.collection('objectives').doc(id).delete();
    setRemoved(removed + 1);
  };

  const onChangeRepeatTime = (newRepeatTime) => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].repeatTime = newRepeatTime;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ repeatTime: newRepeatTime });
  }

  const inputRef = useRef(null);

  return (
    <IonItemSliding style={{ paddingTop: 0 }}>
      <ObjectiveBody key={id}>
        {/* <BouncyCheckbox
				text=""
				onClick={() => onChangeCheckBox(isDone, id, n)}
				isChecked={isDone}
				borderColor={COLORS.secondary}
				fillColor={COLORS.secondary}
				style={{
          marginRight: -10,
					marginLeft: 0,
				}}
			/> */}

        <Checkbox mode="ios" slot="start" checked={isDone} onClick={() => onChangeCheckBox()} />

        <InputObjective
          placeholder="Type here..."
          value={text}
          onIonChange={e => onChangeObjective(e.detail.value)}
          // autoFocus={true} // POR QUE NO FUNCIONA
          // ref={inputRef}
          focus={true}
        />
      </ObjectiveBody>

      <SlideOptions side="end">
        <IonItemOption color="danger" onClick={() => onRemoveObjective()}>
          <IonIcon
            icon={trash}
            size={2}
            style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }}
          />
        </IonItemOption>

        <IonItemOption>
          <IonSelect
            value={repeatTime}
            selectedText=""
            placeholder={null}
            onIonChange={e => onChangeRepeatTime(e.detail.value)}
            interface="action-sheet"
          >
            <IonSelectOption value="week">Every Week {repeatTime == "week" && "✓"}</IonSelectOption>
            <IonSelectOption value="month">Every Month {repeatTime == "month" && "✓"}</IonSelectOption>
            <IonSelectOption value="year">Every Year {repeatTime == "year" && "✓"}</IonSelectOption>
          </IonSelect>
          <IonIcon icon={repeat} style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }} />
        </IonItemOption>

        <IonItemOption color="warning">
          <IonSelect
            value=""
            selectedText=""
            placeholder={null}
            onIonChange={e => console.log(e.detail)}
            interface="action-sheet"
          >
            <IonSelectOption value="notify">Notify Me ✓</IonSelectOption>
            <IonSelectOption value="silenced">Silenced</IonSelectOption>
          </IonSelect>
          <IonIcon
            icon={notifications}
            style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5, color: 'white' }}
          />
        </IonItemOption>
      </SlideOptions>
    </IonItemSliding>
  );
};

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

const SlideOptions = styled(IonItemOptions)``;
