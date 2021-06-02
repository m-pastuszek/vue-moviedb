<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark>
      <!-- Logo -->
      <v-app-bar-nav-icon><v-icon>mdi-movie</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title>MovieDB</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Menu w górnej belce -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="menuItem in menuItems"
          :key="menuItem.title"
          :to="menuItem.url">
          {{ menuItem.title }}
        </v-btn>
      </v-toolbar-items>
      <v-btn
        icon
        @click="rightDrawerVisible = !rightDrawerVisible">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="rightDrawerVisible"
      right
      temporary
      fixed
      hide-overlay
      width="300"
    >
      <v-toolbar
        class="v-bar--underline"
        flat
      >
        <div
          class="text-h6 font-weight-medium text--primary">
          Ustawienia
        </div>
        <v-spacer />
        <IconButton icon="mdi-close" @click.stop="rightDrawerVisible = !rightDrawerVisible"></IconButton>
      </v-toolbar>
      <div class="mb-3 mx-n3">
        <v-divider />
      </div>

      <v-item-group class="px-2 font-weight-bold">
        Motyw aplikacji
        <v-col cols="12">
          <ThemeSettings></ThemeSettings>
        </v-col>
      </v-item-group>
    </v-navigation-drawer>

    <!-- Menu widoczne na telefonach -->
    <v-bottom-navigation
      app
      fixed
      grow
      color="primary"
      class="hidden-sm-and-up">
      <v-btn
        text
        v-for="menuItem in menuItems"
        :key="menuItem.title"
        :to="menuItem.url">
        {{ menuItem.title }}
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import ThemeSettings from '../components/settings/Theme'
import IconButton from '../components/buttons/IconButton'

export default {
  name: 'AppBar',
  components: {
    ThemeSettings,
    IconButton
  },
  data: () => ({
    menuItems: [
      { title: 'Baza filmów', url: '/', icon: 'mdi-movie' },
      { title: 'O projekcie', url: 'o-projekcie', icon: 'mdi-information' }
    ],
    rightDrawerVisible: false
  })
}
</script>

<style scoped>

</style>
