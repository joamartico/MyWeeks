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

const App = () => {


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
