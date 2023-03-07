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
        :draggable="order.checked"
        :class="{ 'cursor-move': order.checked }"
        @drag="drag"
        @dragstart="start"
        @dragend="end"
        @dragleave="leave"
        @dragenter="enter"
        @dragover="over"
        @drop="drop"
        class="odd:bg-white even:bg-slate-50 text-slate-600"
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

const get_tr = (node) => {
  let target = node

  if (target.nodeType != Node.ELEMENT_NODE) {
    target = target.parentNode
  }

  return target.closest('tr')
}

const drag = (evt) => {
  console.debug('===> DRAG', evt)
}

const start = (evt) => {
  console.debug('===> START', evt)
  evt.target.classList.add('opacity-25', 'border-indigo-500', 'border')
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.setData('text/plain', evt.target.rowIndex)
}

const end = (evt) => {
  console.debug('===> END', evt)
  const tr = get_tr(evt.target)
  tr.classList.remove('opacity-25', 'border-indigo-500', 'border')
}

const enter = (evt) => {
  console.debug('===> ENTER', evt)
  evt.preventDefault()
}

const leave = (evt) => {
  console.debug('===> LEAVE', evt)

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')
}

const over = (evt) => {
  console.debug('===> OVER', evt)
  evt.preventDefault()

  const tr = get_tr(evt.target)
  tr.classList.add('border-lime-500', 'border')
}

const drop = (evt) => {
  console.debug('===> DROP', evt)

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')

  const from = parseInt(evt.dataTransfer.getData('text/plain')) - 1
  const to = parseInt(tr.rowIndex) - 1

  orders.value.orders.splice(
    to, 0, orders.value.orders.splice(from, 1)[0]
  )

  evt.preventDefault()
}

</script>
