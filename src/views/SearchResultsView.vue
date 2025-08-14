<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h2>Search Results</h2>
    <p>From: {{ route.query.from }}</p>
    <p>Departing: {{ route.query.departing }}</p>
    <p>Returning: {{ route.query.returning }}</p>
    <p>Class: {{ route.query.travelClass }}</p>
    <p>Rooms: {{ route.query.rooms }}</p>
    <p>Adults: {{ route.query.adults }}</p>
    <p>Children: {{ route.query.children }}</p>
  </div>
</template>
