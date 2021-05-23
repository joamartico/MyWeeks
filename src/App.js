import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Context from './Context';

import PeriodicTable from './pages/PeriodicTable.js';

const App = () => {
  return (
    <Context>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <Route exact path="/" render={PeriodicTable} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
