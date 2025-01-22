<!-- <template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Movies</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template> -->

<template>
  <div class="container mx-auto">
    <section class="row items-center text-center py-20">
      <h1 class="text-4xl font-bold text-white">Welcome to Movie Festival</h1>
      <p class="text-gray-400 mt-4">
        Discover and vote for your favorite movies during the festival.
      </p>
      <router-link to="/movies" class="hover:text-white transition" :class="{ 'text-white': $route.name === 'movies' }">
        <div class="flex text-center items-center justify-center mt-2">
          <button
            class="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">See
            Movies</button>
        </div>
      </router-link>
      <!-- <button v-if="isAdmin" @click="goToAddMovie"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Add Movie
      </button> -->
    </section>

    <!-- <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </section> -->
  </div>
</template>

<script setup>
// import { useStore } from '../stores/index';
// import { useRouter } from 'vue-router';
// import { computed } from 'vue'

// const store = useStore();
// const router = useRouter();
// const movies = computed(() => store.movies);
// const isAdmin = computed(() => store.user?.role === 'admin');

// const goToAddMovie = () => {
//   router.push({ name: 'addMovie' });
// };
</script>
