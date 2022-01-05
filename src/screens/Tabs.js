import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  IonPage,
  IonContent,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import { calendar, calendarOutline, map, mapOutline, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Week from './Week';
import Profile from './Profile';
import Plan from './Plan';
import { Context } from '../context/ContextComponent';
import { COLORS } from '../../styles/theme';
const themeColor = document.querySelector('meta[name="theme-color"]');

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }];
  return { paths, fallback: true };
};

const Tabs = () => {
  const router = useIonRouter();

  useEffect(() => {
    if (
      router?.routeInfo?.pathname === '/tabs/week' ||
      router?.routeInfo?.pathname === '/tabs/plan'
    ) {
      themeColor.setAttribute('content', COLORS.blur);
    } else {
      themeColor.setAttribute('content', COLORS.bg);
    }
    console.log('ROUTE: ', router.routeInfo);
  }, [router.routeInfo?.pathname]);

  return (
    <IonPage>
      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/week" component={Week} />
            <Route exact path="/tabs/plan" component={Plan} />
            <Route exact path="/tabs/profile" component={Profile} />
            <Route exact path="/tabs" render={() => <Redirect to="/tabs/week" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs/week">
              <IonIcon icon={calendar} />
              <IonLabel>Week</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tab2" href="/tabs/plan">
              <IonIcon icon={map} />
              <IonLabel>Plan</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tab3" href="/tabs/profile">
              <IonIcon icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};

export default Tabs;
