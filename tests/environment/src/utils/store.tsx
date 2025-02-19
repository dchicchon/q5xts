import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialCode } from '../initialCode';

type Store = {
  code: string;
  red: number;
  green: number;
  blue: number;
  setCode: (code: string) => void;
  setRed: (colorVal: number) => void;
  setGreen: (colorVal: number) => void;
  setBlue: (colorVal: number) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      code: initialCode,
      red: 0,
      green: 100,
      blue: 100,
      setCode: (code: string) => set({ code }),
      setRed: (colorVal: number) => set({ red: colorVal }),
      setGreen: (colorVal: number) => set({ green: colorVal }),
      setBlue: (colorVal: number) => set({ blue: colorVal }),
    }),
    {
      name: 'q5xts-storage',
    }
  )
);

// export const useStore = create((set) => ({}));
