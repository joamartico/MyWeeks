import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import React, { useContext } from 'react';

import styled from 'styled-components';
import { Context } from '../context/ContextComponent';

function isDay(type) {
  return (
    type === 'Monday' ||
    type === 'Tuesday' ||
    type === 'Wednesday' ||
    type === 'Thursday' ||
    type === 'Friday' ||
    type === 'Saturday' ||
    type === 'Sunday'
  );
}

const AddButton = ({ type, weekRef, timeRef }) => {
  const ref = weekRef || timeRef;
  const { objectives, setObjectives, setNewDocId } = useContext(Context);

  // const onAddObjective = async () => {
  //   setObjectives([
  //     ...objectives,
  //     {
  //       text: '',
  //       done: false,
  //       n: objectives.length,
  //     },
  //   ]);

  //   const newDoc = await timeRef.collection('objectives').doc();

  //   setNewDocId(newDoc.id);

  //   newDoc.set({
  //     text: '',
  //     done: false,
  //     order: objectives.length,
  //   });
  // };

  const onAddObjective = async type => {
    await setObjectives([
      ...objectives,
      {
        text: '',
        done: false,
        n: objectives.length,
       type:  type || "",
      },
    ]);

    const newDoc = await ref.collection('objectives').doc();

    await setNewDocId(newDoc.id);

    await newDoc.set({
      text: '',
      done: false,
      order: objectives.length,
      type: type || "",
      repeatValue: type ? 'never' : "",
    });

    // setTimeout(() => {
    //   await ref.current.setFocus()
    //   console.log('REF: ', ref.current);
    // }, 3000);
  };
  return (
    <IonIcon
      onClick={() => onAddObjective(type)}
      icon={addCircle}
      style={{
        fontSize: 36,
        color: '#c5c4c6cc',
        display: 'flex',
        margin: 'auto',
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  );
};

export default AddButton;
