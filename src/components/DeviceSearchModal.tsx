import React, { useState } from 'react';
import { IonModal, IonButton, IonToolbar, IonTitle, IonButtons, IonList, IonItem } from '@ionic/react';
import './DeviceSearchModal.css';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

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
    const [devices, setDevices] = useState<BLEDevice[]>([]);

    const deviceScan = () => {
        console.log(devices)
        setDevices([])
        if( !BluetoothLE.isInitialized() ) return;
        
        BluetoothLE.startScan({isConnectable: true}).subscribe( status => {
            console.log(status);
            if(status.status == 'scanResult')
                setDevices(devices.concat({name: status.name, id: status.address, rssi: status.rssi.toString()}))
        });
        
        setTimeout(() => {
            BluetoothLE.stopScan()
            console.log('Stopping BLE scan')
            console.log(devices)
        }, 3000)
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