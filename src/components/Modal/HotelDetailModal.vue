<script setup>
import { onMounted, onUnmounted, ref, nextTick, Transition } from 'vue'
import BookFlightHotelForm from '@/components/BookFlightHotelSearchForm.vue'

defineProps({
  hotel: Object,
  onClose: Function,
})

const emit = defineEmits(['close'])
const playingVideoIndex = ref(null)
const isOverviewExpanded = ref(false) //check  if the overview is expanded
const overviewRef = ref(null) // reference to the overview element
const showShowMoreButton = ref(false)

function playVideo(index) {
  playingVideoIndex.value = index
}

let observer

onMounted(() => {
  const prevOverflow = document.body.style.overflow
  document.body.dataset.prevOverflow = prevOverflow

  document.body.style.overflow = 'hidden'

  observer = new ResizeObserver(() => {
    if (overviewRef.value) {
      showShowMoreButton.value = overviewRef.value.scrollHeight > overviewRef.value.clientHeight
    }
  })
  if (overviewRef.value) observer.observe(overviewRef.value)
})

onUnmounted(() => {
  document.body.style.overflow = document.body.dataset.prevOverflow || ''

  if (observer) observer.disconnect()
  document.body.style.overflow = document.body.dataset.prevOverflow || ''
})

// amenity icon mapping
const amenityIcons = {
  Restaurant: '/src/assets/img/icons/restaurantIcon.svg',
  Wifi: '/src/assets/img/icons/wifiIcon.svg',
  OutdoorPool: '/src/assets/img/icons/outdoorpoolIcon.svg',
  RoomService: '/src/assets/img/icons/roomserviceIcon.svg',
  Nonsmoking: '/src/assets/img/icons/nonSmokingIcon.svg',
  Gym: '/src/assets/img/icons/gymIcon.svg',
  MeetingRoom: '/src/assets/img/icons/meetingRoomIcon.svg',
  BarLounge: '/src/assets/img/icons/barIcon.svg',
  Security: '/src/assets/img/icons/securityIcon.svg',
  Garden: '/src/assets/img/icons/gardenIcon.svg',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="nested" appear>
      <div class="modal-backdrop" v-if="hotel" @click.self="emit('close')">
        <div class="modal">
          <button class="close-btn" @click="emit('close')">✕</button>

          <!-- Gallery Section -->
          <div class="gallery-container">
            <div class="gallery-flex">
              <div class="gallery-main">
                <img :src="hotel.thumbnail" alt="Thumbnail" />
              </div>

              <div class="gallery-side">
                <div v-for="(item, i) in hotel.gallery.slice(0, 4)" :key="i" class="gallery-item">
                  <template v-if="item.type === 'video'">
                    <div v-if="playingVideoIndex !== i" class="video-preview" @click="playVideo(i)">
                      <video :src="item.src" muted playsinline preload="metadata"></video>
                      <div class="video-overlay"></div>
                      <font-awesome-icon icon="fa-regular fa-circle-play" class="play-icon" />
                    </div>

                    <video v-else :src="item.src" controls autoplay playsinline></video>
                  </template>
                  <img v-else :src="item.src" alt="Gallery image" />
                </div>
              </div>
            </div>
          </div>

          <!-- Hotel Main Info -->
          <div class="card-section hotel-info">
            <img :src="hotel.logo" alt="Hotel Logo" class="hotel-logo" />
            <div class="hotel-text-info">
              <h2>{{ hotel.name }}</h2>
              <p>{{ hotel.address }}</p>
              <div class="rating">
                <span v-for="n in 5" :key="n" class="star">{{
                  n <= hotel.rating ? '★' : '☆'
                }}</span>
              </div>
            </div>
          </div>

          <!-- Amenities section -->
          <div class="hotel-amenities">
            <div class="amenities-card" v-for="amenity in hotel.amenities" :key="amenity.name">
              <img
                v-if="amenityIcons[amenity.replace(/[\s/-]+/g, '')]"
                :src="amenityIcons[amenity.replace(/[\s/-]+/g, '')]"
                :alt="amenity"
                class="amenity-icon"
              />
              <span>{{ amenity }}</span>
            </div>
          </div>

          <div class="hotel-highlight">
            <h3>Highlights</h3>
            <div class="highlight-card">
              <p>
                {{ hotel.highlights }}
              </p>
            </div>
          </div>

          <!-- <div class="hotel-overview">
          <h3>Overview</h3>
          <p v-for="(paragraph, i) in hotel.overview.split('\n')" :key="i">
            {{ paragraph }}
          </p>
        </div> -->
          <div class="hotel-overview">
            <h3>Overview</h3>
            <div class="overview-container">
              <div class="overview-text">
                <div
                  ref="overviewRef"
                  :class="['overview-content', { expanded: isOverviewExpanded }]"
                >
                  <p v-for="(paragraph, i) in hotel.overview.split('\n')" :key="i">
                    {{ paragraph }}
                    <br />
                  </p>
                </div>
                <button
                  v-if="showShowMoreButton || isOverviewExpanded"
                  @click="isOverviewExpanded = !isOverviewExpanded"
                  class="show-more-btn"
                >
                  {{ isOverviewExpanded ? 'Show Less' : 'Show More' }}
                </button>
              </div>

              <div class="hotel-map">
                <img src="@/assets/img/mapImage.png" alt="Hotel Map" />
                <a :href="hotel.mapUrl" target="_blank" rel="noopener noreferrer">
                  <button class="show-map-btn">Show On Map</button>
                </a>
              </div>
            </div>
          </div>
          <hr />

          <!-- Gift section -->
          <div class="hotel-gift-container">
            <h3>Great Gifts (Pick 1 of 6)</h3>
            <div class="hotel-gift">
              <div class="gift-card" v-for="gift in hotel.gifts" :key="gift.id">
                <img alt="Gift icons" class="gift-icon" src="@/assets/img/icons/giftIcon.svg" />
                <span>{{ gift }}</span>
              </div>
            </div>
          </div>
          <hr />

          <!-- Book flight + hotel form -->
          <div class="book-flight-hotel-form">
            <h3>Book Your Flight + Hotel Together</h3>
            <BookFlightHotelForm />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal h3 {
  font-size: 20px;
  font-weight: 500;
}

/* Modal CSS */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
}
.modal {
  background: white;
  position: relative;
  /* max-width: 80%; */
  max-width: 1170px;
  min-height: 100vh;
  padding: 50px 30px;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 30px;
  color: #232936;
}

