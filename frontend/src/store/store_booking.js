import { create } from 'zustand';

const useBookingStore = create((set) => ({
  bookingDetails: null,
  paymentId: null,
  setBookingDetails: (details) => set({ bookingDetails: details }),
  setPaymentId: (id) => set({ paymentId: id }),
  clearBookingDetails: () => set({ bookingDetails: null }),
}));

export default useBookingStore;