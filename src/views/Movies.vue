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
                      <v-btn
                        color="primary"
                        rounded
                        v-on="on"
                        @click="getMovieDetails(movie.id)"
                      >
                        Więcej informacji
                      </v-btn>
                    </template>
                    <v-card
                      class="mx-auto">
                      <v-img
                        class="white--text align-end"
                        height="200px"
                        v-bind:src="'http://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path"
                        gradient="to top right, rgba(128,128,128,.33), rgba(25,32,72,.7)"
                      >
                        <v-card-text class="pt-3">
                          <div>{{ movieDetails.original_title }}</div>
                          <p class="text-h4">
                            {{ movieDetails.title }} ({{ getYear(movieDetails.release_date) }})
                          </p>
                        </v-card-text>
                      </v-img>
                      <v-card-text class="pt-5">
                        <v-row>
                          <v-col
                            cols="2"
                            class="align-center"
                          >
                            <v-img
                              class="rounded-lg"
                              v-bind:src="'http://image.tmdb.org/t/p/original/' + movieDetails.poster_path"
                              width="250"
                            ></v-img>
                          </v-col>
                          <v-col cols="10">
                            <div class="text-h6 text-uppercase">Opis</div>
                            <div class="body-2 ">{{ movieDetails.overview }}</div>
                            <v-divider class="mt-3"></v-divider>
                            <div class="text-h6 text-uppercase">Szczegółowe informacje</div>
                            <div class="body-2">
                              <v-simple-table>
                                <tbody>
                                <tr>
                                  <td>Data premiery</td>
                                  <td>
                                    <v-chip class="mx-1" color="secondary" >{{ formatDate(movieDetails.release_date) }}</v-chip>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Gatunki</td>
                                  <td>
                                    <v-chip class="mx-1" color="primary" v-for="genre in movieDetails.genres" :key="genre.id">{{ genre.name }}</v-chip></td>
                                </tr>
                                <tr>
                                  <td>Ocena widzów</td>
                                  <td>
                                    <v-chip class="mx-1" :color="getVoteColor(movieDetails.vote_average)">{{ movieDetails.vote_average }}</v-chip> na podstawie {{ movieDetails.vote_count }} ocen.
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Firmy produkcyjne
                                  </td>
                                  <td>
                                    <v-chip class="mx-1" color="red" text-color="white" v-for="production_company in movieDetails.production_companies" :key="production_company.id">{{ production_company.name }}</v-chip>
                                  </td>
                                </tr>
                                </tbody>
                              </v-simple-table>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card>
            </v-col>
        </v-row>
        <!-- Pagination - floating on page -->
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
import moment from 'moment'

export default {
  name: 'Movies',
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
    getYear (date) {
      return moment(String(date)).format('YYYY')
    },
    formatDate (date) {
      moment.locale('pl')
      return moment(String(date)).format('LL')
    },
    getVoteColor (average) {
      if (average < 4) { return 'red' }
      if (average >= 4 && average < 7) { return 'warning' }
      if (average >= 7) { return 'green' }
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
