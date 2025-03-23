import { create } from 'zustand';

/**
 * Zustand store for managing booking-related state.
 *
 * @typedef {Object} BookingStore
 * @property {Object|null} bookingDetails - The details of the booking.
 * @property {string|null} paymentId - The ID of the payment.
 * @property {(details: Object) => void} setBookingDetails - Function to update booking details.
 * @property {(id: string) => void} setPaymentId - Function to update the payment ID.
 * @property {() => void} clearBookingDetails - Function to clear the booking details.
 */

/** 
 * Zustand store for managing booking details and payment ID.
 * @returns {BookingStore} The booking store state and actions.
 */
const useBookingStore = create((set) => ({
  bookingDetails: null,
  paymentId: null,
  
  /**
   * Sets the booking details.
   * @param {Object} details - The booking details to be stored.
   */
  setBookingDetails: (details) => set({ bookingDetails: details }),

  /**
   * Sets the payment ID.
   * @param {string} id - The payment ID to be stored.
   */
  setPaymentId: (id) => set({ paymentId: id }),

  /**
   * Clears the booking details.
   */
  clearBookingDetails: () => set({ bookingDetails: null }),
}));

export default useBookingStore;
