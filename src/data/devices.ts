export interface Device {
  sequenceName: string;
  sequenceId: number;
  online: boolean;
  name: string;
  address: string;
}

const devices: Device[] = [
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: true,
    name: 'Device 0',
    address: 'XXXX'
  },
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: false,
    name: 'Device 1',
    address: 'YYYY'
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
    address: address
  });
};

export const getDevices = () => devices;

export const getDevice = (address: string) => devices.find(d => d.address === address);
