<script setup lang="ts">
import MovieList from '@/components/MovieList.vue';
import Header from '@/components/Header.vue'
import DetailModal from '@/components/DetailModal.vue';
import { useMovieStore } from '@/store/movie.store';
import { computed, toRaw } from 'vue';
import type { Movie } from '@/model/movie';

const store = useMovieStore();
const movie = computed(() => {
   return toRaw(store.getSelectedMovie)
})

const closeModal = () => {
  console.log("DEBUG CLOSE")
  store.setSelectedMovie({} as Movie);
}
</script>

<template>
  <main class="w-screen h-screen">
    <Header></Header>
    <MovieList></MovieList>
    <DetailModal v-on:click="closeModal()" @close="closeModal" class="z-99 backdrop-blur-sm" v-if="movie.id" :movie="movie"></DetailModal>
    
  </main>
</template>
