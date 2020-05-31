import React from 'react';
import Menu from './components/Menu';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import DeviceList from './pages/DeviceList';
import DeviceView from './pages/DeviceView';
import SequenceList from './pages/SequenceList';
import SequenceView from './pages/SequenceView';
import ConfigView from './pages/ConfigView';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/devices" component={DeviceList} exact={true} />
          <Route path="/device/:id" component={DeviceView} exact={true} />
          <Route path="/sequences" component={SequenceList} exact={true} />
          <Route path="/sequence/:id" component={SequenceView} exact={true} />
          <Route path="/sequence/:seqId/:configId" component={ConfigView} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/devices" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
