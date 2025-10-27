<script setup></script>

<template>
  <form class="flex flex-col justify-center items-center gap-12">
    <h1 class="text-4xl font-extrabold uppercase">Sign Up</h1>

    <div class="mt-8">
      <input
        type="email"
        placeholder="Email Address"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="text"
        placeholder="Username"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="password"
        placeholder="Password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="password"
        placeholder="Confrim Password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="flex justify-between items-center w-100">
      <a href="/auth/login" class="hover:underline">Already had a account!</a>
      <button
        type="submit"
        class="bg-black text-white rounded-2xl py-3 px-7 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
      >
        {{ 'Sign Up' }}
      </button>
    </div>
  </form>
</template>
