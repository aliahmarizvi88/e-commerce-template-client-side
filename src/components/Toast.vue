<script setup>
import { watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' },
  position: { type: String, default: 'top-right' },
  timeout: { type: Number, default: 3000 },
  show: { type: Boolean, default: false },
});

watch(
  () => props.show,
  (val) => {
    if (val) {
      toast[props.type](props.message, {
        position: props.position,
        timeout: props.timeout,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
);
</script>

<template></template>
