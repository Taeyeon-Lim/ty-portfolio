'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  astronautAnimation: 'wave' | 'floating';
  animateState: 'idle' | 'progress' | 'end';
  isControlCamera: boolean;
};

type Actions = {
  updateAstronautAnimation: (
    animationName: State['astronautAnimation']
  ) => void;
  updateAnimateState: (
    animateState: State['animateState'],
    isMoveCamera: State['isControlCamera']
  ) => void;
};

const useAnimateState = create<State & Actions>()(
  immer(set => ({
    astronautAnimation: 'wave',
    animateState: 'idle',
    isControlCamera: true,
    updateAstronautAnimation: animationName =>
      set(() => ({ astronautAnimation: animationName })),
    updateAnimateState: (animateState, isMoveCamera) =>
      set(() => ({ animateState, isMoveCamera })),
  }))
);

export default useAnimateState;
