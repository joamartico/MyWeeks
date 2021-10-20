import React, { useState } from 'react';
import { authentication, db } from '../../firebase';
import {
  Body,
  StyledButton,
  Title,
  FullCard,
  InputText,
  Subtitle,
  Padding,
} from '../../constants/styledComponents';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

const SignUp = () => {
  const router = useIonRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    authentication
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        db.collection('users').doc(res.user.uid).set({
          name,
          email,
          password,
        });
        await authentication.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => router.push('/tabs/week', 'forward', 'replace'));
      })
      .catch(err => {
        function getMessage(err) {
          if (err.code === 'auth/invalid-email') return `The email ${email} is badly formated`;
          if (err.code === 'auth/weak-password')
            return `The password must be at least 6 characters`;
          if (err.code === 'auth/email-already-in-use')
            return `The email ${email} is already in use by another account.`;
        }
        alert(getMessage(err) || err);
        console.log(err);
      });
  };

  return (
    <IonPage>
      <Body>
        <FullCard>
          <Padding>
            <Title size="big">Create your account</Title>

            <div>
              <Subtitle>User Name</Subtitle>
              <InputText
                style={{ marginTop: 0 }}
                placeholder="Enter your name"
                value={name}
                onIonChange={e => setName(e.detail.value)}
              />
            </div>

            <div>
              <Subtitle>Email</Subtitle>
              <InputText
                style={{ marginTop: 0 }}
                placeholder="Enter your email"
                value={email}
                onIonChange={e => setEmail(e.detail.value)}
                // type="email"
              />
            </div>

            <div>
              <Subtitle>Password</Subtitle>
              <InputText
                style={{ marginTop: 0 }}
                placeholder="Enter your password"
                value={password}
                onIonChange={e => setPassword(e.detail.value)}
                type="password"
              />
            </div>


              <StyledButton onClick={() => onSignUp()}>Sign Up</StyledButton>

          </Padding>
        </FullCard>
      </Body>
    </IonPage>
  );
};

// const Title = styled.Text`
// 	font-size: 24px;
// 	font-weight: bold;
// 	color: ${COLORS.primary};
// `;

// const StyledButton = styled.TouchableOpacity`
// 	margin-top: 20px;
// 	justify-content: center;
// 	align-items: center;
// 	width: 100%;
// 	height: 45;
// 	border-radius: 10;
// 	background-color: ${COLORS.primary};
// `;

export default SignUp;
