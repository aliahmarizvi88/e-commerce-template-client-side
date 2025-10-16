import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    errors: null,
    loading: false,
  }),

  actions: {
    async fetchProduct() {
      this.loading = true;
      this.errors = null;

      try {
        const response = await axios.get(`${URL}/products`);
        this.products = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
