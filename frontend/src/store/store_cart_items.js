import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  clearCart: () => set({ cart: [] }),
  setCart: (newCart) => set(() => {
    localStorage.setItem('cart', JSON.stringify(newCart));  
    return { cart: newCart };
  }),
  persist: (config) => ({
    ...config,
    storage: {
        getItem: (name) => localStorage.getItem(name),
        setItem: (name, value) => localStorage.setItem(name, value),
        removeItem: (name) => localStorage.removeItem(name),
    },
}),
}));

export default useCartStore;