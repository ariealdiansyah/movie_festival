<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-2xl font-bold mb-4">Most Viewed</h1>
    <div v-if="mostViewedMovie">
      <h2 class="text-lg font-semibold">Most Viewed Movie</h2>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MovieCard :movie="mostViewedMovie" />
      </section>
    </div>
    <div v-if="mostViewedGenre">
      <h2 class="text-lg font-semibold mt-4">Most Viewed Genre:</h2>
      <p>{{ mostViewedGenre.genre }} - {{ mostViewedGenre.views }} views</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../stores/index';
import MovieCard from '../components/MovieCard.vue';

const movieStore = useStore();

const mostViewedMovie = ref(null)
const mostViewedGenre = computed(() => movieStore.mostViewedGenre);



onMounted(async () => {
  await movieStore.fetchMovies();
  movieStore.calculateMostViewed();
  let movies = movieStore.movies;
  mostViewedMovie.value = movies.reduce((a, b) => (b.views > a.views ? b : a));
});
</script>
