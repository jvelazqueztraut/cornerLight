import React, { useState } from 'react';
import { IonModal, IonButton, IonToolbar, IonTitle, IonButtons, IonList, IonItem } from '@ionic/react';
import './DeviceSearchModal.css';

interface DeviceSearchModalProps {
    showModal: boolean;
    setShowModal(showModal: boolean): any;
}

interface BLEDevice {
    name: string;
    id: string;
    rssi: string;
}

const DeviceSearchModal: React.FC<DeviceSearchModalProps> = ({showModal, setShowModal}) => {
    const devices: BLEDevice[] = [{name:"Device", id:"XXX", rssi:"xx"},{name:"Device", id:"XXX", rssi:"xx"}];

    const deviceScan = () => {

    }

    return (
        <IonModal isOpen={showModal} cssClass='device-search-modal' onDidPresent={deviceScan}>
            <IonToolbar>
                <IonTitle>
                    Looking for new devices...
                </IonTitle>
                <IonButtons slot="primary">
                    <IonButton onClick={() => setShowModal(false)}>
                    Cancel
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                {devices.map(d => 
                    <IonItem>
                        <p>{d.name || 'Unnamed'}</p>
                        <p>{d.id}</p>
                        <p> RSSI: {d.rssi}</p>
                    </IonItem>
                )}
            </IonList>
        </IonModal>
    );
};
  
export default DeviceSearchModal;