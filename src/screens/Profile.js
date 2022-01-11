import React, { useEffect, useState } from 'react';
import { StyledButton, Title, Subtitle, FullCard, Body } from '../components/styledComponents';
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
  useIonToast,
} from '@ionic/react';
import styled from 'styled-components';
import useCheck from '../hooks/useCheck';
import useGoogleCalendar from '../hooks/useGoogleCalendar';

const Profile = () => {
  function scrolltoBottom() {
    window.scrollTo(0, 200);
  }

  const router = useIonRouter();
  const [feedbacktext, setFeedbacktext] = useState('');
  const [presentToast, dismissToast] = useIonToast();
  const [checked, setChecked] = useCheck();
  const { signOut, signIn } = useGoogleCalendar();

  const displayName = authentication?.currentUser && authentication?.currentUser?.displayName;
  const email = authentication?.currentUser && authentication?.currentUser?.email;

  const sendEmail = async () => {
    const data = await {
      time: authentication.currentUser.email,
      email: 'joamartico@gmail.com',
      message: feedbacktext,
    };

    await fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() =>
        presentToast({
          color: 'dark',
          message: 'Email sent!',
          duration: 1500,
        })
      )
      .catch(() =>
        presentToast({
          color: 'danger',
          message: 'Email sent!',
          duration: 2000,
        })
      );
  };

  async function onToggle(e) {
    setChecked(!checked);
    const newCheckedVal = !checked;

    if (newCheckedVal === true) {
      signIn();
    }

    if (newCheckedVal === false) {
      signOut();
    }
  }

  return (
    <IonPage>
      <Body>
        <FullCard className="ion-padding" intoTabs>
          <IonList>
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
              <IonLabel>Google Calendar</IonLabel>
              <IonToggle
                color="success"
                checked={checked}
                // onIonChange={onToggle}
                onClick={onToggle}
              />
            </IonItem>
            <Separator />

            <IonItem lines="none" style={{ marginBottom: '-2%' }}>
              <IonLabel>Send us Feedback</IonLabel>
            </IonItem>

            <IonItem lines="none">
              <TextArea
                onIonInput={e => setFeedbacktext(e.target.value)}
                rows="5"
                autocapitalize
                position="floating"
                onIonFocus={scrolltoBottom}
                // placeholder="Tell us your ideas to improve the app"
              />
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
              onClick={async () => {
                // await gapi.client.setToken({ access_token: '' });
                await signOut();
                await setChecked(false);
                authentication?.signOut().then(() => router.push('/onboarding', 'forward', 'pop'));
              }}
            >
              Log Out
            </StyledButton>
          </IonList>
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
  /* margin-top: -3px; */
`;

const Separator = styled.div`
  margin-bottom: 15px;
`;
