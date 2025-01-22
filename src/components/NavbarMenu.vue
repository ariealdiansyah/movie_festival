<!-- <template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Movie Festival</h1>
      <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:text-gray-300">Home</router-link></li>
        <li><router-link to="/movies" class="hover:text-gray-300">Movies</router-link></li>

        <template v-if="role === 'admin'">
          <li><router-link to="/admin/add" class="hover:text-gray-300">Add Movie</router-link></li>
          <li><router-link to="/admin/stats" class="hover:text-gray-300">Statistics</router-link></li>
        </template>

        <template v-else-if="role === 'user'">
          <li><router-link to="/user/votes" class="hover:text-gray-300">My Votes</router-link></li>
        </template>

        <li v-if="!isAuthenticated">
          <router-link to="/login" class="hover:text-gray-300">Login</router-link>
        </li>
        <li v-else>
          <button @click="logout" class="hover:text-gray-300">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template> -->

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold text-white">Movie Festival</div>
      <ul class="flex space-x-6 text-gray-300">
        <li>
          <router-link to="/" class="hover:text-white transition" :class="{ 'text-white': $route.name === 'home' }">
            Home
          </router-link>
        </li>
        <!-- <template v-if="user?.role === 'user'"> -->
        <li>
          <router-link to="/movies" class="hover:text-white transition"
            :class="{ 'text-white': $route.name === 'movies' }">
            Movies
          </router-link>
        </li>
        <!-- </template> -->

        <template v-if="user?.role === 'admin'">
          <!-- <li><router-link to="/admin/add" class="hover:text-gray-300">Add Movie</router-link></li> -->
          <li><router-link to="/most-viewed" class="hover:text-gray-300">Most View</router-link></li>
        </template>

        <li v-if="!isAuthenticated">
          <router-link to="/login" class="hover:text-white transition">Login</router-link>
        </li>
        <li v-else>
          <button @click="logout" class="hover:text-white transition">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../stores/index';

const store = useStore();
const router = useRouter();

const user = computed(() => store.user);
const isAuthenticated = computed(() => store.isAuthenticated);

const logout = () => {
  store.logout();
  router.push('/login');
};
</script>
