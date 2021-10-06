import { IonApp, IonRouterOutlet, IonSplitPane, useIonRouter } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authentication } from '../firebase';
import Context from './context/ContextComponent';
import SignIn from './pages/SignIn';
import Tabs from './pages/Tabs';

const App = () => {
  const router = useIonRouter()
  const [initialRoute, setInitialRoute] = useState(undefined);

  useEffect(() => {
    authentication.onAuthStateChanged(res => {
      if (res == null) {
        setInitialRoute('Onboarding');
        router.push("/signin", "forward", "replace")
        console.log('NULLlllllllllllllllllLLLLLLLlllllllLLLLlllllll');

      } else {
        setInitialRoute('Weeks');
      }
      console.log(res);
    });
  }, []);

  if (initialRoute === undefined) {
    return <p>Loading...</p>;
  } else {

    

    return (
      <Context>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <IonRouterOutlet id="main">
                {/* {initialRoute == 'Onboarding' && <Redirect to="/signin" />} */}
                <Route path="/tabs" render={() => initialRoute == 'Onboarding' ? <SignIn /> : <Tabs />} />
                <Route path="/signin" render={() => <SignIn />} />
                <Route exact path="/" render={() => <Redirect to="/tabs/week" />} />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </Context>
    );
  }
};

export default App;
