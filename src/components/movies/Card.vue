<template>
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
</template>

<script>
import moment from 'moment'

export default ({
  name: 'MovieDetailsCard',
  props: ['movieDetails'],
  methods: {
    getYear (date) {
      return moment(date).format('YYYY')
    },
    formatDate (date) {
      moment.locale('pl')
      return moment(date).format('LL')
    },
    getVoteColor (average) {
      if (average < 4) { return 'red' }
      if (average >= 4 && average < 7) { return 'warning' }
      if (average >= 7) { return 'green' }
    }
  }
})
</script>

<style scoped>

</style>
