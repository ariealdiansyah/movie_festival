<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">{{ movie.title }}</h1>
    <p>{{ movie.description }}</p>
    <video id="video" ref="videoPlayer" controls :src="movie.watchUrl" class="mt-4 w-full rounded shadow"
      @play="startTracking" @pause="stopTracking" @ended="stopTracking">
      <track label="English" kind="captions" srclang="en" :src="movie.watchUrl" default>
    </video>
    <div class="mt-4">
      <p><strong>Views:</strong> {{ movie.views }}</p>
      <p><strong>Upvotes:</strong> {{ movie.upvotes }}</p>
      <p><strong>Downvotes:</strong> {{ movie.downvotes }}</p>
    </div>
    <div class="flex items-center gap-4 mt-4">
      <button @click="vote(movie.id, 'upvote')" class="px-4 py-2 rounded bg-green-500 text-white">
        👍 Upvote
      </button>
      <button @click="unvote(movie.id, 'downvote')" class="px-4 py-2 rounded bg-red-500 text-white">
        👎 Downvote
      </button>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../stores/index';

const store = useStore();
const route = useRoute();
const movieId = route.params.id;
const movie = computed(() => store.detailMovie);
// const watchStartTime = ref(null);
// const watchDuration = ref(0);

// const fetchMovie = async () => {
//   const foundMovie = store.movies.find((m) => m.id === movieId);
//   console.log('found', foundMovie)
//   if (!foundMovie) await store.fetchMovies();
//   movie.value = store.movies.find((m) => m.id === movieId);
// };

const startTracking = () => {
  // watchStartTime.value = Date.now();
};

const stopTracking = async () => {
  // if (!watchStartTime.value) return;
  // const elapsedTime = (Date.now() - watchStartTime.value) / 1000; // Convert to seconds
  // watchDuration.value += elapsedTime;
  // watchStartTime.value = null;

  // if (watchDuration.value >= 60) {
  //   await store.incrementView(movieId);
  //   watchDuration.value = 0; // Reset duration after counting view
  // }
};

const vote = async (movieId) => {
  await store.vote(movieId);
};

const unvote = async (movieId) => {
  await store.unvote(movieId);
};

onMounted(async () => {
  await store.detailsMovie(movieId)
  await store.incrementView(movieId);
});

// onBeforeUnmount(() => {
//   stopTracking();
// });
</script>
