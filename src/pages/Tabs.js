import React, { useContext } from 'react';
import styled from 'styled-components';

import { IonPage, IonContent, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { bookmark, calendar, calendarOutline, map, mapOutline, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Feed from "./Feed";
import Week from "./Week";






const Tabs = () => {
  return (
    <IonPage>

      <IonContent>
        <IonTabs className="ion-tabs">

          <IonRouterOutlet>
            <Route exact path="/tabs/week" component={Week} />
            <Route exact path="/tabs/plan" component={Feed} />
            <Route exact path="/tabs/profile" component={Feed} />
            <Route exact path="/tabs" render={() => <Redirect to="/tabs/week" />}  />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tabs/week"  >
                <IonIcon icon={calendar} />
                <IonLabel>Week</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tabs/plan"  >
                <IonIcon icon={map} />
                <IonLabel>Plan</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab3" href="/tabs/profile"  >
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
