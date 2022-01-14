import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
  useIonRouter,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { COLORS } from '../styles/theme';
import { authentication } from '../firebase';
import Context from './context/ContextComponent';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Tabs from './screens/Tabs';
import useLocalStorage, { getLocalStorage } from './hooks/useLocalStorage';

const gapi = window.gapi;

// const new_token = getLocalStorage("access_token");

// console.log("NEW_TOKEN: ", new_token);

// if (new_token) {
//   gapi?.auth?.setToken(new_token);
// }

console.log('app.js');

const App = () => {
  const [token] = useLocalStorage('access_token');

  
  useEffect(() => {


    console.log('token: ', token);
    alert("App.js")

    
    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      await gapi.client.load('calendar', 'v3');

      console.log("loaded");
      
      // if (token) {
      //   console.log("set token ", token);
      //   gapi.auth.setToken(token);
      // }
    });
  }, [gapi]);

  const router = useIonRouter();
  const [initialRoute, setInitialRoute] = useState(undefined);

  useEffect(() => {
    authentication.onAuthStateChanged(res => {
      if (res == null) {
        setInitialRoute('Onboarding');
        router.push('/signin', 'forward', 'replace');
      } else {
        setInitialRoute('Weeks');
      }
    });
  }, []);

  if (initialRoute === undefined) {
    return (
      <div
        style={{
          background: COLORS.bg,
          height: '90%',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          paddingBottom: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IonSpinner />
      </div>
    );
  } else {
    return (
      <Context>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <IonRouterOutlet id="main">
                <Route path="/tabs" render={() => <Tabs />} />
                <Route path="/signin" render={() => <SignIn />} />
                <Route path="/signup" render={() => <SignUp />} />
                <Route path="/onboarding" render={() => <Onboarding />} />
                <Route
                  exact
                  path="/"
                  render={() =>
                    initialRoute == 'Onboarding' ? (
                      <Redirect to="/onboarding" />
                    ) : (
                      <Redirect to="/tabs/week" />
                    )
                  }
                />
              </IonRouterOutlet>
            </IonSplitPane>
            {initialRoute == 'Onboarding' && <Redirect to="/onboarding" />}
          </IonReactRouter>
        </IonApp>
      </Context>
    );
  }
};

export default App;
