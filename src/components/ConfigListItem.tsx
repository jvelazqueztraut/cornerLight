import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon
  } from '@ionic/react';
import { Sequence, Config } from '../data/sequences';
import './ConfigListItem.css';
import { chevronForward, barcodeOutline, timeOutline } from 'ionicons/icons';

interface ConfigListItemProps {
  sequence: Sequence;
  config: Config;
}

const ConfigListItem: React.FC<ConfigListItemProps> = ({ sequence, config }) => {

  return (
    <IonItem routerLink={`/sequence/${sequence.id}/${config.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        {config.pattern}
        <span className="id">
          <IonNote>{`#${config.id}`}</IonNote>
        </span>
      </IonLabel>
      <IonIcon icon={chevronForward}/>
    </IonItem>
  );
};

export default ConfigListItem;
