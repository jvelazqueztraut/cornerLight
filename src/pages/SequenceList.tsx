import SequenceListItem from '../components/SequenceListItem';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Sequence, getSequences } from '../data/sequences';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  useIonViewWillEnter
} from '@ionic/react';
import './SequenceList.css';

const SequenceList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [sequences, setSequences] = useState<Sequence[]>([]);

  useIonViewWillEnter(() => {
    const dvcs = getSequences();
    setSequences(dvcs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="sequence-list">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Sequences
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {sequences.map(d => <SequenceListItem key={d.id} sequence={d} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SequenceList;
