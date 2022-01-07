import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import React, { useContext } from 'react';
import useObjectives from "../hooks/useObjectives";

const AddButton = ({ type, time, date}) => {
const {addObjective} = useObjectives(date, time)


  //   // setTimeout(() => {
  //   //   await ref.current.setFocus()
  //   //   console.log('REF: ', ref.current);
  //   // }, 3000);
  // };
  return (
    <IonIcon
      onClick={() => addObjective(type)}
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
