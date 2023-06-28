<template>
  <div>
    <Listbox v-model="value" multiple by="id" v-if="polymorphic_loading">
      <div class="relative mt-1">
        <ListboxButton
          class="relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">
            {{ value.length > 0 ? value.map((t) => t.name).join(', ') : "ALL" }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <font-awesome-icon class="h-5 w-5 text-gray-400" icon="fa-solid fa-caret-down" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="t in types"
              :key="t.id"
              :value="t"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ t.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <font-awesome-icon class="h-5 w-5" icon="fa-solid fa-check" />

                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import { useContentTypes } from '@/composables/content_types.js'

const props = defineProps({
  polymorphic_children: {
    type: Array,
    default: []
  },
  polymorphic_loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:polymorphic_children'
])

const { getContentTypes } = useContentTypes()

const types = ref([])

onMounted( async () => {
  const { data } = await getContentTypes()
  types.value = data
})

watch(() => props.polymorphic_loading, (v) => {
  if (v === false) {
    value.value = []
  }
})

const value = computed({

  get() {
    return props.polymorphic_children
  },

  set(value) {
    emit('update:polymorphic_children', value)
  }

})

</script>
