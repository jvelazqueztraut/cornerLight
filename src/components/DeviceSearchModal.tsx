import React, { useState } from 'react';
import { IonModal, IonButton, IonToolbar, IonTitle, IonButtons, IonList, IonItem, IonAlert, IonHeader, IonContent } from '@ionic/react';
import './DeviceSearchModal.css';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

interface DeviceSearchModalProps {
    showModal: boolean;
    setShowModal(showModal: boolean): any;
    newDevice(address: string, name: string): any;
}

interface BLEDevice {
    name: string;
    address: string;
    rssi: string;
}

const DeviceSearchModal: React.FC<DeviceSearchModalProps> = ({showModal, setShowModal, newDevice}) => {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState(false);
    const [devices, setDevices] = useState<BLEDevice[]>([]);

    const deviceScan = () => {
        setDevices([])
        if( !BluetoothLE.isInitialized() ){
            setError(true)
            return;
        }
        
        BluetoothLE.startScan({isConnectable: true}).subscribe( status => {
            if(status.status == 'scanStarted')
                setScanning(true)
            if(status.status == 'scanResult')
                setDevices(prevDevices => [...prevDevices, {name: status.name, address: status.address, rssi: status.rssi.toString()}])
        });

        setTimeout(() => {
            BluetoothLE.stopScan()
            setScanning(false)
        }, 3000)
    }

    const deviceSelected = (device:BLEDevice) => {
        newDevice(device.address, device.name)
        setShowModal(false)
    }

    return (
        <IonModal isOpen={showModal} cssClass='device-search-modal' onDidPresent={deviceScan}>
            <IonAlert message={'Bluetooth Error'} isOpen={error}/>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {scanning 
                            ? 'Scanning...' 
                            : 'Available devices' 
                        }
                    </IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={() => setShowModal(false)}>
                        Cancel
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {devices.map(d => 
                        <IonItem key={d.address} onClick={() => deviceSelected(d)}>
                            <p>{d.name || 'Unnamed'}</p>
                            <p>{d.address}</p>
                            <p> RSSI: {d.rssi}</p>
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonModal>
    );
};
  
export default DeviceSearchModal;