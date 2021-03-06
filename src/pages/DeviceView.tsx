import React, { useState } from 'react';
import { Device, getDevice } from '../data/devices';
import { Sequence, getSequences, getSequence } from '../data/sequences';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonTitle,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './DeviceView.css';

interface DeviceProps extends RouteComponentProps<{ address: string; }> { }

const DeviceView: React.FC<DeviceProps> = ({ match }) => {

  const [device, setDevice] = useState<Device>();
  const [sequences, setSequences] = useState<Sequence[]>([]);

  useIonViewWillEnter(() => {
    const d = getDevice(match.params.address);
    setDevice(d);

    const seqs = getSequences();
    setSequences(seqs);
  });

  return (
    <IonPage id="device-view-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/devices"></IonBackButton>
          </IonButtons>
          <IonTitle>{device ? device.name : 'Unnamed'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {device ? (
          <>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                ID
                <span className="address">
                  <IonNote>{"#"+device.address.slice(-4)}</IonNote>
                </span>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                {device.address}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Sequence</IonLabel>
              <IonSelect value={device.sequenceId} placeholder="Select a sequence">
                {sequences.map(s => <IonSelectOption value={s.id}>{s.name}</IonSelectOption>)}
              </IonSelect>
            </IonItem>
          </>
        ) : <div>Device not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default DeviceView;
