<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/AuthStore';
import { useRouter } from 'vue-router';

import { showToast } from '../../utils/Toast';

const router = useRouter();
const authStore = useAuthStore();

const credentials = ref({
  email: '',
  password: '',
});

const errorMessage = ref(null);

const handleLogin = async () => {
  errorMessage.value = null;

  try {
    await authStore.adminUser(credentials.value);
    showToast(`Logged in as ${credentials.value.email}`, 'success');
    router.push('/admin');
  } catch (error) {
    errorMessage.value = authStore.errors;
    showToast(`Login Failed: ${errorMessage.value}!`, 'error');
  }
};
</script>

<template>
  <form
    class="flex flex-col justify-center items-center gap-12"
    @submit.prevent="handleLogin"
  >
    <h1 class="text-2xl font-bold uppercase">Admin Login</h1>

    <div class="mt-8">
      <input
        type="email"
        placeholder="Email Address"
        v-model="credentials.email"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-8">
      <input
        type="password"
        placeholder="Password"
        v-model="credentials.password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <button
      type="submit"
      class="bg-black w-60 text-white rounded-2xl py-2 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
    >
      {{ authStore.loading ? 'LOGING IN...' : 'LOGIN' }}
    </button>
  </form>
</template>
