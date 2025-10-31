import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_API_URL;

const loadProfile = () => {
  try {
    return JSON.parse(sessionStorage.getItem('userProfile')) || null;
  } catch (error) {
    sessionStorage.removeItem('userProfile');
    return null;
  }
};

const generateUsername = (credentials) => {
  const namePart = credentials.firstname + credentials.lastname;
  const length = namePart.length;

  return `${namePart.toLowerCase()}${length}`;
};

//Template how data, is Stored in for new User:
const createNewUser = (credentials) => ({
  email: credentials.email,
  username: generateUsername(credentials),
  password: credentials.password,

  name: {
    firstname: credentials.firstname,
    lastname: credentials.lastname,
  },
  phone: 'yet needed to add',

  address: {
    geolocation: {
      lat: '0',
      long: '0',
    },
    city: 'yet needed to add',
    street: 'yet needed to add',
    number: 0,
    zipcode: 'yet needed to add',
  },

  __v: 0,
});

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
        email: foundUser.email,
        username: foundUser.username,
        name: foundUser.name,
        phone: foundUser.phone,
        address: foundUser.address,
        id: foundUser.id,
      };

      sessionStorage.setItem('userProfile', JSON.stringify(profileData));
      this.userProfile = profileData;
    },

    async registerUser(credentials) {
      this.loading = true;
      this.error = null;

      try {
        //Check email Already Exists
        const checkEmail = await axios.get(
          `${URL}/users?email=${credentials.email}`
        );
        if (checkEmail.data.length > 0) {
          throw new Error('Email is already registered');
        }

        const newUser = createNewUser(credentials);

        const response = await axios.post(`${URL}/users`, newUser);

        if (response.data && response.status === 201) {
          this._handleSuccessfulLogin(response.data, 'user');
          return response.data;
        } else {
          throw new Error('Server failed to create user record.');
        }
      } catch (err) {
        this.error = err.message || 'Registration failed.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    //Admin Login
    async adminUser(credentials) {
      this.error = null;
      this.loading = false;

      try {
        const response = await axios.get(
          `${URL}/admin?email=${credentials.email}&password=${credentials.password}`
        );

        if (response.data.length === 1) {
          const foundAdmin = response.data[0];
          this._handleSuccessfulLogin(foundAdmin, 'admin');
          return foundAdmin;
        } else {
          throw new Error('Invaild admin credentails');
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
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

    //Update User
    async updateUserDetails(updatedPayload) {
      this.loading = true;
      this.error = null;

      if (!this.isAuthenticated) {
        this.error = 'Authentication required to update profile.';
        this.loading = false;
        throw new Error(this.error);
      }

      const userId = this.userProfile.id;

      let fullCurrentUser;
      try {
        const fetchResponse = await axios.get(`${URL}/users/${userId}`);
        fullCurrentUser = fetchResponse.data;
      } catch (fetchError) {
        this.error = 'Could not fetch current user data for update.';
        this.loading = false;
        throw fetchError;
      }

      const finalUpdateObject = {
        id: fullCurrentUser.id,
        email: fullCurrentUser.email,
        password: fullCurrentUser.password,

        username: updatedPayload.username,
        name: updatedPayload.name,
        phone: updatedPayload.phone,
        address: updatedPayload.address,

        __v: fullCurrentUser.__v || 0,
      };

      try {
        const response = await axios.put(
          `${URL}/users/${userId}`,
          finalUpdateObject
        );

        if (response.data) {
          this._handleSuccessfulLogin(response.data, this.userType);
        }
      } catch (err) {
        this.error = err.message || 'Failed to update user details on server.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    //Change Password
    async ChangeUserPassword({ oldPassword, newPassword, newConfirmPassword }) {
      this.loading = true;
      this.error = null;

      if (newPassword !== newConfirmPassword) {
        this.error = 'New password do not match.';
        this.loading = false;
        throw new Error(this.error);
      }

      const userId = this.userProfile.id;

      try {
        const userResponse = await axios.get(`${URL}/users/${userId}`);
        const currentUser = userResponse.data;

        if (currentUser.password !== oldPassword) {
          throw new Error('Incorrect Old Password');
        }

        const newPasswordPayload = {
          password: newPassword,
        };

        await axios.patch(`${URL}/users/${userId}`, newPasswordPayload);
      } catch (err) {
        this.error = err.message || 'Failed to update password.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteAccount() {
      this.loading = true;
      this.error = null;

      const userId = this.userProfile.id;

      try {
        await axios.delete(`${URL}/users/${userId}`);
        this.logout();
      } catch (err) {
        this.error = err.message;
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
