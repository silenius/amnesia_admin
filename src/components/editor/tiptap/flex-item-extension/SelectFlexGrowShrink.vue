<template>

 <div class="relative max-w-sm">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        class="font-bold border rounded-full p-2 w-full"
      >
        {{ flex }}
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          v-slot="{ close }"
          class="absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div class="relative flex flex-col gap-8 bg-white p-7">
              <button v-for="opt in opts"
                @click="flex=opt.value; close()"
                :class="opt.value == flex ? 'bg-lime-300' : ''"
                class="-m-3 flex rounded-lg p-2 transition hover:bg-lime-300 duration-150 ease-in-out">
                <div class="flex h-10 w-10 shrink-0 text-white sm:h-12 sm:w-12" >
                  <div v-if="flex==opt.value">
                    <font-awesome-icon class="h-full w-full" icon="fa-solid fa-circle-check" />
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-left text-gray-900"> {{ opt.name }} </p>
                  <p class="text-sm text-gray-500"> {{ opt.desc }} </p>
                </div>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div> 
  <!--
  <Listbox as="div" v-model="flex">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ flex }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in flexs" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'null'}}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
-->
</template>

<script setup>
import { computed } from 'vue'

import {
  Popover, 
  PopoverButton, 
  PopoverPanel
} from '@headlessui/vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits([
  'select-flex-grow-shrink'
])

const opts = [
  {
    name: 'flex-initial',
    desc: 'Use flex-initial to allow a flex item to shrink but not grow, taking into account its initial size',
    value: 'initial'
  },
  {
    name: 'flex-1',
    desc: 'Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size',
    value: '1'
  },
  {
    name: 'flex-auto',
    desc: 'Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size',
    value: 'auto'
  },
  {
    name: 'flex-none',
    desc: 'Use flex-none to prevent a flex item from growing or shrinking',
    value: 'none'
  },
]

const attrs = computed(() => props.editor.getAttributes('flexItem'))

const flex = computed({

  get() {
    try {
      return attrs.value.flex.find(
        (x) => x.breakpoint == props.breakpoint
      ).flex
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-flex-grow-shrink', {
      flex: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
