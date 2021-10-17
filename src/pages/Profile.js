import React, { useState } from 'react';
import {
  StyledButton,
  ButtonTitle,
  Title,
  Subtitle,
  FullCard,
  Body,
} from '../../constants/styledComponents';
import { authentication } from '../../firebase';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonToggle,
  useIonRouter,
} from '@ionic/react';
import styled from 'styled-components';

const Profile = () => {
  const router = useIonRouter();
  const [feedbacktext, setFeedbacktext] = useState("")



  const displayName = authentication?.currentUser && authentication?.currentUser?.displayName;
  const email = authentication?.currentUser && authentication?.currentUser?.email;

  const sendEmail = () => {
	const data = {
		time: authentication.currentUser.email,
		email: "joamartico@gmail.com",
		message: feedbacktext,
	  };
  
	  fetch('/api/mail', {
		method: 'POST',
		body: JSON.stringify(data),
	  });
  }

  return (
    <IonPage>
      <Body>
        <FullCard className="ion-padding" intoTabs>
          <Title size="big">Profile</Title>

          <IonItem>
            <IonLabel>Account</IonLabel>
            <IonText color="medium">{displayName}</IonText>
          </IonItem>

          <Separator />

          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonText color="medium">{email}</IonText>
          </IonItem>

          <Separator />

          <IonItem>
            <IonLabel>Daily Notifications</IonLabel>
            <IonToggle
              color="success"
              checked={false}
              onIonChange={e => console.log(e.detail.checked)}
            />
          </IonItem>
          <Separator />

          <IonItem lines="none" style={{ marginBottom: '0x' }}>
            <IonLabel>Send us Feedback</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <TextArea onIonChange={(e) => setFeedbacktext(e.detail.value)} rows="5" placeholder="Tell us your ideas to improve the app" />
          </IonItem>

          <IonItem lines="none">
            <IonButton size="default" style={{ marginLeft: 'auto' }} onClick={() => sendEmail()}>
              Send
            </IonButton>
          </IonItem>

          <Separator />

          <StyledButton
            outlined
            red
            onClick={() =>
              authentication?.signOut().then(() => router.push('/onboarding', 'forward', 'pop'))
            }
          >
            Log Out
          </StyledButton>
        </FullCard>
      </Body>
    </IonPage>
  );
};

export default Profile;

const TextArea = styled(IonTextarea)`
  width: 100%;
  /* height: 100%; */
  border-radius: 10px;
  /* border: 2px solid #d6d5d8; */
  border: 1px solid #e3e3e5;
  --padding-top: 10px !important;
  --padding-start: 10px !important;
  --padding-end: 10px !important;
  --padding-bottom: 10px !important;
  margin-bottom: 10px;
`;

const Separator = styled.div`
  margin-bottom: 15px;
`;
