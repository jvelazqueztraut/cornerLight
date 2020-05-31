import React, { useState } from 'react';
import { Config, getConfig } from '../data/sequences';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonTitle
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './ConfigView.css';

interface ConfigProps extends RouteComponentProps<{ seqId: string; configId: string;}> { }

const ConfigView: React.FC<ConfigProps> = ({ match }) => {

  const [config, setConfig] = useState<Config>();

  useIonViewWillEnter(() => {
    const d = getConfig(parseInt(match.params.seqId, 10),parseInt(match.params.configId, 10));
    setConfig(d);
  });

  return (
    <IonPage id="config-view-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/configs"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {config ? (
          <>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                ID
                <span className="id">
                  <IonNote>{"#"+config.id}</IonNote>
                </span>
              </IonLabel>
            </IonItem>
          </>
        ) : <div>Config not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default ConfigView;
