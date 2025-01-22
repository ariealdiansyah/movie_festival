<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <NavbarMenu />
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavbarMenu from './components/NavbarMenu.vue';
</script>

<style>
/* Global styles (optional) */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
