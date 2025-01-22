<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-2xl font-bold mb-4">Most Viewed</h1>
    <div v-if="mostViewedMovie">
      <h2 class="text-lg font-semibold">Most Viewed Movie</h2>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MovieCard :movie="mostViewedMovie" />
      </section>

      <h2 class="text-2xl font-semibold text-white my-6">Most Voted Movies</h2>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MovieCard v-for="movie in mostVotedMovies" :key="movie.id" :movie="movie" />
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

const store = useStore();

// const movie = computed(() => store.movies)
const mostViewedMovie = ref(null)
const mostVotedMovies = ref(null)
const mostViewedGenre = computed(() => store.mostViewedGenre);

// const isAdmin = computed(() => store.user?.role === 'admin');
// const mostViewedMovies = computed(() => movie.sort((a, b) => b.views - a.views).slice(0, 5));
// const mostVotedMovies = computed(() => movie.sort((a, b) => b.upvotes - a.upvotes));


onMounted(async () => {
  await store.fetchMovies();
  store.calculateMostViewed();
  let movies = store.movies;
  mostViewedMovie.value = movies.reduce((a, b) => (b.views > a.views ? b : a));
  mostVotedMovies.value = movies.sort((a, b) => b.upvotes - a.upvotes);
});
</script>
