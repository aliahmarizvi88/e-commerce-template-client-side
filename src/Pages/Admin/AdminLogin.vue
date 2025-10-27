<script setup></script>

<template>
  <form class="flex flex-col justify-center items-center gap-12">
    <h1 class="text-2xl font-bold uppercase">Admin Login</h1>

    <div class="mt-8">
      <input
        type="email"
        placeholder="Email Address"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-8">
      <input
        type="password"
        placeholder="Password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <button
      type="submit"
      class="bg-black w-60 text-white rounded-2xl py-2 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
    >
      {{ 'LOGIN' }}
    </button>
  </form>
</template>
