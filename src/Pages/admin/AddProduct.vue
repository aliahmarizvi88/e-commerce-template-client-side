<script setup>
import { ref, watch, watchEffect, onMounted } from 'vue';

import { usePostProductStore } from '../../store/POST/ProductStore';
import { useCategoryStore } from '../../store/GET/CategoryStore';

const postProductStore = usePostProductStore();
const CategoryStore = useCategoryStore();

onMounted(() => {
  CategoryStore.fetchCategory();
});

const formData = ref({
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
});

const validationErrors = ref({});
const productPreview = ref('');
const message = ref('');

// watch(
//   () => formData.value.title,
//   (newTitle) => {
//     if (newTitle.trim().length < 3) {
//       validationErrors.value.title = 'Title must be at least 3 character long';
//     } else if (newTitle.trim().length === 0) {
//       validationErrors.value.title = 'Please enter a value';
//     } else {
//       delete validationErrors.value.title;
//     }
//   }
// );

// watch(
//   () => formData.value.price,
//   (newPrice) => {
//     if (isNaN(newPrice) || newPrice < 0) {
//       validationErrors.value.price = 'Price must be valid positive number';
//     } else {
//       delete validationErrors.value.price;
//     }
//   }
// );

// watch(
//   () => formData.value.description,
//   (newDescription) => {
//     if (newDescription.length === 0) {
//       validationErrors.value.description = 'Must have some description';
//     } else {
//       delete validationErrors.value.description;
//     }
//   }
// );

// watch(
//   () => formData.value.category,
//   (newCategory) => {
//     if (!newCategory.category) {
//       validationErrors.value.category = 'Please select a category';
//     } else {
//       delete validationErrors.value.category;
//     }
//   }
// );

// watch(
//   () => formData.value.image,
//   (newImage) => {
//     if (!newImage.image) {
//       validationErrors.value.image = 'Upload an Image';
//     } else {
//       delete validationErrors.value.image;
//     }
//   }
// );

watch(
  formData,
  (newVal, oldVal) => {
    if (newVal.title.trim().length < 3) {
      validationErrors.value.title = 'Title must be at least 3 character long';
    } else {
      delete validationErrors.value.title;
    }

    if (isNaN(newVal.price) || newVal.price <= 0) {
      validationErrors.value.price = 'Price must be valid postive number';
    } else {
      delete validationErrors.value.price;
    }

    if (newVal.description.trim().length === 0) {
      validationErrors.value.description = 'Must have some description';
    } else {
      delete validationErrors.value.description;
    }

    if (!newVal.category) {
      validationErrors.value.category = 'Please select a category';
    } else {
      delete validationErrors.value.category;
    }

    if (!newVal.image) {
      validationErrors.value.image = 'Upload an Image';
    } else {
      delete validationErrors.value.image;
    }
  },
  { deep: true }
);

const handleSubmit = async () => {
  if (Object.keys(validationErrors.value).length > 0) {
    message.value = 'Please fix error before Submitting';
    return;
  }

  await postProductStore.addProduct(formData.value);
  message.value = 'Product Add Sucessfully';
};

watchEffect(() => {
  productPreview.value = `
    Preview:
    ${formData.value.title} - $${formData.value.price}
  `;
});
</script>

<template>
  <div class="h-screen mt-[80px] mx-10">
    <form
      @submit.prevent="handleSubmit"
      class="p-8 rounded-2xl flex flex-col gap-5 max-w-lg mx-auto mt-16"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-2">
        Add New Product
      </h2>

      <input
        type="text"
        placeholder="Enter Title"
        class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-black/50 outline-none transition"
        v-model="formData.title"
        required
      />
      <p v-if="validationErrors.title" class="text-red-600 text-sm">
        {{ validationErrors.title }}
      </p>

      <input
        type="number"
        placeholder="Enter Price"
        class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-black/50 outline-none transition"
        v-model="formData.price"
        required
      />
      <p v-if="validationErrors.price" class="text-red-600 text-sm">
        {{ validationErrors.price }}
      </p>

      <textarea
        placeholder="Enter Description"
        rows="4"
        class="border border-gray-300 p-3 rounded-xl resize-none focus:ring-2 focus:ring-black/50 outline-none transition"
        v-model="formData.description"
        required
      ></textarea>
      <div v-if="validationErrors.description" class="text-red-600 text-sm">
        {{ validationErrors.description }}
      </div>

      <select
        class="border uppercase border-gray-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-black/50 outline-none transition"
        v-model="formData.category"
        required
      >
        <option disabled selected>Select Category</option>
        <option
          v-for="cat in CategoryStore.category"
          :key="cat.id"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
      <p v-if="validationErrors.category" class="text-red-600 text-sm">
        {{ validationErrors.category }}
      </p>

      <input
        type="text"
        placeholder="Enter Image URL"
        class="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-black/50 outline-none transition"
        v-model="formData.image"
        required
      />
      <p v-if="validationErrors.image" class="text-red-600 text-sm">
        {{ validationErrors.image }}
      </p>
      <button
        type="submit"
        class="mt-4 py-3 rounded-xl font-bold bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        Submit
      </button>
      <p v-if="message" class="mt-3">{{ message }}</p>
      <p v-if="productPreview" class="text-gray-600 mt-2 text-sm">
        {{ productPreview }}
      </p>
    </form>
  </div>
</template>
