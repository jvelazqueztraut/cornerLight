export interface Device {
  sequenceName: string;
  sequenceId: number;
  online: boolean;
  ip: string;
  name: string;
  id: number;
}

const devices: Device[] = [
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: true,
    ip: '127.0.0.1',
    name: 'Device 0',
    id: 0
  },
  {
    sequenceName: 'Sequence 0',
    sequenceId: 0,
    online: false,
    ip: '127.0.0.1',
    name: 'Device 1',
    id: 1
  }
];

export const getDevices = () => devices;

export const getDevice = (id: number) => devices.find(d => d.id === id);
