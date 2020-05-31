export interface Config {
  pattern: string;
  time: number;
  id: number;
}

export interface Sequence {
  name: string;
  configs: Config[];
  id: number;
}

const sequences: Sequence[] = [
  {
    name: 'Sequence 0',
    configs: [
      {
        pattern: 'Pattern 0',
        time: 1.5,
        id: 0
      }
    ],
    id: 0
  },
  {
    name: 'Sequence 1',
    configs: [
      {
        pattern: 'Pattern 0',
        time: 1,
        id: 1
      },
      {
        pattern: 'Pattern 1',
        time: 2,
        id: 2
      }
    ],
    id: 1
  },
  {
    name: 'Sequence 2',
    configs: [
      {
        pattern: 'Pattern 0',
        time: 1,
        id: 3
      }
    ],
    id: 2

  }
];

export const getSequences = () => sequences;

export const getSequence = (id: number) => sequences.find(s => s.id === id);

export const getConfig = (sequenceId: number, configId: number) => sequences.find(s => s.id === sequenceId)?.configs.find(c => c.id === configId);
