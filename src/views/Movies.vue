<template>
  <v-card class="pa-6 ma-3">
    <v-card-title>
      Baza filmów
      <v-spacer></v-spacer>
      <!-- Pole wyszukiwania -->
      <v-text-field
        class="mr-8 mb-3"
        v-model="searchQuery"
        @keyup="getResults(searchQuery)"
        append-icon="mdi-magnify"
        label="Szukaj filmu"></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col
              v-for="movie in movies"
              :key="movie.id"
              cols="12"
              md="4"
            >
              <!-- Karta z filmem -->
              <v-card
                class="mx-auto overflow-hidden"
              >
                <v-img
                      height="250"
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
            </v-col>
        </v-row>
        <!-- Paginacja - Poprzednia strona / Następna strona -->
        <div class="text-center">
          <v-btn
            class="mx-1"
            color="primary"
            large
            :disabled="currentPage === 1"
            @click="prevPage"
            fixed bottom left
          >
            <v-icon left>mdi-chevron-left</v-icon>
            Poprzednia strona
          </v-btn>
          <v-btn
            class="mx-1"
            color="primary"
            large
            :disabled="currentPage === lastPage"
            @click="nextPage"
            fixed bottom right
          >
            Następna strona
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import MovieDetailsCard from '../components/movies/Card'

export default {
  name: 'Movies',
  components: {
    MovieDetailsCard
  },
  data: () => ({
    searchQuery: '',
    movies: [],
    movieDetails: [],
    dialogVisible: false,
    tab: null,
    currentPage: null,
    lastPage: null
  }),
  methods: {
    getMovies () {
      const URL = 'https://api.themoviedb.org/3/movie/popular' + '?api_key=' + this.$apiKey + '&page=' + this.currentPage + '&language=pl'
      axios
        .get(URL)
        .then(response => { this.movies = response.data.results })
    },
    getResults (query) {
      const URL = 'https://api.themoviedb.org/3/search/movie' + '?api_key=' + this.$apiKey + '&query=' + query + '&page=' + this.currentPage + '&language=pl'

      axios
        .get(URL)
        .then(response => {
          this.movies = response.data.results
          this.lastPage = response.data.total_pages
        })
    },
    getMovieDetails (id) {
      const URL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.$apiKey + '&language=pl'
      axios
        .get(URL)
        .then(response => { this.movieDetails = response.data })
      console.log(this.movieDetails)
    },
    prevPage () {
      this.currentPage--
      if (this.searchQuery === null || this.searchQuery === '') {
        this.getMovies()
      } else {
        this.getResults(this.searchQuery)
      }
    },
    nextPage () {
      this.currentPage++
      if (this.searchQuery === null || this.searchQuery === '') {
        this.getMovies()
      } else {
        this.getResults(this.searchQuery)
      }
    }
  },
  mounted () {
    this.currentPage = 1
    this.getMovies()
  },
  watch: {
    searchQuery: function (val) {
      if (this.searchQuery === null || this.searchQuery === '') {
        this.currentPage = 1
        this.getMovies()
      }
    }
  }
}
</script>

<style scoped>

</style>
