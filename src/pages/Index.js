import React, { useContext } from 'react';
import styled from 'styled-components';

import { IonPage, IonHeader, IonToolbar, IonButtons, IonContent } from '@ionic/react';

import PropertySelector from '../components/PropertySelector';
import SearchBarOrIcon from '../components/SearchBarOrIcon';
import PeriodicTable from '../components/PeriodicTable';
import ElementModal from '../components/ElementModal';

const Index = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchBarOrIcon />
          <PropertySelector />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ScrollX>
          <PeriodicTable />
        </ScrollX>

        <ElementModal />
      </IonContent>
    </IonPage>
  );
};

const ScrollX = styled.div`
  overflow-y: hidden !important;
  overflow-x: auto !important;
  height: 100%;
  display: flex;
  width: 100%;
`;

export default Index;
