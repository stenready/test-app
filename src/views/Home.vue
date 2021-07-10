<template>
  <div class="home-page">
    <v-container>
      <filtered @filtered="filterHandler" />
      <v-row class="mt-2">
       <v-col cols="4" v-for="(movie) of movies" :key="movie.id">
         <Card :movie="movie" />
       </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from "../components/Card";
import Filtered from "../components/Filtered";
  export default {
    name: 'Home',
    components: {
      Card,
      Filtered
    },
    data() {
      return {
        movies: [],
      }
    },
    methods: {
      async filterHandler(payload) {
        console.log(payload)
        if (payload === 'clear') {
          this.movies = await this.$api.getMovies();
          return;
        }
        this.movies = await this.$api.findMovieByPayload(null, payload.searchByName, payload.selected);
      }
    },
    async  mounted() {
      this.movies = await this.$api.getMovies()
    }
  }
</script>

