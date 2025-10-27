import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_API_URL;

const loadProfile = () => {
  try {
    return JSON.parse(sessionStorage.getItem('user')) || null;
  } catch (error) {
    sessionStorage.removeItem('userProfile');
    return null;
  }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userProfile: loadProfile(),

    token: sessionStorage.getItem('token') || null,
    userType: sessionStorage.getItem('userType') || null,

    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userType === 'admin',
  },

  actions: {
    _handleSuccessfulLogin(foundUser, type) {
      const mockToken = `fake-jwt-${foundUser.id}-${type}-${Date.now()}`;
      sessionStorage.setItem('token', mockToken);
      this.token = mockToken;

      sessionStorage.setItem('userType', type);
      this.userType = type;

      const profileData = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        name: foundUser.name,
        phone: foundUser.phone,

        address: foundUser.address,
      };

      sessionStorage.setItem('userProfile', JSON.stringify(profileData));
      this.userProfile = profileData;
    },

    async UserLogin(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `${URL}/users?email=${credentials.email}&password=${credentials.password}`
        );

        if (response.data.length > 0) {
          this._handleSuccessfulLogin(response.data[0], 'user');
        } else {
          throw new Error('Invalid user credentials.');
        }
      } catch (err) {
        this.error = err.message || 'User login failed.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userType');
      sessionStorage.removeItem('userProfile');

      this.token = null;
      this.userType = null;
      this.userProfile = null;
    },
  },
});
