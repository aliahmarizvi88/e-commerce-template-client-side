import axios from 'axios';

import { defineStore } from 'pinia';

const URL = import.meta.env.VITE_LOCAL_API_URL;

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    errors: null,
    loading: false,
  }),

  actions: {
    async fetchOrders() {
      this.loading = true;
      this.errors = null;

      try {
        const responsive = await axios.get(`${URL}/orders`);
        this.orders = responsive.data;
      } catch (err) {
        this.errors = err.message;
      } finally {
        this.loading = false;
      }
    },

    async orderDetails(id) {
      this.loading = true;
      this.errors = null;

      try {
        const responsive = await axios.get(`${URL}/orders/${id}`);
      } catch (error) {}
    },
  },
});
