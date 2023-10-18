import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  playNext: (id: string) => void;
  addToQueue: (id: string) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  playNext: (id: string) => set((state) => {
    // Find the index of the active song
    const activeIndex = state.activeId ? state.ids.indexOf(state.activeId) : -1;

    // If there's no active song, insert at the beginning. Else, insert right after the active song
    const newIds = [...state.ids];
    newIds.splice(activeIndex + 1, 0, id);

    return { ids: newIds };
  }),
  addToQueue: (id: string) => set((state) => ({ ids: [...state.ids, id] })),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;