import { getMovies } from '@/api/movie-api';
import type { Movie } from '@/model/movie';
import { defineStore } from 'pinia';


export const useMovieStore = defineStore('moiveStore', {
    state: () => ({ list: [] as Movie[], selected: {} as Movie}),
    getters: {
        getMovieList: (state) => state.list,
        getSelectedMovie: (state) => state.selected
    },
    actions: {
        setSelectedMovie(data: Movie) {
            this.selected = data;
        },
        fetch(param: string | null) {
            getMovies(param).then(r => {
                this.list = r;
            });
        }
    }
});