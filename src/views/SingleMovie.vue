<template>
  <div class="single-movie" v-if="movie" :style="{ 'background-image': 'url(' + movie.image + ')' }">
    <v-container>
      <v-row>
        <v-col cols="7" class="centered">
          <v-card  elevation="14" outlined class="card">
            <v-card-title> {{movie.name}} </v-card-title>
            <v-card-text>
              <div v-html="movie.description"></div>
              <div v-html="movie.additional"></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card  elevation="14" outlined class="card">
            <div v-for="(session, idx) of sessions" :key="idx">
              <v-card-title> {{session.showdate}} </v-card-title>
              <v-chip
                  :class="isActiveChip(session, time)"
                  ref="chip" v-for="(time, index) of session.times"
                  :key="index"
                  @click="sessionsHandler(session.showdate, time, index)">
                {{time}}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: "SingleMovie",
  data() {
    return {
      movie: [],
      sessions: [],
      selection: null,
    }
  },
  watch: {
    selection(value) {
      this.SET_SELECTED_DATE(value)
    },
  },
  methods: {
    ...mapMutations(['SET_SELECTED_DATE']),
    async init() {
      const id = +this.$route.params.id;
      const singleMovie = await this.$api.findMovieByPayload(id, null, null)
      this.movie = singleMovie[0];
      const response = await this.$api.getMovieSessions(id)
      this.sessions = response[id].map(el => {
        return {
          ...el,
          times: this.getSessionTimes(el),
        }
      });
    },
    isActiveChip(session, time) {
      const lTime = `${session.showdate} ${time}`
      return this.selection === lTime ? 'active' : ''
    },
    getSessionTimes(session) {
      return session.daytime.split(';')
    },
    sessionsHandler(date, time){
      const lTime = `${date} ${time}`
      if ( this.selection === lTime) {
        this.selection = ''
        return false
      }
      this.selection = lTime
    },
  },
  async mounted() {
    await this.init()
  }
}
</script>

<style lang="scss">
.single-movie{
  width: 100vw;
  height: calc(100vh - 64px);
  background-size: cover;
  ul {
    list-style-type: none;
    padding: 0;
    width: 500px;
    margin: 0 auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .card{
    height: 600px;
    overflow: scroll;
  }
  .v-chip{
    margin: 5px;
    &.active {
      background: #64B5F6 !important;
      color: white !important;
    }
  }
}
</style>
