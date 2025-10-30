<script setup>
import { onMounted } from 'vue';
import Uni_table from '../../components/Admin/Uni_table.vue';

import { useOrderStore } from '../../store/OrderStore';

const orderStore = useOrderStore();

const columns = [
  { key: 'id', label: 'Order Id' },
  { key: 'email', label: 'Email' },
  { key: 'totalitem', label: 'Quantity' },
  { key: 'totalprice', label: 'TotalPrice' },
  { key: 'status', label: 'Status' },
];

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Order Management</h1>

    <div v-if="orderStore.error" class="text-red-500">
      {{ userStore.error }}
    </div>

    <div class="">
      <uni_table :columns="columns" :rows="orderStore.orders">
        <template #totalprice="{ value }">
          <span class="text-green-600 font-semibold"
            >${{ value.toFixed(2) }}</span
          >
        </template>
        <template #status="{ value }">
          <button
            v-if="value === 'Processing'"
            class="px-2 py-1 rounded-2xl bg-green-200 text-green-600 cursor-pointer font-semibold"
          >
            {{ value }}
          </button>
        </template>
      </uni_table>
    </div>
  </div>
</template>
