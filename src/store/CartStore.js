import { defineStore } from 'pinia';

export const useCartStore = defineStore('Cart', {
  state: () => ({
    cart: [],
  }),

  actions: {
    addToCart(product) {
      if (!product || !product.id) {
        return;
      }

      const exists = this.cart.find((item) => item.id === product.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    decreaseItems(id) {
      const item = this.cart.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) item.quantity--;
        else {
          this.removeFromCart(id);
        }
      }
    },
    clearCart() {
      this.cart = [];
    },
    async checkOut() {},
  },
  getters: {
    totalItems: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
});
