<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { trips } from '@/data/trips'
import TripCard from '@/components/TripCard.vue'
import HotelSelection from '@/components/HotelSelection.vue'
import RulesCondition from '@/components/RulesCondition.vue'

const route = useRoute()
const tripId = route.params.tripId

const trip = computed(() => trips.find((t) => t.id === tripId))

const showButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const checkScroll = () => {
  showButton.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <div v-if="trip">
    <RouterLink style="text-decoration: none; color: inherit" to="/"
      ><p class="back-link">&#8592; Back to Selection</p></RouterLink
    >
    <TripCard :trip="trip" />
    <HotelSelection />
    <RulesCondition />
    <button v-show="showButton" @click="scrollToTop" class="scroll-top-btn">
      <font-awesome-icon icon="fa-solid fa-arrow-up" />
    </button>
  </div>
  <div v-else>
    <p>Trip not found.</p>
  </div>
</template>

<style scoped>
.back-link {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  font-size: 25px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.scroll-top-btn:hover {
  background: #f0f0f0;
}
</style>
