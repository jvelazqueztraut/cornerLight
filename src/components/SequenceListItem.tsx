import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon
  } from '@ionic/react';
import { Sequence } from '../data/sequences';
import './SequenceListItem.css';
import { chevronForward, barcodeOutline, timeOutline } from 'ionicons/icons';

interface SequenceListItemProps {
  sequence: Sequence;
}

const SequenceListItem: React.FC<SequenceListItemProps> = ({ sequence }) => {

  const totalTime = getSequenceTime(sequence);

  return (
    <IonItem routerLink={`/sequence/${sequence.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h1>
          {sequence.name}
          <span className="id">
            <IonNote>{`#${sequence.id}`}</IonNote>
          </span>
        </h1>
        <h2>
          <div className="configs">
            <IonIcon icon={barcodeOutline}/>{sequence.configs.length}
          </div>
          <div className="time">
            <IonIcon icon={timeOutline}/>{totalTime}
          </div>
        </h2>
      </IonLabel>
      <IonIcon icon={chevronForward}/>
    </IonItem>
  );
};

function getSequenceTime(sequence: Sequence){
  return sequence.configs.reduce((acc,c) => acc + c.time, 0);
}

export default SequenceListItem;
