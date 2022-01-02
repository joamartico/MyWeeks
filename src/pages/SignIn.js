import React, { useState } from 'react';
import { COLORS } from '../../constants/theme';
import styled from 'styled-components';
import { authentication, db } from '../../firebase';
import {
  StyledButton,
  InputText,
  Title,
  Card,
  FullCard,
  Padding,
  Body,
} from '../../constants/styledComponents';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { IonContent, IonPage, useIonRouter, useIonToast } from '@ionic/react';

const SignIn = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [presentToast, dismissToast] = useIonToast();

  const onSignIn = () => {
    authentication
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        router.push('/tabs/week', 'none', 'replace');
      })
      .catch(err => {
        function getMessage(err) {
          if (err.code === 'auth/user-not-found') return `The email ${email} is not registered`;
          if (err.code === 'auth/wrong-password') return `The password is incorrect`;
        }
        presentToast({
          color: 'danger',
          message: getMessage(err) || err,
          duration: 2500,
        });
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
      <Body>
        <FullCard>
          <Padding>
            <Title size="big" style={{ fontSize: '5vh', paddingTop: '3vh' }}>
              Login
            </Title>
            <div>
              <InputText
                placeholder="Email"
                value={email}
                onIonInput={e => setEmail(e.target.value)}
              />
              <InputText
                placeholder="Password"
                value={password}
                onIonInput={e => setPassword(e.target.value)}
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
                Sign In
              </StyledButton>

              <StyledButton
                onClick={() => router.push('/signup', 'forward', 'push')}
                style={{
                  marginTop: 10,
                }}
                outlined
              >
                Create an account
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
								<Title style={{ color: "#eb060a" }}>
									Google
								</Title>
							</SocialButton>

							<SocialButton style={{ borderColor: "#1a4367" }}>
								<Title style={{ color: "#1a4367" }}>
									Facebook
								</Title>
							</SocialButton> */}
              </Row>
            </div>
          </Padding>
        </FullCard>
      </Body>
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
