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
              <MovieCard :movie="movie"></MovieCard>
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
import MovieCard from '../components/movies/Card'

export default {
  name: 'Movies',
  components: {
    MovieCard
  },
  data: () => ({
    searchQuery: '',
    movies: [],
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
      if (query.length >= 1) {
        const URL = 'https://api.themoviedb.org/3/search/movie' + '?api_key=' + this.$apiKey + '&query=' + query + '&page=' + this.currentPage + '&language=pl'

        axios
          .get(URL)
          .then(response => {
            this.movies = response.data.results
            this.lastPage = response.data.total_pages
          })
      } else {
        this.getMovies()
      }
    },
    // Poprzednia strona
    prevPage () {
      this.currentPage--
      if (this.searchQuery === null || this.searchQuery === '') {
        this.getMovies()
      } else {
        this.getResults(this.searchQuery)
      }
    },
    // Następna strona
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
