import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import  Context  from "./context/ContextComponent";
import SignIn from "./pages/SignIn";
import Tabs from "./pages/Tabs";




const App = () => {
  return (
    <Context>
      <IonApp>
        <IonReactRouter>
        <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
                <Route path="/tabs" render={() => <Tabs />} />
                <Route path="/signin" render={() => <SignIn />} />
                <Route exact path="/" render={() => <Redirect to="/tabs/week" />} />
            </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;