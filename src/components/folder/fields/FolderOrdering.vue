<template>
  <table class="border-collapse table-fixed">
    <thead>
      <tr class="text-left">
        <th class="p-2">Field</th>
        <th class="p-2">Direction</th>
        <th class="p-2">Nulls</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders.orders">
        <td>
          {{ order }}
          <input type="checkbox" /> {{ order.checked }}
          {{ order.doc }} ({{ order.cls }} {{ order.prop }})
        </td>
        <td>{{ order.direction }}</td>
        <td>{{ order.nulls }}</td>
      </tr>
    </tbody>
  </table>
</template>


<script setup>

import { ref, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'

const { getOrders, folder } = useFolder()

const props = defineProps({
  polymorphic_children: {
    type: Array
  }
})

const orders = ref([])

watch(() => props.polymorphic_children, async (v) => {
  orders.value = await getOrders(folder.value.id, {
    pl: true
  })

  console.log(orders)
})


</script>
