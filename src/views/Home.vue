<template>
  <div class="home-page">
    <v-container>
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
  export default {
    name: 'Home',
    components: {
      Card
    },
    data() {
      return {
        movies: [],
        attrs: {
          class: 'mb-6',
          boilerplate: true,
          elevation: 2,
        },
      }
    },
    async  mounted() {
      this.movies = await this.$api.getMovies()
      console.log(this.movies)
    }
  }
</script>

