<template>
  <div class="card" data-vue-component-name="Card">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card class="card-item" :elevation="hover ? 24 : 6">
          <v-img
              height="250"
              :src="movie.image"
          ></v-img>
          <v-card-title> {{movie.name}} </v-card-title>
          <v-chip
              class="ma-2"
              color="success"
              outlined
          >
            {{ getGenres[movie.genre] }}
          </v-chip>
          <v-card-text class="text">
            <div>
              <div v-html="getDescription.desc"></div>
              <router-link class="link" :to="`/single/${movie.id}`" v-if="getDescription.showMore">
                Докладніше
              </router-link>
            </div>
          </v-card-text>
          <v-card-actions class="actions">
            <v-btn
                @click="$router.push(`/single/${movie.id}`)"
                color="deep-purple lighten-2"
                text
            >
              Дивитися
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import { getGenres } from "@/constants";
export default {
  name: "Card",
  props: {
    movie: {
      required: true,
      type: Object,
    }
  },
  computed: {
    getGenres,
    getDescription() {
      const minLength = this.movie.description.length <= 200;
      return {
        desc: minLength ? this.movie.description : this.movie.description.slice(0, 200),
        showMore: !minLength
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card, .card-item{
  height: 100%;
}
.actions{
  position: absolute;
  bottom: 0;
}
.text{
  margin-bottom: 52px;
}
.link{
  text-decoration: none;
}
.card{
  transition: all 0.3s ease-in;
  &:hover{
    transform: scale(1.025);
  }
}
</style>
