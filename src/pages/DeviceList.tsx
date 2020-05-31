import DeviceListItem from '../components/DeviceListItem';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Device, getDevices } from '../data/devices';
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
import './DeviceList.css';

const DeviceList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [devices, setDevices] = useState<Device[]>([]);

  useIonViewWillEnter(() => {
    const dvcs = getDevices();
    setDevices(dvcs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="device-list">
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
              Devices
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {devices.map(d => <DeviceListItem key={d.id} device={d} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DeviceList;
