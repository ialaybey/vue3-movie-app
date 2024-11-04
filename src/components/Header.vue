<script setup lang="ts">
import { useMovieStore } from '@/store/movie.store';
import Magnifier from './icons/Magnifier.vue';

const store = useMovieStore()

const searchMovie = (e: any) => {
    store.fetch(e.target.value == '' ? null : e.target.value)
}

</script>

<template>
     <header
      class="py-6 shadow-lg fixed inset-0 bottom-auto bg-white z-10 dark">
      <nav class="flex container mx-auto px-6">
        <RouterLink :to="{ name: 'home' }" aria-label="Back">
            <img
               src="../../public/logo.jpg"
               alt="Logo"
               class="h-10"
            />
         </RouterLink>
         <div
            class="flex flex-row items-center ml-auto gap-4"
            aria-label="Search"
         >
         <input placeholder="Search..." class="border-2 border-slate-100 px-4 py-2 rounded-lg" @change="searchMovie"/>
            <Magnifier class="mt-1 w-6 h-6" />
        </div>
      </nav>
   </header>
</template>
