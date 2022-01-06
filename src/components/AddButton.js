import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import React, { useContext } from 'react';
import useObjectives from "../hooks/useObjectives";

const AddButton = ({ type, time, date}) => {
const {addObjective} = useObjectives(date, time)



  // const onAddObjective = async type => {
  //   if(newDocId && objectives.length > 0) {
  //     var newObjectives = await objectives.slice();
  //     newObjectives[newObjectives.length - 1].id = await newDocId;
  //     // newObjectives[newObjectives.length - 1].order = await newObjectives.length ;
  //     await setObjectives(newObjectives);
  //   }

  //   await setObjectives(prevObjectives => [
  //     ...prevObjectives,
  //     {
  //       text: '',
  //       done: false,
  //       n: prevObjectives.length,
  //       order: objectives.length, 
  //       // NO SE POR QUE CUANDO LO DESCOMENTO NO FUNCIONA
  //       type: type || '',
  //       repeatValue: type ? 'never' : '',
  //     },
  //   ]);

  //   const newDoc = await ref.collection('objectives').doc();

    
  //   await setNewDocId(newDoc.id);
    
  //   await newDoc.set({
  //     text: '',
  //     done: false,
  //     order: objectives.length,
  //     type: type || '',
  //     repeatValue: type ? 'never' : '',
  //   });

  //   // await setRemoved(removed + 1)
    
  //   // no funciona:
  //   // var newObjectives = await objectives.slice();
  //   // newObjectives[newObjectives.length - 1].id = await newDoc.id;
  //   // await setObjectives(newObjectives);

    


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
