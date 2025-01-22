<template>
  <div class="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col h-full cursor-pointer"
    @click="goToDetail(movie.id)">
    <div class="relative w-full h-48 md:h-60 lg:h-64 overflow-hidden rounded-lg">
      <!-- <iframe v-if="props.movie.watchUrl" class="absolute inset-0 w-full h-full" :src="props.movie.watchUrl"
        :title="props.movie.title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe> -->
      <img :src="props.movie.imageUrl" :alt="props.movie.title" class="absolute inset-0 w-full h-full" />
    </div>

    <div class="flex flex-col mt-4 flex-grow">
      <h2 class="text-xl font-semibold text-white truncate">{{ props.movie.title }}</h2>
      <p class="text-gray-400 mt-2 text-sm line-clamp-2">{{ props.movie.description }}</p>
    </div>

    <div v-if="!isAdmin" class="mt-4 flex justify-between items-center">
      <button @click.stop="vote(props.movie.id)"
        class="flex items-center bg-green-600 mx-1 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">
        <span class="text-lg mr-2">👍</span>
        Upvote ({{ props.movie.upvotes }})
      </button>
      <button @click.stop="unvote(props.movie.id)"
        class="flex items-center bg-red-600 mx-1 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition">
        <span class="text-lg mr-2">👎</span>
        Downvote ({{ props.movie.downvotes }})
      </button>
    </div>

    <div v-else class="mt-4 flex justify-between items-center">
      <button @click.stop="editMovie(props.movie.id)"
        class="flex items-center bg-blue-600 mx-1 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
        Edit
      </button>
      <button @click.stop="deleteMovie(props.movie.id)"
        class="flex items-center bg-red-600 mx-1 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition">
        Delete
      </button>
    </div>

    <div class="mt-3 text-gray-400 text-sm">Views: {{ movie.views }}</div>
  </div>
</template>

<script setup>
import { useStore } from '../stores/index';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  movie: Object,
});

const store = useStore();
const router = useRouter();

const isAdmin = computed(() => store.user?.role === 'admin');

const vote = async (movieId) => {
  await store.vote(movieId);
};

const unvote = async (movieId) => {
  await store.unvote(movieId);
};

const goToDetail = (movieId) => {
  router.push(`/movies/${movieId}`);
};

const editMovie = (movieId) => {
  router.push(`/movies/${movieId}/edit`);
};
</script>
