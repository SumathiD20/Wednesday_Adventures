// store_user.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for managing user-related state with persistence.
 *
 * @typedef {Object} UserStore
 * @property {string|null} email - The user's email address.
 * @property {(email: string) => void} setEmail - Function to update the user's email.
 * @property {() => void} clearEmail - Function to clear the stored email.
 */

/**
 * Zustand store with persistence for managing user email.
 *
 * @returns {UserStore} The user store state and actions.
 */
const useUserStore = create(
    persist(
        (set) => ({
            email: null,

            /**
             * Sets the user's email.
             * @param {string} email - The email address to be stored.
             */
            setEmail: (email) => set({ email }),

            /**
             * Clears the stored email.
             */
            clearEmail: () => set({ email: null }),
        }),
        {
            /**
             * Configuration for persisting the store.
             * @property {string} name - The key used in storage.
             * @property {() => Storage} getStorage - Function that returns the storage type (localStorage).
             */
            name: 'user-store',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;
