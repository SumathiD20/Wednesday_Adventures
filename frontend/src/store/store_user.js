// store_user.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set) => ({
            email: null,
            setEmail: (email) => set({ email }),
            clearEmail: () => set({ email: null }),
        }),
        {
            name: 'user-store',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;