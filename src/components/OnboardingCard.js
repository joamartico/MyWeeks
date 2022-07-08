import { useIonRouter } from '@ionic/react';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/theme';
import { useObserver } from '../hooks/useObserver';
import { Padding, StyledButton } from './styledComponents';

const OnboardingCard = ({
  reference,
  area,
  img,
  description,
  title,
  subtitle,
  buttons,
  setShowPWAPrompt,
}) => {
  const router = useIonRouter();

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
    <ScrollArea area={area}>
      <Card ref={reference}>
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
            {title && <MainTitle>{title}</MainTitle>}
            {subtitle && <MainSubtitle> {subtitle}</MainSubtitle>}

            {img && <Img src={img} />}
            {description && <Description>{description}</Description>}
          </div>

          {buttons && (
            <>
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
            </>
          )}
        </Padding>
      </Card>
    </ScrollArea>
  );
};

export default OnboardingCard;

const ScrollArea = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  grid-area: ${({ area }) => area};
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  margin: auto;
  width: 94vw;
  max-width: 700px;
  box-shadow: 0 7px 5px ${() => '#0004'};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  height: 80vh;
  margin-top: 2vh;
`;

const MainTitle = styled.h1`
  font-size: 6.5vh;
  font-weight: bold;
  color: ${COLORS.primary};
  align-items: center;
`;

const MainSubtitle = styled.p`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${COLORS.primary};
  margin-bottom: 5px;
  margin-top: 3vh;
  max-width: 500px;
  /* font-weight: 2%; */
  font-weight: bold;
  line-height: 1.6;
`;

const Description = styled.p`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${COLORS.primary};
  margin-bottom: 5px;
  margin-top: 3vh;
  max-width: 500px;
  /* font-weight: 2%; */
  font-weight: bold;
  text-align: center;
`;

const Img = styled.img`
  height: 450px;
  display: block;
  margin: auto;
`;
