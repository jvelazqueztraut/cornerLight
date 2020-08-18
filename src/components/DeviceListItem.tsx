import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon
  } from '@ionic/react';
import { Device } from '../data/devices';
import './DeviceListItem.css';
import { chevronForward } from 'ionicons/icons';

interface DeviceListItemProps {
  device: Device;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({ device }) => {
  return (
    <IonItem routerLink={`/device/${device.address}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h1>
          {device.name || 'Unnamed'}
          <span className="id">
            <IonNote>{"#"+device.address.slice(-4)}</IonNote>
          </span>
        </h1>
        <h2>
          <div className={"dot "+ (device.online ? "dot-online" : "dot-offline")}></div>
          {device.sequenceName}
        </h2>
      </IonLabel>
      <IonIcon icon={chevronForward}/>
    </IonItem>
  );
};

export default DeviceListItem;
