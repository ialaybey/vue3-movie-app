<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MovieCard from './MovieCard.vue';
import { useMovieStore } from '@/store/movie.store';
import type { Movie } from '@/model/movie';
const store = useMovieStore()
const movieList= computed(() => store.getMovieList) 
onMounted(() => {
   store.fetch(null)
})

const setSelectedMovie = (data: Movie) => {
   store.setSelectedMovie(data)
}
</script>

<template>

<ul class="flex flex-wrap gap-y-3">
         <li v-for="movie in movieList" :key="movie.id" class="lg:w-1/3 sm:w-1 md:w-1/2">
         <button @click="setSelectedMovie(movie)"><MovieCard :movie="movie" :detail="false"></MovieCard></button>
      </li>
   </ul>
</template>
