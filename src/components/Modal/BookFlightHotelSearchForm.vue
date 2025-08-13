<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const from = ref('Kuala Lumpur')
const departing = ref('2025-05-07')
const returning = ref('2025-05-12')
const travelClass = ref('Economy')
const rooms = ref(1)
const adults = ref(1)
const children = ref(0)
const showTravellerDropdown = ref(false)
//hidden date pickers
const departingPicker = ref(null)
const returningPicker = ref(null)
const dropdownRef = ref(null)

const travellersLabel = computed(() => {
  return `${adults.value} Adult${adults.value > 1 ? 's' : ''}${children.value > 0 ? `, ${children.value} Child${children.value > 1 ? 'ren' : ''}` : ''}`
})

// date formatting
function formatDate(dateValue) {
  if (!dateValue) return ''
  return new Date(dateValue).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const formattedDeparting = computed(() => formatDate(departing.value))
const formattedReturning = computed(() => formatDate(returning.value))

// close the dropdown when click outside
function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showTravellerDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function search() {
  console.log({
    from: from.value,
    departing: departing.value,
    returning: returning.value,
    travelClass: travelClass.value,
    adults: adults.value,
    children: children.value,
    rooms: rooms.value,
  })
}

function openDepartingPicker() {
  departingPicker.value?.showPicker()
}
function openReturningPicker() {
  returningPicker.value?.showPicker()
}
</script>

<template>
  <div class="booking-form">
    <!-- Departure from selection -->
    <div class="form-group depart-selection">
      <label>From</label>
      <select v-model="from">
        <option>Kuala Lumpur</option>
        <option>Singapore</option>
      </select>
    </div>

    <div class="form-group date-picker">
      <label>Departing</label>
      <input type="date" v-model="departing" ref="departingPicker" class="hidden-date-input" />
      <div class="formatted-date" @click="openDepartingPicker">
        {{ formattedDeparting || 'Click to select a date' }}
      </div>
    </div>

    <div class="form-group date-picker">
      <label>Returning</label>
      <input
        type="date"
        v-model="returning"
        ref="returningPicker"
        class="hidden-date-input"
        :min="departing"
      />
      <div class="formatted-date" @click="openReturningPicker">
        {{ formattedReturning || 'Click to select a date' }}
      </div>
    </div>

    <!-- Class selection -->
    <div class="form-group class-selection">
      <label>Class</label>
      <select v-model="travelClass">
        <option>Economy</option>
        <option>Business</option>
        <option>First Class</option>
      </select>
    </div>

    <!-- Travellers selection -->
    <div class="form-group traveller-dropdown-wrapper" ref="dropdownRef">
      <label>Travellers</label>
      <div class="traveller-display" @click="showTravellerDropdown = !showTravellerDropdown">
        {{ travellersLabel }}
      </div>

      <div class="traveller-dropdown" v-if="showTravellerDropdown">
        <div class="traveller-control">
          <span>Adults</span>
          <button @click="adults > 1 && adults--">−</button>
          <span>{{ adults }}</span>
          <button @click="adults++">+</button>
        </div>
        <div class="traveller-control">
          <span>Children</span>
          <button @click="children > 0 && children--">−</button>
          <span>{{ children }}</span>
          <button @click="children++">+</button>
        </div>
      </div>
    </div>

    <!-- Room selection -->
    <div class="form-group room-selection">
      <label>Room</label>
      <div class="room-control">
        <span>{{ rooms }} Rooms</span>
        <div class="room-buttons">
          <button type="button" @click="rooms > 1 && rooms--">−</button>
          <span> | </span>
          <button type="button" @click="rooms++">+</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Action button -->
  <div class="action-btn">
    <button class="search-btn" @click="search">Search</button>
  </div>
</template>

<style scoped>
.booking-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-content: space-between;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .booking-form {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 20px;
}

label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 5px;
}

select,
.room-control,
.formatted-date,
.traveller-display {
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.room-control {
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: space-between;
  padding: 0;
}

.room-control button {
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.room-control button:hover {
  background-color: #f0f0f0;
}

.room-buttons span {
  color: #c7cdd7;
}

.traveller-dropdown-wrapper {
  position: relative;
}

.traveller-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.traveller-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
}

.traveller-control button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 18px;
  cursor: pointer;
}

.traveller-control button:hover {
  background-color: #f0f0f0;
}

/* Action button */
.action-btn {
  justify-self: center;
  margin-top: 25px;
}

.search-btn {
  background-color: #094ac1;
  color: white;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 280px;
  height: 55px;
  margin-top: auto;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #0033a6;
}

.hidden-date-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}
</style>
