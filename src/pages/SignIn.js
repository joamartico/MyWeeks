import React, { useState } from 'react';
import { COLORS } from '../../constants/theme';
import styled from 'styled-components';
import { authentication, db } from '../../firebase';
import {
  StyledButton,
  ButtonTitle,
  InputText,
  Title,
  Card,
  FullCard,
  Padding,
} from '../../constants/styledComponents';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

const SignIn = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    authentication
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        router.push('/tabs/week', 'none', 'replace');
      })
      .catch(err => {
        function getMessage(err) {
          if (err.code === 'auth/user-not-found') return `The email ${email} is not registered`;
          if (err.code === 'auth/wrong-password') return `The password is incorrect`;
        }
        alert(getMessage(err) || err);
        console.log(err);
      });
  };

  const PROVIDER_ID = '660837128286-colba8t7tkdsr0rnibm2jju7drag6t84.apps.googleusercontent.com';

  const uiConfig = {
    signInFlow: 'popup',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    // signInSuccessUrl: "/bottomtabs/weeks",
    callbacks: {
      signInSuccess: () => router.push('/tabs/week', 'none', 'replace'),
    },
  };

  return (
    <IonPage>
      <IonContent className="scroll ion-padding" fullscreen>
        <FullCard>
          <Padding>
            <Title style={{ fontSize: '5vh', paddingTop: '3vh' }}>Login</Title>
            <div>
              <InputText
                placeholder="Email"
                value={email}
                onIonChange={e => setEmail(e.detail.value)}
              />
              <InputText
                placeholder="Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value)}
                type="password"
              />

              <p
                style={{
                  color: 'gray',
                  marginTop: 20,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}
              >
                Forgot your password?
              </p>

              <StyledButton onClick={() => onSignIn()} style={{ marginTop: 20 }}>
                <ButtonTitle>Sign In</ButtonTitle>
              </StyledButton>

              <StyledButton
                onClick={() => router.push('/signup', 'forward', 'push')}
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  background: 'white',
                }}
              >
                <ButtonTitle style={{ color: COLORS.primary }}>Create an account</ButtonTitle>
              </StyledButton>
            </div>

            <div>
              <p
                style={{
                  color: 'gray',
                  marginTop: '6%',
                  marginBottom: '15',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                Or connect with
              </p>
              <Row>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={authentication}
                  style={{ width: '100%' }}
                />

                {/* <SocialButton style={{ borderColor: "#eb060a" }}>
								<ButtonTitle style={{ color: "#eb060a" }}>
									Google
								</ButtonTitle>
							</SocialButton>

							<SocialButton style={{ borderColor: "#1a4367" }}>
								<ButtonTitle style={{ color: "#1a4367" }}>
									Facebook
								</ButtonTitle>
							</SocialButton> */}
              </Row>
            </div>
          </Padding>
        </FullCard>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;

const SocialButton = styled.div`
  height: 45px;
  border-radius: 20;
  width: 140;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
  border-width: 1;
`;

const Row = styled.div`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  /* padding-left: 40px;
  padding-right: 40px; */
  align-items: center;
  margin-bottom: 25px;
`;
