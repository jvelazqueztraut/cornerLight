export interface Device {
  sequenceName: string;
  sequenceId: number;
  online: boolean;
  name: string;
  address: string;
  id: number;
}

const devices: Device[] = [
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: true,
    name: 'Device 0',
    address: 'XXXX',
    id: 0
  },
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: false,
    name: 'Device 1',
    address: 'YYYY',
    id: 1
  }
];

export const addDevice = (address: string, name: string) => {
  if(devices.find((d => d.address == address)))
    return;
  devices.push({
    sequenceName: 'none',
    sequenceId: 0,
    online: true,
    name: name,
    address: address,
    id: devices.length
  });
};

export const getDevices = () => devices;

export const getDevice = (id: number) => devices.find(d => d.id === id);
