<script setup>
import { ref } from 'vue'
const props = defineProps({
  trip: Object,
})

const currentImageIndex = ref(0)

function nextImage() {
  if (!props.trip) return
  currentImageIndex.value = (currentImageIndex.value + 1) % props.trip.images.length
}

function prevImage() {
  if (!props.trip) return
  currentImageIndex.value =
    (currentImageIndex.value - 1 + props.trip.images.length) % props.trip.images.length
}
</script>

<template>
  <div class="card">
    <div class="card-image">
      <div class="slider">
        <img :src="trip.images[currentImageIndex]" alt="Trip Image" class="slider-image" />
        <button class="prev" @click="prevImage">&#10094;</button>
        <button class="next" @click="nextImage">&#10095;</button>
      </div>
    </div>

    <div class="card-content">
      <h2>{{ trip.title }}</h2>
      <div class="info-section">
        <div class="card-info">
          <p><span>Departure: </span>{{ trip.departure }}</p>
          <p><span>Destination: </span>{{ trip.destination }}</p>
          <p><span>Airline: </span>{{ trip.airline }}</p>
        </div>
        <div class="airline-logo">
          <img :src="trip.airlineLogo" :alt="trip.airline" />
        </div>
      </div>

      <div class="dates-section">
        <div class="date-box">
          <p><span>Sales Date </span>{{ trip.salesDateFrom }} ~ {{ trip.salesDateTo }}</p>
        </div>
        <div class="date-box">
          <p>
            <span>Departure Date </span>{{ trip.departureDateFrom }} ~ {{ trip.departureDateTo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 28px;
  font-weight: 600;
}

p {
  font-size: 16px;
  font-weight: 600;
}

span {
  font-weight: 400;
}

.card {
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card-image {
  flex: 1;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  flex: 1.5;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.info-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}

.info-section p {
  margin-bottom: 0%;
}

.card-info {
  flex: 1;
  min-width: 250px;
}

.dates-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 20px;
  border-top: 1px solid #c7cdd7;
  border-bottom: 1px solid #c7cdd7;
}

.date-box span {
  display: block;
}

/* span {
  color: #666;
} */

.slider {
  position: relative;
  width: 100%;
  max-height: 364px;
  max-width: 620px;
  aspect-ratio: 4 / 3;
  margin: auto;
  overflow: hidden;
  border-radius: 12px;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #094ac1;
  border: 2px solid #094ac1;
  width: 42px;
  height: 42px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  /* z-index: 0; */
  background-color: #ffffff;
  /* transition: background-color 0.3s ease; */
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.prev:hover,
.next:hover {
  background-color: #e0e0e0;
}

@media (max-width: 900px) {
  .date-box {
    border-right: none;
    border-bottom: 1px solid #c7cdd7;
  }

  .date-box:last-child {
    border-bottom: none;
  }
  .card {
    flex-direction: column;
  }
}
</style>
