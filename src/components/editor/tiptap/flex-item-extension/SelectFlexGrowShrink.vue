<template>

 <div class="relative max-w-sm px-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? 'text-white' : 'text-white/90'"
        class="group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span>Solutions</span>
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
          class="absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div class="relative flex flex-col gap-8 bg-white p-7">
              <a v-for="opt in opts"
                href="#"
                class="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                <div class="flex h-10 w-10 shrink-0 text-white sm:h-12 sm:w-12" >
                  <div>icon</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-left text-gray-900"> {{ opt.name }} </p>
                  <p class="text-sm text-gray-500"> {{ opt.desc }} </p>
                </div>
              </a>
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
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
  Popover, PopoverButton, PopoverPanel
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

const button_cls = 'border p-2 hover:cursor-hand w-full bg-slate-800 hover:bg-slate-900'


const opts = [
  {
    name: 'flex-initial',
    desc: 'Use flex-initial to allow a flex item to shrink but not grow, taking into account its initial size',
  },
  {
    name: 'flex-1',
    desc: 'Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size',
  },
  {
    name: 'flex-auto',
    desc: 'Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size',
  },
  {
    name: 'flex-none',
    desc: 'Use flex-none to prevent a flex item from growing or shrinking',
  },
]


const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const flexs = computed(
  () => props.extension.options.flexs.toSpliced(0, 0, undefined)
)

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
