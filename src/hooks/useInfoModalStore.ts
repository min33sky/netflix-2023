import { create } from 'zustand';

export interface InfoModal {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<InfoModal>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ movieId, isOpen: true }),
  closeModal: () => set({ movieId: undefined, isOpen: false }),
}));

export default useInfoModalStore;
