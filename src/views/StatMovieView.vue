<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Statistics</h1>
    <div>
      <h2 class="text-xl font-bold">Most Viewed Movie</h2>
      <p v-if="mostViewedMovie">
        {{ mostViewedMovie.title }} ({{ mostViewedMovie.views }} views)
      </p>
    </div>
    <div>
      <h2 class="text-xl font-bold mt-4">Most Viewed Genre</h2>
      <p v-if="mostViewedGenre">{{ mostViewedGenre }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const mostViewedMovie = ref(null);
const mostViewedGenre = ref(null);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/movies');
  const sortedMovies = [...data].sort((a, b) => b.views - a.views);
  mostViewedMovie.value = sortedMovies[0];

  const genreCounts = {};
  data.forEach(movie => {
    movie.genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + movie.views;
    });
  });

  mostViewedGenre.value = Object.entries(genreCounts).reduce(
    (max, [genre, count]) => (count > max.count ? { genre, count } : max),
    { genre: '', count: 0 }
  ).genre;
});
</script>
