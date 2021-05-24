import { IonModal } from '@ionic/react';
import React, { useContext } from 'react';
import { Context } from '../Context';
import styled from 'styled-components';

const ElementModal = () => {
  const { elementModal, setElementModal } = useContext(Context);

  return (
    <IonModal
      isOpen={elementModal != null ? true : false}
      cssClass="my-custom-class"
      swipeToClose={true}
      onDidDismiss={() => setElementModal(null)}
    >
      <Symbol>{elementModal?.symbol}  </Symbol>
    </IonModal>
  );
};

export default ElementModal;

const Symbol = styled.h4`
  font-size: 40px;
  font-weight: bold;
`;
