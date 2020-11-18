import { atom } from 'recoil';

interface DnDContainerState {
  [key: string]: ContainerState;
}

interface ContainerState {
  contents: string;
  isEmpty: boolean;
}

const initDnDContainerState: DnDContainerState = {
  'sub-1': { contents: '', isEmpty: true },
  'sub-2': { contents: '', isEmpty: true },
  'sub-3': { contents: '', isEmpty: true },
  'vote-1': { contents: 'award-1', isEmpty: false },
  'vote-2': { contents: 'award-2', isEmpty: false },
  'vote-3': { contents: 'award-3', isEmpty: false },
};

export const DnDContainerState = atom<DnDContainerState>({
  key: 'DnDContainerState',
  default: initDnDContainerState,
});
