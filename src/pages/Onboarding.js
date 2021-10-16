import React, { useState } from 'react';
import {
  Body,
  Title,
  FullCard,
  Subtitle,
  StyledButton,
  ButtonTitle,
  Padding,
} from '../../constants/styledComponents';
import PWAPrompt from 'react-ios-pwa-prompt';
import { COLORS } from '../../constants/theme';
import { IonPage, useIonRouter } from '@ionic/react';

const Onboarding = () => {
  const router = useIonRouter();
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);

  function IsSafari() {
    let userAgentString = navigator.userAgent;

    console.log(userAgentString);

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf('Chrome') > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf('Safari') > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    console.log(safariAgent);
    return safariAgent;
  }

  return (
    <IonPage>
      <Body>
        <FullCard>
          <Padding >
            <div
              style={{
                // height: '80%',
                // marginTop:"20%",
                margin: 'auto',
                // maxWidth: '550px',
                // background: "#f001"
              }}
            >
              <Title size="giant">Welcome to {''} MyWeeks!</Title>

              <Subtitle style={{ marginTop: '3vh', maxWidth: '500px', }}>
                Your weekly schedule app to manage your time and achive your goals
              </Subtitle>
            </div>
            {/* <div> */}
            {IsSafari() && (
              <StyledButton
              style={{
                marginTop: 'auto',
                background: '#fff',
                // marginBottom: 10,
              }}
              onClick={() => setShowPWAPrompt(true)}
              >
                <ButtonTitle style={{ color: COLORS.primary }}>Install App</ButtonTitle>
              </StyledButton>
            )}
            <StyledButton
              style={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={() => router.push('/signin', 'forward', 'push')}
              >
              <ButtonTitle>Get Started!</ButtonTitle>
            </StyledButton>
              {/* </div> */}
          </Padding>
        </FullCard>

        {showPWAPrompt && (
          <PWAPrompt
            debug={true}
            delay={5}
            onClose={() =>
              setTimeout(function () {
                setShowPWAPrompt(false);
              }, 300)
            }
          />
        )}
      </Body>
    </IonPage>
  );
};

export default Onboarding;
