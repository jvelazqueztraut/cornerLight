import ConfigListItem from '../components/ConfigListItem';
import React, { useState } from 'react';
import { Sequence, getSequence } from '../data/sequences';
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
import './SequenceView.css';

interface SequenceProps extends RouteComponentProps<{ id: string; }> { }

const SequenceView: React.FC<SequenceProps> = ({ match }) => {

  const [sequence, setSequence] = useState<Sequence>();

  useIonViewWillEnter(() => {
    const d = getSequence(parseInt(match.params.id, 10));
    setSequence(d);
  });

  return (
    <IonPage id="sequence-view-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/sequences"></IonBackButton>
          </IonButtons>
          <IonTitle>{sequence ? sequence.name : ''}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {sequence ? (
          <>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                ID
                <span className="id">
                  <IonNote>{"#"+sequence.id}</IonNote>
                </span>
              </IonLabel>
            </IonItem>
            <IonList>
              {sequence.configs.map(c => <ConfigListItem key={c.id} sequence={sequence} config={c} />)}
            </IonList>
          </>
        ) : <div>Sequence not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default SequenceView;
