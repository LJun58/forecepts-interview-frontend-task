<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <img alt="Equator logo" class="logo" src="@/assets/img/logo/Equator logo-black 1.svg" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style>
.header {
  background-color: #012a72;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  top: 0;
}

nav {
  display: flex;
  gap: 20px;
}
nav a {
  text-decoration: none;
  color: white;
  font-weight: 500;
}
nav a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
