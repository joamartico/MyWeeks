

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonSearchbar,
  IonList
} from '@ionic/react';

import { useState } from 'react';




const Feed = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent className="scroll" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>

          <IonSearchbar
            animated
            showCancelButton="focus"
            onIonChange={() => console.log('object')}
          />
        </IonHeader>

        
        
      </IonContent>
    </IonPage>
  );
};

export default Feed;