/* Gallery Section */
.gallery-container {
  width: 100%;
}

.gallery-flex {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  height: 378px;
  border-radius: 6px;
  overflow: hidden;
}

.gallery-main {
  grid-row: 1 / 3;
  grid-column: 1;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

.gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-main:hover img {
  transform: scale(1.05);
}

.gallery-side {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-item img,
.gallery-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.video-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 51px;
  color: white;
  text-shadow: 0 0 10px black;
  pointer-events: none;
  z-index: 2;
}

.video-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hotel Main info section */
.hotel-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 16px;
}

.hotel-info {
  min-height: 130px;
}

.hotel-logo {
  width: 60px;
  height: 60px;
}

.rating .star {
  color: #f1b235;
  font-size: 20px;
}

.hotel-info p {
  margin: 0;
}

/* Amenities section */
.hotel-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.amenities-card {
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  width: 172px;
  height: 60px;
  align-items: center;
  display: flex;
  gap: 10px;
  padding: 0 12px;
}

.amenity-icon {
  width: 35px;
  height: 35px;
}

/* Highlight Section */

.highlight-card {
  background: #e0e4ea;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  padding: 0 20px;
}

/* Hotel Overview Section */
.hotel-highlight,
.hotel-overview {
  margin-top: 30px;
}

.hotel-overview p {
  font-size: 14px;
  margin: 0;
}

.overview-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hotel-map {
  position: relative;
  width: 100%;
  max-width: 253px;
  height: 200px;
  overflow: hidden;
  border-radius: 6px;
}
.hotel-map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.5);
}
.show-map-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background-color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.overview-text {
  flex: 1;
  max-width: 80%;
  min-width: 420px;
}

.overview-content {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.overview-content.expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}

.show-more-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  margin-top: 8px;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.read-more-btn:hover {
  color: #0056b3;
}

.read-more-btn:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

hr {
  border: none;
  border-top: 1px solid #c7cdd7;
  width: 100%;
  margin: 30px 0;
}

/* Gift section  */
.hotel-gift {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: space-between;
  border: 1px solid #c7cdd7;
  border-radius: 6px;
  padding: 20px;
}

@media (max-width: 768px) {
  .hotel-gift {
    grid-template-columns: 1fr;
  }
}

.gift-card {
  flex: 0 0 50%;
  align-items: center;
  display: flex;
  gap: 10px;
}

.gift-icon {
  width: 25px;
  height: 25px;
}

/* Transition */
/* OUTER (Backdrop) */
.nested-enter-active,
.nested-leave-active {
  transition: opacity 0.3s ease;
}

.nested-leave-active {
  transition-delay: 0.45s;
}
.nested-enter-from,
.nested-leave-to {
  opacity: 0;
}

/* INNER (Modal) */
.nested-enter-active .modal,
.nested-leave-active .modal {
  transition: transform 0.45s ease;
}
.nested-enter-from .modal,
.nested-leave-to .modal {
  transform: translateY(100%);
}
</style>
