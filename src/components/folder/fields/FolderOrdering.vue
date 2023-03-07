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
      <tr v-for="order in orders.orders" 
        :key="order.key"
        class="cursor-move odd:bg-white even:bg-slate-50 text-slate-600"
      >
        <td>
          <input type="checkbox" v-model="order.checked" />
          {{ order.doc }} ({{ order.cls }} {{ order.prop }})
        </td>
        <td>
          <select v-model="order.direction">
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </td>
        <td>
          <select v-model="order.nulls">
            <option value="first">first</option>
            <option value="last">last</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script setup>

import { ref, watch, computed } from 'vue'
import { useFolder } from '@/composables/folders.js'

const { getOrders, folder } = useFolder()

const props = defineProps({
  polymorphic_children: {
    type: Array
  },
  polymorphic_loading : {
    type: Boolean
  }
})

const emit = defineEmits([
  'update:default_order'
])

const orders = ref([])

const selected = computed(() => {
  return orders.value.orders.filter(
    item => item.checked
  )
})

watch(() => orders, () => {
  emit(
    'update:default_order', 
    selected.value.map(v => {
      return {
        key: v.key,
        nulls: v.nulls,
        direction: v.direction
      }
    }))
}, { deep: true })

watch(
  [() => props.polymorphic_children, () => props.polymorphic_loading], 
  async () => {
    orders.value = await getOrders(folder.value.id, {
      pl: props.polymorphic_loading,
      pc: props.polymorphic_children.map(x => x.id)
    })

    if (folder.value.default_order) {
      folder.value.default_order.forEach((i, idx) => {
        for (const [idx2, o] of orders.value.orders.entries()) {
          if (i.key === o.key) {
            o.nulls = i.nulls
            o.direction = i.direction
            o.checked = true

            orders.value.orders.splice(
              idx, 0, orders.value.orders.splice(idx2, 1)[0]
            )

            break;
          }
        }
      })
    }
  }, 
  { immediate: true }
)

</script>
