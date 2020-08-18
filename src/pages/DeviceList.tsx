import DeviceListItem from '../components/DeviceListItem';
import DeviceSearchModal from '../components/DeviceSearchModal';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Device, getDevices, addDevice } from '../data/devices';
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
  useIonViewWillEnter,
  IonButton,
  IonIcon
} from '@ionic/react';
import './DeviceList.css';
import { add } from 'ionicons/icons';

const DeviceList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [devices, setDevices] = useState<Device[]>([]);

  const [showModal, setShowModal] = useState(false);

  useIonViewWillEnter(() => {
    const dvcs = getDevices();
    setDevices(dvcs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const newDevice = (address: string, name: string) => {
    addDevice(address, name);
    const dvcs = getDevices();
    setDevices(dvcs);
    console.log('dvcs',dvcs);
    console.log('devices',devices);
  }

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
            <IonButtons slot="primary">
              <IonButton fill="solid" color="secondary" onClick={() => setShowModal(true)}>
                <IonIcon icon={add} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {devices.map(d => <DeviceListItem key={d.address} device={d} />)}
        </IonList>

        <DeviceSearchModal showModal={showModal} setShowModal={setShowModal} newDevice={newDevice}/>

      </IonContent>
    </IonPage>
  );
};

export default DeviceList;
