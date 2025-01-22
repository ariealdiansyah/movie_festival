<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <input v-model="email" type="text" placeholder="Email" class="w-full text-black p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full text-black p-2 border rounded" />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../stores/index';

const email = ref('');
const password = ref('');
const authStore = useStore();
const router = useRouter();

const handleLogin = async () => {
  if (email.value && password.value) {
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    if (authStore.isAuthenticated) {
      // Redirect user based on their role
      const redirectPath = authStore.role === 'admin' ? '/add-movies' : '/';
      router.push(redirectPath);
    }
  } else {
    alert('Please fill in both username and password');
  }
};
</script>
