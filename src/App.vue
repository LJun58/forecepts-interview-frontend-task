<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: Inter, sans-serif;
}

.main-content {
  padding: 30px 8%;
}
</style>
