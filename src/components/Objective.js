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

const Objective = ({ isDone, id, n, text, date, time, repeatTime, dayDate, type, repeatValue }) => {
  const { objectives, setObjectives, setRemoved, removed } = useContext(Context);

  function getDocName(DATE) {
    if (time == 'weeks') return DATE.toString();
    if (time == 'Months') return `${DATE.year}-${DATE.month}`;
    if (time == 'Years') return DATE.year.toString();
    if (time == 'Five Years') return `${DATE.year}-${DATE.year + 5}`;
    if (time == 'Ten Years') return `${DATE.year}-${DATE.year + 10}`;
  }

  const objRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(date))
      .collection('objectives')
      .doc(id);

  // const srcObjRef =
  //   authentication.currentUser && dayDate &&
  //   db
  //     .collection('users')
  //     .doc(authentication.currentUser.uid)
  //     .collection(time)
  //     .doc(getDocName(dayDate))
  //     .collection('objectives')
  //     .doc(id);

  const repObjRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('repeatedObjectives')
      .doc(id);

  const onChangeObjective = text => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].text = text;
    setObjectives(newObjectives);
    objRef.update({ text: text });
  };

  const onChangeCheckBox = () => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isDone;
    setObjectives(newObjectives);
    objRef.update({ done: !isDone });
  };

  const onRemoveObjective = () => {
    objRef.delete();
    setRemoved(removed + 1);
  };

  const onChangeRepeatTime = newRepeatTime => {
    console.log('CHANGED SELECTOR: ', newRepeatTime);
    var newRepeatDate = '';

    if (newRepeatTime == 'never') {
      objRef.update({
        repeatTime: 'never',
        repeatValue: 'never',
      });

      repObjRef.delete();

      setRemoved(removed + 1);
    } else {
      if (newRepeatTime == 'week') {
        newRepeatDate = `week`;
      }
      if (newRepeatTime == 'month') {
        newRepeatDate = `${dayDate.day}`;
      }
      if (newRepeatTime == 'year') {
        newRepeatDate = `${dayDate.day}/${dayDate.month}`;
      }

      // objectives.sort((a, b) => a.n - b.n);
      // const newObjectives = objectives.slice();
      // newObjectives[n].repeatTime = newRepeatDate;
      // setObjectives(newObjectives);
      if (newRepeatTime) {
        objRef.update({
          repeatTime: newRepeatDate,
          repeatValue: newRepeatTime,
        });

        repObjRef.set({
          repeatTime: newRepeatDate,
          repeatValue: newRepeatTime,
          isDone: false,
          text,
          type,
          date: dayDate.year + '-' + dayDate.month + '-' + dayDate.day,
        });

        setRemoved(removed + 1);
      }
    }
  };

  return (
    <IonItemSliding style={{ paddingTop: 0 }}>
      <ObjectiveBody key={id}>
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
          {console.log(repeatValue)}
          <IonSelect
            // value={repeatValue}
            selectedText=""
            placeholder={null}
            onIonChange={e => {
              onChangeRepeatTime(e.detail.value);
              console.log(e.detail);
            }}
            interface="action-sheet"
          >
            <IonSelectOption value="never">Never {repeatValue == 'never' && '✓'}</IonSelectOption>

            <IonSelectOption value="week">
              Every Week {repeatValue == 'week' && '✓'}
            </IonSelectOption>

            <IonSelectOption value="month">
              Every Month {repeatValue == 'month' && '✓'}
            </IonSelectOption>

            <IonSelectOption value="year">
              Every Year {repeatValue == 'year' && '✓'}
            </IonSelectOption>
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
