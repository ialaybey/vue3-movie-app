<script setup lang="ts">
import type { Movie } from '@/model/movie';
import MovieCard from './MovieCard.vue';


const props = defineProps<{movie: Movie}>();

</script>

<template>
  <div class="modal">
    <div class="modal-content w-1/2 bg-white flex-wrap" @click.stop >
     <MovieCard :movie="movie" :detail="true"></MovieCard>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

}
.modal-content {
  position: relative;
  max-width: 50%;
  width: 100%;
}
.title {
  font-weight: 700;
  margin-bottom: spacing(2);
}
.close {
  position: absolute;
  top: spacing(3);
  right: spacing(3);
}
</style>
