<script setup>
import Uni_table from '../../components/Admin/Uni_table.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/AuthStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();

const { userProfile } = storeToRefs(authStore);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administrator Manager</h1>

    <div v-if="authStore.error" class="text-red-500">
      {{ authStore.error }}
    </div>
    <div v-else>
      <h1 class="text-xl font-bold capitalize">{{}}</h1>
      <button
        @click="
          authStore.logout();
          router.push('/auth/adminLogin');
        "
        class="bg-black w-60 text-white rounded-2xl py-2 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
      >
        Logout
      </button>
    </div>
  </div>
</template>
