<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/AuthStore';
import { storeToRefs } from 'pinia';

import UniDailogue from '../components/UniDailogue.vue';
import { showToast } from '../utils/Toast';
import { Trash2, LockKeyhole, LogOut, Pencil } from 'lucide-vue-next';

const authStore = useAuthStore();

const router = useRouter();

const { userProfile } = storeToRefs(authStore);

const passwordDailog = ref(false);
const updateDailog = ref(false);

const handleLogout = () => {
  authStore.logout();
  showToast('Logout Sucessful');
  router.push('/');
};

const handlePassword = () => {
  passwordDailog.value = true;
};

const handleUpdate = () => {
  updateDailog.value = true;
};
</script>
<template>
  <div class="max-w-xl mx-auto p-6 rounded-lg">
    <div v-if="userProfile">
      <h1 class="text-3xl font-bold capitalize">
        Welcome back, {{ userProfile.name.firstname }}
      </h1>
      <p class="text-gray-400 text-md mb-3">@{{ userProfile.username }}</p>
      <p class="font-semibold text-lg">{{ userProfile.email }}</p>
      <p
        class="bg-gray-200 text-black text-sm font-semibold rounded-lg px-3 py-1 mt-2 mb-2 w-30"
      >
        id: {{ userProfile.id }}
      </p>

      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col gap-5 pb-10"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold mt-3">Personal Info</h1>
          <button
            class="p-2 rounded-full hover:bg-gray-300 cursor-pointer"
            @click="handleUpdate"
          >
            <Pencil size="20" />
          </button>
        </div>
        <div>
          <p class="text-md text-gray-500">Fullname</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md capitalize">
            {{ `${userProfile.name.firstname} ${userProfile.name.lastname}` }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Phone</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md">
            {{ userProfile.phone }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Address</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md capitalize">
            {{
              `${userProfile.address?.number}, ${userProfile.address?.street}, ${userProfile.address?.city}`
            }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Zip Code</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md">
            {{ `${userProfile.address?.zipcode}` }}
          </p>
        </div>
      </div>

      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col gap-6 pb-10"
      >
        <h1 class="text-xl font-bold mt-3">Perform Action</h1>

        <button
          @click="handlePassword"
          class="text-md text-red-500 font-semibold cursor-pointer hover:bg-red-100 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
        >
          <LockKeyhole size="18" />
          Change Password
        </button>

        <button
          class="text-md text-red-500 font-semibold cursor-pointer hover:bg-red-100 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
        >
          <Trash2 size="18" />
          Delete Account
        </button>

        <button
          @click="handleLogout"
          class="text-md text-gray-700 font-semibold cursor-pointer hover:bg-gray-200 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
        >
          <LogOut size="18" />
          Logout
        </button>
      </div>
    </div>

    <div v-else class="min-h-75">
      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col justify-center items-center gap-10 pb-10"
      >
        <h3 class="text-xl font-semibold pt-5">You haven't Logged in Yet</h3>
        <button
          class="bg-black text-white rounded-2xl px-2 py-3 w-30 cursor-pointer hover:scale-115 duration-200 font-semibold"
          @click="router.push('/auth/login')"
        >
          Log In
        </button>
      </div>
    </div>
  </div>

  <UniDailogue
    v-model="passwordDailog"
    title="Change Password"
    width="420px"
    @confirm=""
    @cancel="passwordDailog = false"
  >
    <div class="flex flex-col gap-5">
      <input
        type="password"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        placeholder="Old Password"
      />
      <input
        type="password"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        placeholder="New Password"
      />
      <input
        type="password"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        placeholder="New Confrim Password"
      />
    </div>
  </UniDailogue>

  <UniDailogue
    v-model="updateDailog"
    title="Update Data"
    width="420px"
    @confirm=""
    @cancel="updateDailog = false"
  ></UniDailogue>
</template>
