import { create } from 'zustand';

/**
 * Zustand store for managing the shopping cart state.
 * 
 * This store allows for adding items to the cart, removing items, clearing the cart,
 * and persisting the cart data in localStorage.
 */

const useCartStore = create((set) => ({
   /**
   * The current cart state, an array of products with their quantities.
   * 
   * @type {Array<{id: string, name: string, price: number, quantity: number}>}
   */
  cart: [],
    /**
   * Adds a product to the cart. If the product is already in the cart, increments its quantity.
   * 
   * @param {Object} product - The product to add to the cart.
   * @param {string} product.id - The unique identifier of the product.
   * @param {string} product.name - The name of the product.
   * @param {number} product.price - The price of the product.
   */
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
    /**
   * Removes a product from the cart by its ID.
   * 
   * @param {string} productId - The ID of the product to remove from the cart.
   */
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
   /**
   * Clears the entire cart.
   */
  clearCart: () => set({ cart: [] }),
    /**
   * Sets the cart state with a new cart and saves it to localStorage.
   * 
   * @param {Array} newCart - The new cart to set.
   * @param {string} newCart.id - The unique identifier of each product in the cart.
   * @param {string} newCart.name - The name of the product.
   * @param {number} newCart.price - The price of the product.
   * @param {number} newCart.quantity - The quantity of the product in the cart.
   */
  setCart: (newCart) => set(() => {
    localStorage.setItem('cart', JSON.stringify(newCart));  
    return { cart: newCart };
  }),

    /**
   * Custom persistence configuration for storing and retrieving cart data in localStorage.
   * 
   * @param {Object} config - The configuration for Zustand's persistence middleware.
   * @returns {Object} The updated persistence configuration.
   */
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