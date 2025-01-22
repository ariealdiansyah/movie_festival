<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Edit Movie {{ movieId }}</h1>
    <form @submit.prevent="updateMovie" class="space-y-4">
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
      <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">Update Movie</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const movieId = route.params.id;
const title = ref('');
const description = ref('');
const duration = ref('');
const artists = ref('');
const genres = ref('');
const watchUrl = ref('');
const imageUrl = ref('');
const data = ref(null)

onMounted(async () => {
  const { data } = await axios.get(`http://localhost:3000/movies/${movieId}`);
  title.value = data.title;
  description.value = data.description;
  duration.value = data.duration;
  artists.value = data.artists.join(', ');
  genres.value = data.genres.join(', ');
  watchUrl.value = data.watchUrl;
  imageUrl.value = data.imageUrl;
  data.value = data
});

const updateMovie = async () => {
  const updatedMovie = {
    title: title.value,
    description: description.value,
    duration: Number(duration.value),
    artists: artists.value.split(',').map(a => a.trim()),
    genres: genres.value.split(',').map(g => g.trim()),
    watchUrl: watchUrl.value,
    imageUrl: imageUrl.value,
    views: data.value.views,
    upvotes: data.value.upvotes,
    downvotes: data.value.downvotes,
  };

  await axios.put(`http://localhost:3000/movies/${movieId}`, updatedMovie);
  alert('Movie updated successfully!');
  router.push('/movies');
};
</script>
