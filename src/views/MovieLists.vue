<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center my-4 space-y-4">
      <input v-model="searchQuery" type="text" placeholder="Search movies by title, description, artists, or genres"
        class="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
      <button v-if="isAdmin" @click="goToAddMovie"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Add Movie
      </button>
    </div>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '../stores/index';
import { useRouter } from 'vue-router';
import MovieCard from '../components/MovieCard.vue';

const store = useStore();
const router = useRouter();

const searchQuery = ref('');

onMounted(() => {
  store.fetchMovies();
});

const movies = computed(() => store.movies);
const isAdmin = computed(() => store.user?.role === 'admin');

const goToAddMovie = () => {
  router.push('/add-movies');
};

const filteredMovies = computed(() => {
  if (!searchQuery.value.trim()) {
    return movies.value; // Return all movies if the search query is empty
  }
  const query = searchQuery.value.toLowerCase();
  return movies.value.filter((movie) =>
    // Match title, description, artists, or genres
    movie.title.toLowerCase().includes(query) ||
    movie.description.toLowerCase().includes(query) ||
    movie.artists.some((artist) => artist.toLowerCase().includes(query)) ||
    movie.genres.some((genre) => genre.toLowerCase().includes(query))
  );
});
</script>
