<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Add Movie</h1>
    <form @submit.prevent="addMovie" class="space-y-4">
      <input v-model="title" type="text" placeholder="Title" class="text-black w-full p-2 border rounded" />
      <textarea v-model="description" placeholder="Description" class="text-black w-full p-2 border rounded"></textarea>
      <input v-model="duration" type="number" placeholder="Duration (minutes)"
        class="text-black w-full p-2 border rounded" />
      <input v-model="artists" type="text" placeholder="Artists (comma-separated)"
        class="text-black w-full p-2 border rounded" />
      <input v-model="genres" type="text" placeholder="Genres (comma-separated)"
        class="text-black w-full p-2 border rounded" />
      <input v-model="watchUrl" type="url" placeholder="Watch URL" class="text-black w-full p-2 border rounded" />
      <input v-model="imageUrl" type="url" placeholder="Image URL" class="text-black w-full p-2 border rounded" />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Add Movie</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/index';
import { useRouter } from 'vue-router';

const title = ref('');
const description = ref('');
const duration = ref('');
const artists = ref('');
const genres = ref('');
const watchUrl = ref('');
const imageUrl = ref('');

const store = useStore();
const router = useRouter();

const addMovie = async () => {
  const newMovie = {
    title: title.value,
    description: description.value,
    duration: Number(duration.value),
    artists: artists.value.split(',').map(a => a.trim()),
    genres: genres.value.split(',').map(g => g.trim()),
    watchUrl: watchUrl.value,
    imageUrl: imageUrl.value,
    views: 0,
    upvotes: 0,
    downvotes: 0,
  };

  await store.addMovies(newMovie)
  alert('Movie added successfully!');
  router.push('/movies');
};
</script>
