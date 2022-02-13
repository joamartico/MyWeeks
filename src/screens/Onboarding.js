import React, { useState } from 'react';
import {
  Body,
  Title,
  FullCard,
  Subtitle,
  StyledButton,
  Padding,
} from '../components/styledComponents';
import PWAPrompt from 'react-ios-pwa-prompt';
import { COLORS } from '../../styles/theme';
import { IonPage, useIonRouter } from '@ionic/react';
import styled from "styled-components";

const Onboarding = () => {
  const router = useIonRouter();
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);

  function IsSafari() {
    let userAgentString = navigator.userAgent;

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf('Chrome') > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf('Safari') > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
  }

  return (
    <IonPage>
      <Body>
        <FullCard>
          <Padding>
            <div
              style={{
                // height: '80%',
                // marginTop:"20%",
                margin: 'auto',
                // maxWidth: '550px',
                // background: "#f001"
              }}
            >
              <MainTitle>Welcome to {''} MyWeeks !</MainTitle>

              <MainSubtitle>
                Your weekly schedule app to manage your time and achive your goals
              </MainSubtitle>
            </div>
            {/* <div> */}
            {IsSafari() && (
              <StyledButton
                style={{
                  marginTop: 'auto',
                }}
                outlined
                onClick={() => setShowPWAPrompt(true)}
              >
                Install App
              </StyledButton>
            )}
            <StyledButton
              style={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={() => router.push('/signin', 'forward', 'push')}
            >
              Get Started!
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

const MainTitle = styled.h1`
  font-size:  7vh;
  font-weight: bold;
  color: ${COLORS.primary};
  align-items: center;
`;

const MainSubtitle = styled.h2`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${COLORS.primary};
  margin-bottom: 5px;
  margin-top: 3vh;
  max-width: 500px;
  font-weight: 500;
`;
