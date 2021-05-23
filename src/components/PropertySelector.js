import { useContext, useState } from 'react';
import { Context } from '../Context';

import {
  IonButtons,
  useIonPicker,
  IonItem,
  IonSelectOption,
  IonSelect,
  isPlatform,
} from '@ionic/react';

const PropertySelector = () => {
  const { property, setProperty, showSearchBar } = useContext(Context);
  //   const [present] = useIonPicker();

  return (
    <>
      {(showSearchBar == false || isPlatform('mobile') == false) && (
        <IonButtons slot="start">
          <IonItem
            lines="none"
            // style={{ height: '40px' }}
          >
            <IonSelect
              //   style={{ position: 'fixed'}}
              style={
                {
                  // height: '40px'
                }
              }
              value={property}
              onIonChange={e => setProperty(e.detail.value)}
              interface="popover"
              // multiple={true}
            >
              <IonSelectOption value="Atomic Mass">Atomic Mass</IonSelectOption>
              <IonSelectOption value="Density">Density</IonSelectOption>
              <IonSelectOption value="Electronegativity">Electronegativity</IonSelectOption>
              <IonSelectOption value="Electron Afinity">Electron Afinity</IonSelectOption>
              <IonSelectOption value="Radio">Radio</IonSelectOption>
              <IonSelectOption value="Boil Temperature">Boil Temperature</IonSelectOption>
              <IonSelectOption value="Melt Temperature">Melt Temperature</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonButtons>
      )}
    </>
    // <IonButton
    //     expand="block"
    //   onClick={() =>
    //     present({
    //       buttons: [
    //         {
    //           text: 'Cancel',
    //         },
    //         {
    //           text: 'Confirm',
    //           handler: selected => {
    //             setProperty(selected.property.value);
    //           },
    //         },
    //       ],
    //       columns: [
    //         {
    //           name: 'property',
    //           options: [
    //             { text: 'Atomic Mass', value: 'Atomic Mass' },
    //             { text: 'Density', value: 'Density' },
    //             { text: 'Electronegativity', value: 'Electronegativity' },
    //             { text: 'Boil Temperature', value: 'Boil Temperature' },
    //             { text: 'Melt Temperature', value: 'Melt Temperature' },
    //           ],
    //         },
    //       ],
    //     })
    //   }
    // >
    //   {property}
    // </IonButton>
  );
};

export default PropertySelector;
