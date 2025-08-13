<script setup>
import { ref } from 'vue'
import { rulesCondition } from '@/data/rulesCondition'

const rulesConditions = ref(rulesCondition)
</script>

<template>
  <section class="rules-and-conditions">
    <h3>Rules & Conditions</h3>
    <hr />
    <ul>
      <li v-for="(rule, index) in rulesConditions" :key="index">
        {{ rule }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.rules-and-conditions {
  margin: 50px 0;
}
.rules-and-conditions hr {
  border: 1px solid #dddddd;
}

.rules-and-conditions h3 {
  font-size: 22px;
}

.rules-and-conditions li {
  font-size: 16px;
}
</style>
