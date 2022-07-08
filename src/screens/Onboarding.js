import React, { useRef, useState } from 'react';
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
import styled from 'styled-components';
import { useObserver } from '../hooks/useObserver';
import OnboardingCard from '../components/OnboardingCard';

const Onboarding = () => {
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);

  const welcomeCardRef = useRef();
  const weekCardRef = useRef();
  const repeatCardRef = useRef();
  const yearCardRef = useRef();
  const finalCardRef = useRef();

  const isInWelcomeCard = useObserver(welcomeCardRef);
  const isInWeekCard = useObserver(weekCardRef);
  const isInRepeatCard = useObserver(repeatCardRef);
  const isInYearCard = useObserver(yearCardRef);
  const isInFinalCard = useObserver(finalCardRef);

  return (
    <IonPage>
      {/* <Body> */}
      <ScrollContainer>
        <OnboardingCard
          area={'welcome'}
          reference={welcomeCardRef}
          title={'Welcome to MyWeeks!'}
          subtitle={'Your weekly schedule app to manage your time and achive your goals'}
        />

        <OnboardingCard
          area={'week'}
          reference={weekCardRef}
          img="/onboarding-1.png"
          description="Set weekly tasks and notes"
        />

        <OnboardingCard
          area={'repeat'}
          reference={repeatCardRef}
          img="/onboarding-2.png"
          description={'Create a day event and repeat it weekly, monthly or yearly'}
        />

        <OnboardingCard
          area={'year'}
          reference={yearCardRef}
          img="/onboarding-3.png"
          description={'Set goals for the coming months, years, and decades'}
        />
        <OnboardingCard
          area={'final'}
          reference={finalCardRef}
          title={'Ready to get started?'}
          subtitle="Start today to manage your time to achieve productive weeks and reach your goals
          "
          buttons={true}
          setShowPWAPrompt={setShowPWAPrompt}
        />
      </ScrollContainer>

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
      {/* </Body> */}

      <BottomRow>
        <Dots>
          <Dot
            active={isInWelcomeCard}
            onClick={() => {
              welcomeCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
          <Dot
            active={isInWeekCard}
            onClick={() => {
              weekCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
          <Dot
            active={isInRepeatCard}
            onClick={() => {
              repeatCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
          <Dot
            active={isInYearCard}
            onClick={() => {
              yearCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
          <Dot
            active={isInFinalCard}
            onClick={() => {
              finalCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
        </Dots>

        {!isInFinalCard && (
          <Button
            onClick={() => {
              if (isInWelcomeCard) {
                weekCardRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              } else if (isInWeekCard) {
                repeatCardRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              } else if (isInRepeatCard) {
                yearCardRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              } else if (isInYearCard) {
                finalCardRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            }}
          >
            NEXT
          </Button>
        )}
      </BottomRow>
    </IonPage>
  );
};

export default Onboarding;

const ScrollContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  height: 100%;
  width: 100vw;
  /* border-radius: 12px; */
  scroll-snap-type: x mandatory;
  display: grid;
  grid-template-areas: 'welcome week repeat year final';
  grid-template-columns: 100vw 100vw;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomRow = styled.div`
  width: 92vw;
  height: 10%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 3vh;
  max-width: 700px;
  margin: auto;
  align-self: center;
  align-items: center;
`;

const Button = styled.div`
  right: 0;
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
`;

const Dots = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Dot = styled.div`
  border-radius: 50%;
  background: ${({ active }) => (active ? '#00a8ff' : '#d5d5d5')};
  height: ${({ active }) => (active ? 20 : 14)}px;
  width: ${({ active }) => (active ? 20 : 14)}px;
  margin: ${({ active }) => (active ? '0px 5px' : '0px 7px')};
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    background: #00a8ff;
  }
`;
