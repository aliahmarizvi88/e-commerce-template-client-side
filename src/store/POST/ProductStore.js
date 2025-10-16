import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const usePostProductStore = defineStore('PostProductStore', {
  state: () => ({
    sucess: false,
    error: null,
    loading: false,
  }),

  actions: {
    async addProduct(productData) {
      this.loading = true;
      this.error = null;
      this.sucess = false;

      try {
        const response = await axios.post(`${URL}/products`, productData);
        this.sucess = true;
        return response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
