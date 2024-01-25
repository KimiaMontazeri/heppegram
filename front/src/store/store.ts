import { create } from 'zustand';

interface IBears {
  bears: number;
}

// TODO: this is just a meaningless template!
export const useStore = create<IBears>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
