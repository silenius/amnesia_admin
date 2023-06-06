<template>
  <div class="relative w-full">
    <label>
      <p>Address</p>
      <Combobox v-model="selected">

        <div class="relative mt-1">
          <div
            class="flex w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              @change="query = $event.target.value"
            />
            <button @click.prevent="reset" class="bg-red-400 text-white p-2 hover:bg-red-600 rounded">Reset</button>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="addresses_matches.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="c in addresses_matches"
                as="template"
                :key="c.place_id"
                :value="c"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                  >
                    {{ c.display_name }}
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </label>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { useCountry } from '@/composables/country.js'
import { debounce } from '@/services/utils.js'

const { geocodeQuery } = useCountry()

const props = defineProps({
  address: {
    type: String,
    default: ''
  },
  address_latitude: {
    type: Number,
    default: null
  },
  address_longitude: {
    type: Number,
    default: null
  },
  country: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits([
  'update:address',
  'update:address_latitude',
  'update:address_longitude'
])

const query = ref('')
const addresses_matches = ref([])

const selected = computed({

  get() {
    return props.address
  },

  set(value) {
    if (value) {
      emit('update:address', value.display_name)
      emit('update:address_latitude', parseFloat(value.lat))
      emit('update:address_longitude', parseFloat(value.lon))
    } else {
      emit('update:address', null)
      emit('update:address_latitude', null)
      emit('update:address_longitude', null)
    }
  }

})

const reset = () => selected.value = null;

const search = async () => {
  if (query.value !== '') {
    const data = await geocodeQuery(query.value, props.country.iso)
    addresses_matches.value = data
  } else {
    addresses_matches.value = []
  }
}

watch(() => props.country, () => reset())
watch(query, debounce(search, 500))

</script>
