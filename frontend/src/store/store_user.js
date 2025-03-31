// store_user.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set) => ({
            email: null,
            userType: null, // 'User' or 'Admin'
            setEmail: (email) => set({ email }),
            setUserType: (userType) => set({ userType }), // New action
            clearUser: () => set({ email: null, userType: null }), // Clear both email and userType
        }),
        {
            name: 'user-store',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;