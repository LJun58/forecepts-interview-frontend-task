<script setup>
import { ref, computed } from 'vue'
import { hotels } from '@/data/hotels'
import { hotelDetails } from '@/data/hotelDetails'
import HotelModal from '@/components/Modal/HotelDetailModal.vue'

const destinations = [...new Set(hotels.map((h) => h.city))]
const selectedDestination = ref(destinations[0])

// Keep track of which hotel is selected
const selectedHotelId = ref(null)
// Track if modal is open
const isModalOpen = ref(false)

const selectedHotel = computed(() => {
  if (!selectedHotelId.value) return null
  return {
    ...hotels.find((h) => h.id === selectedHotelId.value),
    ...hotelDetails[selectedHotelId.value],
  }
})

const filteredHotels = computed(() =>
  hotels.filter((hotel) => hotel.city === selectedDestination.value),
)

function formatPrice(value) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
  }).format(value)
}

function openHotelDetailModal(id) {
  selectedHotelId.value = id
  isModalOpen.value = true
}

function closeHotelDetailModal() {
  isModalOpen.value = false

  setTimeout(() => {
    selectedHotelId.value = null
  }, 450)
}
</script>

<template>
  <div class="hotel-selection">
    <div class="destination-buttons">
      <button
        v-for="dest in destinations"
        :key="dest"
        @click="selectedDestination = dest"
        :class="{ active: selectedDestination === dest }"
      >
        {{ dest }}
      </button>
    </div>

    <div class="hotel-grid">
      <div class="hotel-card" v-for="hotel in filteredHotels" :key="hotel.id">
        <!-- Image -->
        <div class="card-section">
          <img :src="hotel.thumbnail" alt="Hotel Image" class="hotel-image" />
        </div>

        <div class="card-content">
          <!-- Hotel info -->
          <div class="card-section hotel-info">
            <img :src="hotel.logo" alt="Hotel Logo" class="hotel-logo" />
            <div class="hotel-text-info">
              <h3>{{ hotel.name }}</h3>
              <div class="rating">
                <span v-for="n in 5" :key="n" class="star">{{
                  n <= hotel.rating ? '★' : '☆'
                }}</span>
              </div>
              <p>{{ hotel.address }}</p>
              <a
                v-if="hotel.mapUrl"
                :href="hotel.mapUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="see-map-link"
              >
                See Map
              </a>
            </div>
          </div>

          <!-- vicinity -->
          <div class="card-section vicinity-info">
            <hr />
            <p class="vicinity-text">
              <font-awesome-icon icon="fa-solid fa-circle-info" /> Vicinity: Beach front, F&B,
              Entertainment, Shopping
            </p>
          </div>
          <hr />

          <!-- gift -->
          <div class="card-section gift-info">
            <img alt="Gift icons" class="gift-icon" src="@/assets/img/icons/giftIcon.svg" />
            <div class="gift-text-info">
              <p>
                <span><strong>1 of 6 Great Gifts</strong></span
                >(Valued at SDG100)
              </p>
            </div>
          </div>
          <hr />

          <!-- price -->
          <div class="card-section price-info">
            <p class="left-label">Flight + Hotel</p>
            <div class="right-price">
              <p class="price">
                <strong>{{ formatPrice(hotel.price) }}</strong>
              </p>
              <p>Includes taxes & charges</p>
            </div>
          </div>

          <!-- action button -->
          <div class="card-section action-btn">
            <button class="deal-btn" @click="openHotelDetailModal(hotel.id)">
              Choose this Deal
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <HotelModal
      v-if="selectedHotel"
      :hotel="isModalOpen ? selectedHotel : null"
      @close="closeHotelDetailModal"
    />
  </div>
</template>

<style scoped>
hr {
  border: none;
  border-top: 1px dashed #c7cdd7;
  width: 100%;
}

.hotel-selection {
  margin-top: 30px;
}

.destination-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
}

.destination-buttons button {
  font-size: 18px;
  height: 44px;
  padding: 8px 16px;
  border: 1px solid #e0e4ea;
  background: #e0e4ea;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;
  flex: 1 1 auto;
}

.destination-buttons button.active {
  background-color: #012a72;
  color: white;
  border-color: #012a72;
}

.hotel-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.hotel-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 377px;
  overflow: hidden;
  transition: transform 0.2s;
}

.hotel-logo {
  width: 55px;
  height: 55px;
}

.card-section {
  display: flex;
  flex-direction: column;
}

.card-content {
  padding: 40px;
  padding-top: 20px;
}

.hotel-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.hotel-info,
.gift-info,
.price-info {
  display: flex;
  flex-direction: row;

  flex: 1;
  gap: 12px;
}

.hotel-info {
  min-height: 180px;
}

.hotel-card p,
.hotel-card h3 {
  margin: 0;
}

.price-info {
  justify-content: space-between;
}

.price-info .left-label {
  color: #127d00;
  font-weight: bold;
  font-size: 14px;
}

.right-price {
  text-align: right;
}

.rating {
  margin-bottom: 10px;
}

.rating .star {
  color: #f1b235;
  font-size: 20px;
}

.gift-info {
  align-items: center;
}

.gift-icon {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}

.gift-info span {
  display: block;
}

.price {
  font-size: 22px;
  font-weight: bold;
  color: #111;
}

.price small {
  font-weight: normal;
  font-size: 12px;
  color: #666;
}

.action-btn,
.price-info {
  margin-top: 20px;
}

.deal-btn {
  background-color: #0057ff;
  color: white;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: auto;
  transition: background-color 0.2s;
}

.deal-btn:hover {
  background-color: #0041c4;
}

.vicinity-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 900px) {
  .hotel-card {
    flex: 1 1 100%;
  }
  .destination-buttons button {
    flex: 1 1 100%;
  }
}
</style>
