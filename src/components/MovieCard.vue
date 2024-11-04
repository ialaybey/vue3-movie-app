<script setup lang="ts">
import type { Movie } from '@/model/movie';

const props = defineProps<{movie: Movie, detail: boolean}>();
const showYears = (start: string, last: string | null) => {
    const startYear = start.split('-')[0];
    const lastYear = last?.split('-')[0];
    if (startYear === lastYear) return startYear;
    return `${startYear}–${lastYear || ''}`;
}
</script>

<template>
   <article class="flex">
      <div
         :to="{ name: 'movie', params: { movieId: movie.id } }"
         class="inline-block mr-3 shrink-0"
      >
         <img
            :src="movie.image?.medium"
            alt=""
            class="h-56 md:h-64 object-cover hover:blur-[2px] transition"
         />
   </div>

      <div class="movie-card flex flex-col space-y-2">
         <span class="font-bold">{{ movie.name }}</span>
         <span>{{ showYears(movie?.premiered, movie.ended) }}</span>
         <span v-if="movie.rating.average" class="text-xs">
            <span class="font-bold text-base">{{ movie.rating.average }}</span>
            /10
         </span>
         <span>{{ movie.genres.join(', ') }}</span>
         <span v-if="movie.network">{{ movie.network.name }}</span>
         <span class="font-bold">Description: </span>
         <div id="detail" v-if="detail" v-html="movie.summary"></div>

         <div class="!mt-auto flex gap-2">
            <a
               v-if="movie.externals.imdb"
               :href="`https://imdb.com/title/${movie.externals.imdb}`"
               target="_blank"
               aria-label="IMDb"
            >
               <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANeSURBVHgBrVfNS1RRFP/d9+6baZw0FUUdQ5vCSiKkRRgt2tSiTRAEtqmgSCOqXS1yYdHGbfgHRK1qGdKij0UFgkpFZCkEQptASElRGacZ593e14z33Y/3ntGB4d137jm/c9455557hqxPdJYBGPgf5KLY29IADdS2HCDOjwlSKp64D40M4daKfSMWhGB7RIRnFVPzAUZNmEFtjCnARYMMshEGOXK8c4R3QGdcNBqXmqhU8XucjKECZ1WF6guLAVRgSFHV7Bk6Z2NDXwUnGhlRnyiMMP8UqJV4UF1YVTlXyfPOChGlSmNivlR1oOIxjZMRtRGugTijKuOqd5UTolwQEUMLxMKCEojosIghHjlNjdCaUMB4NVXEkxcbyGYsDJ418fBp0ePvrEtj7E4aVx+swg5kR2814O7Yagi8p8vC8OUsxp5t4PP3PzjQnca9wbrwqZBqgNuY/2lj/F0BrU1pnDmR9dYuWbSEoXMUz98Wasq3LzVg/L3/3tGyAwtLvrO5VgOTMyW8nizgeJ8LXienN4ig1Ad06SxvbuLTnP6meXQ/g55uy1uvrIX3Zn/YmPhSBiEs7AT4VqzKU0Apyw/Uy8kKUikKSuXSsZnpyMlt5eNcCf0XF3D6xi+MPt6QbGy1Yl3Hc6hpVwqZNMXUTAH53A6YplkzDL2aR33707g+UO+t30wXwyeMxM0BAXLaYtjdbmBtvYSuDofNkJhSlCHXEnwn41IQqgH+yCiOlG0T9Ob9NLS3UNE/WSGKpBQYiO/7Du3p8Auwp0vOlauyvFbB4m+mNMiYmu/+qDdCxTjuVm93u1vhRezLWSEMBO5cGF6u8fd2Mkx/9dcfZsv4Nu8fz7ZmGlaE2AccOnrIwsi1Rq/oevMGRoYaUZ+1cLIfDt/EkYMmhq/UgzndqK2ZePs85TspBk5ZMA2KY4ctpydQLC5XsLRSwc3zGSnaxBlKK4gqRt19zjvOt2kW8RRxmTgTJqihmmHVBaW7hoWjx+tFlTSirlGlU3FOQN6PDr14A0ZFKcKI9uMiHRBnAg2AxEs6KzDeAd1sl6TwNMCRJLXiqEJKMhlx16tShyhkpVMQ9UUM+nkPCfhMsZZSIAoSxVr3/Jd6CYgqBZlGMe7LSAI5QcYI/QlhmvV2KC4aLCzzF4m8LBmeladHAAAAAElFTkSuQmCC"
                  alt="IMDb"
                  class="w-6 rounded"
               />
            </a>
            <a :href="movie.url" aria-label="TVMaze" target="_blank">
               <img
                  src="https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg"
                  alt="TVMaze"
                  class="w-6 rounded"
               />
            </a>
         </div>
      </div>
   </article>
</template>

<style lang="css" scoped>
@media only screen and (max-width: 768px) {
   .movie-card {
   overflow: scroll;
   max-height: 25rem;
   
}
}

</style>