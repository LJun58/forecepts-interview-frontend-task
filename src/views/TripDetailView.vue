<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { trips } from '@/data/trips'
import TripCard from '@/components/TripCard.vue'
import HotelSelection from '@/components/HotelSelection.vue'
import RulesCondition from '@/components/RulesCondition.vue'

const route = useRoute()
const tripId = route.params.tripId

const trip = computed(() => trips.find((t) => t.id === tripId))
</script>

<template>
  <div v-if="trip">
    <RouterLink to="/">&#8592; Back to Selection</RouterLink>
    <TripCard :trip="trip" />
    <HotelSelection />
    <RulesCondition />
  </div>
  <div v-else>
    <p>Trip not found.</p>
  </div>
</template>
