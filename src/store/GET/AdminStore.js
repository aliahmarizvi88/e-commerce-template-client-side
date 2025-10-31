import axios from 'axios';

import { defineStore } from 'pinia';

const URL = import.meta.env.VITE_LOCAL_API_RL;

export const useAdminDataStore = defineStore('adminData', {
  state: () => ({
    adminData: [],
    errors: null,
    loading: false,
  }),

  actions: {
    async fetchAdmin() {
      this.loading = true;
      this.errors = null;
      try {
      } catch (error) {
      } finally {
      }
    },
    async addNewAdmin(payload) {},
  },
});
