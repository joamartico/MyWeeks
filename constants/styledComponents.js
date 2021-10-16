import { IonButton, IonContent, IonInput, IonTextarea } from '@ionic/react';
import styled from 'styled-components';
import { COLORS } from './theme';

export const Body = styled(IonContent).attrs(props => ({
  fullscreen: true,
  className: 'scroll ion-padding ',
}))`
  --padding-top: ${({ pt }) => pt && pt};
  --padding-bottom: ${({ intoTabs }) => intoTabs && 'calc(75px + env(safe-area-inset-bottom))'};
`;

export const Padding = styled.div`
  margin: auto;
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Card = styled.div`
  background-color: #fff;
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 0.1%;
  padding-bottom: 4%;
  width: 92%;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0 7px 5px ${() => '#0004'};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

export const FullCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  margin: auto;
  max-width: 700px;
  box-shadow: 0 7px 5px ${() => '#0004'};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  height: ${({ intoTabs }) =>
    intoTabs
      ? 'calc(100% - 85px - env(safe-area-inset-bottom))'
      : 'calc(100% - env(safe-area-inset-bottom))'};
`;

export const Title = styled.p`
  font-size: ${({ size }) => {
    if (size === 'giant') return '7vh';
    if (size === 'big') return '5vh';
    return '20px';
  }};
  font-weight: bold;
  color: ${COLORS.primary};
  align-items: center;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${COLORS.primary};
  margin-bottom: 5px;
`;

export const StyledButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 1px solid ${COLORS.primary};
  cursor: pointer;
  background: ${COLORS.primary};
  background: ${({ outlined }) => (outlined ? '#0000' : COLORS.primary)};
  &:active {
    opacity: 0.6 !important;
  }
`;

export const ButtonTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const InputNotes = styled(IonTextarea)`
  width: 100%;
  font-size: 15px;
  min-height: 20px;
  --padding-top: 5px;
  --padding-start: 0;
`;

export const InputObjective = styled(IonTextarea).attrs(props => ({
  autoGrow: true,
  rows: 1,
}))`
  width: 100%;
  font-size: 15px;
  margin-left: auto;
  padding-bottom: 0px !important;
  padding-top: 0px !important;
  --padding-bottom: 0px !important;
  --padding-top: 0px !important;
  margin-top: auto;
  margin-bottom: auto;
`;

export const InputText = styled(IonInput)`
  font-size: 18px;
  margin-top: 10px;
  width: 100%;
  height: 40px !important;
  border-bottom: 1px solid ${COLORS.primary} !important;
  --padding-start: 0px !important;
  margin-bottom: 40px;
`;
