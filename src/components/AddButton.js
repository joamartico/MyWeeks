import { IonIcon } from '@ionic/react';
import { addCircle } from "ionicons/icons";
import React from 'react';

import styled from 'styled-components';

const AddButton = ({ onClick }) => {
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
