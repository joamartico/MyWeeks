import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import React, { useContext } from 'react';
import useGoogleCalendar from "../hooks/useGoogleCalendar";
import useObjectives from "../hooks/useObjectives";

const AddButton = ({ type, time, date, dayDate}) => {
const {addObjective} = useObjectives(date, time)
const {createEvent, isEnabled} = useGoogleCalendar()


  //   // setTimeout(() => {
  //   //   await ref.current.setFocus()
  //   //   console.log('REF: ', ref.current);
  //   // }, 3000);
  // };

  async function onClick() {
    const newDocId = await addObjective(type)
    time === "weeks" && isEnabled() && createEvent(newDocId, dayDate)
  }
  return (
    <IonIcon
      onClick={onClick}
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
