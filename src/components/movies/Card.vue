<template>
  <v-card
    class="mx-auto overflow-hidden"
  >
    <v-img
      height="250"
      v-if="movie.backdrop_path == null"
      src="no_image.png"
    ></v-img>
    <v-img
      height="250"
      v-else
      v-bind:src="'http://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
    ></v-img>
    <v-card-title class="align-start">
      <div>
        <span class="text-h6" >{{ movie.title }}</span>
        <div class="grey--text font-weight-light text-h7">
          {{ movie.original_title }}
        </div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="movie.vote_average/2"
          background-color="grey"
          color="warning"
          dense
          half-increments
          readonly
          size="25"
        ></v-rating>

        <div class="grey--text text--lighten-2 ms-4">
          {{ movie.vote_average }}
        </div>
      </v-row>
      <v-spacer></v-spacer>
      <span class="pr-4 grey--text text--darken-2 font-weight-light text-caption">{{ movie.vote_count }} ocen</span>
    </v-card-actions>
    <div class="pa-3 pt-0 text-caption">
      {{ movie.overview | truncate(260, '...')}}
    </div>

    <div class="pa-3 pt-0 text-center">
      <v-dialog>
        <template v-slot:activator="{ on }">
          <!-- Przycisk "WIĘCEJ INFORMACJI -->
          <v-btn
            color="primary"
            rounded
            v-on="on"
            @click="getMovieDetails(movie.id)"
          >
            Więcej informacji
          </v-btn>
        </template>
        <!-- Wysakująca karta z informacjami o filmie -->
        <MovieDetailsCard :movieDetails="movieDetails"></MovieDetailsCard>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import MovieDetailsCard from './DetailsCard'
import axios from 'axios'
export default {
  name: 'MovieCard',
  components: {
    MovieDetailsCard
  },
  props: ['movie'],
  data: () => ({
    movieDetails: []
  }),
  methods: {
    getMovieDetails (id) {
      const URL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.$apiKey + '&language=pl'
      axios
        .get(URL)
        .then(response => { this.movieDetails = response.data })
    }
  }
}
</script>

<style scoped>

</style>
