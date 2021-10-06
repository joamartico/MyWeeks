import { IonIcon } from '@ionic/react';
import React from 'react';

import styled from 'styled-components';

const AddButton = ({ onClick }) => {
  return (
    <Wrapper>
      <IonIcon onClick={onClick} name="ios-add-circle" size={36} color="#c5c4c6cc" />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  /* background-color: #c5c4c6; */
  height: 35;
  width: 35;
  margin-top: 15px;
  margin-bottom: 20px;
  align-self: center;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

//  const AddButton = styled.div`
// 	background-color: #37d673;
// 	height: 35;
// 	width: 35;
// 	margin-top: 15px;
// 	margin-bottom: 20px;
// 	align-self: center;
// 	border-radius: 10;
// 	justify-content: center;
// 	align-items: center;
// `;

export default AddButton;
