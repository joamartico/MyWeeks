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
import { notifications, repeat, trash } from "ionicons/icons";

const Objective = ({ isDone, id, n, text, date, time }) => {
  const { objectives, setObjectives } = useContext(Context);
  const [presentRepeatSheet, dismissRepeatSheet] = useIonActionSheet();
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

  const onChangeObjective = (text, id, n) => {
    console.log(text, id, n);

    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].text = text;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ text: text });
  };

  const onChangeCheckBox = (isChecked, id, n) => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isChecked;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ done: !isChecked });
  };

  const inputRef = useRef(null);

  return (
    <IonItemSliding style={{ minHeight: "100%", marginBottom: 8 }}>
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

        <Checkbox
          mode="ios"
          slot="start"
          checked={isDone}
          onClick={() => onChangeCheckBox(isDone, id, n)}
        />

        <InputObjective
          placeholder="Type here..."
          value={text}
          onIonChange={e => onChangeObjective(e.detail.value, id, n)}
          // autoFocus={true} // POR QUE NO FUNCIONA
          // ref={inputRef}
          focus={true}
        />
      </ObjectiveBody>

      <SlideOptions side="end">
        <IonItemOption color="danger" onClick={() => console.log('share clicked')}>
          <IonIcon icon={trash} size={2} style={{ paddingLeft: 5, paddingRight: 5 }} />
        </IonItemOption>

        <IonItemOption>
          <IonSelect
            value=""
            selectedText=""
            placeholder={null}
            onIonChange={e => console.log(e.detail)}
            interface="action-sheet"
          >
            <IonSelectOption value="day">Every Day ✓</IonSelectOption>
            <IonSelectOption value="week">Every Week</IonSelectOption>
            <IonSelectOption value="month">Every Month</IonSelectOption>
            <IonSelectOption value="year">Every Year</IonSelectOption>
          </IonSelect>
          <IonIcon icon={repeat} style={{ paddingLeft: 5, paddingRight: 5 }} />
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
            style={{ paddingLeft: 5, paddingRight: 5, color: 'white' }}
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
  padding-bottom: 0px !important;
  --min-height: 100% !important; // sirve, pero que hace?
`;

const SlideOptions = styled(IonItemOptions)`
  height: calc(100% - 2px) !important;
  margin: 1px !important;
  `;
