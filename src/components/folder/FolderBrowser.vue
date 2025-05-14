<script setup>

import { ref, unref, toRefs, toValue, computed, onMounted, onUnmounted } from 'vue'
import { 
  Menu, 
  MenuButton, 
  MenuItems, 
  MenuItem, 
} from '@headlessui/vue'

import { 
  actions as default_actions,
} from '../folder/FolderBrowserActions.js'

const props = defineProps({
  // The folder being browsed
  folder: {
    type: Object
  },
  // The content of the folder being browsed
  contents: {
    type: Array,
    default: []
  },
  selection: {
    type: Map,
    default: new Map()
  },
  view: {
    type: String,
    default: 'tabular'
  },
  actions: {
    type: Array,
    default: [
      {
        label: 'Publish',
        event: 'publish-content',
        icon: 'fa-solid fa-paper-plane',
        class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
        enabled: (...args) => {
          const content = args[0]
          return content.state.name.toLowerCase() !== 'published'
        }
      },
      {
        label: 'Unpublish',
        event: 'unpublish-content',
        icon: 'fa-solid fa-paper-plane fa-flip-horizontal',
        class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
        enabled: (...args) => {
          const content = args[0]
          return content.state.name.toLowerCase() !== 'draft'
        }
      },
      {
        label: 'Edit',
        event: 'edit-content',
        icon: 'fa-solid fa-pen-to-square',
        class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
        enabled: (...args) => true
      },
      {
        label: 'Move',
        event: 'move-content',
        icon: 'fa-solid fa-arrow-up-right-from-square',
        class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
        enabled: (...args) => true
      }, 
      {
        label: 'Delete',
        event: 'delete-content',
        icon: 'fa-solid fa-trash-can',
        class: (active) => active ? 'bg-red-700 text-white' : 'text-red-700',
        enabled: (...args) => true
      },
    ]
  },
  canSelect: {
    type: Boolean,
    default: true
  },
  canChangeWeight: {
    type: Boolean,
    default: false
  },
  addTypes: {
    type: Array,
    default: null
  },
  forceClick: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'browse', 'delete-content', 'select-content', 'move-content', 
  'edit-content', 'add-content', 'change-weight-content',
  'publish-content', 'unpublish-content',
  'move-selection',

])

const base = import.meta.env.VITE_BASE_BACKEND
const image_url = (id) => new URL(`${id}`, base)

const get_container = (node) => {
  let target = node
  const elem = toValue(props.view) == 'tabular' ? 'tr' : 'li'

  if (target.nodeType != Node.ELEMENT_NODE) {
    target = target.parentNode
  }

  return target.closest(elem)
}

// See https://github.com/tailwindlabs/headlessui/issues/1480
const issue1480 = (e) => {
  const el = e.target

  if (el instanceof HTMLElement && el.matches('a, button')) {
    el.click()
  }
}

if (props.forceClick) {
  onMounted(() => { 
    return document.addEventListener('click', issue1480, { capture: true })
  })

  onUnmounted(() => { 
    return document.removeEventListener('click', issue1480, { capture: true })
  })
}

const drag = (evt) => {
  console.debug('===> DRAG', evt)
}

const start = (content, evt) => {
  console.debug('===> START', evt)
  evt.target.classList.add('opacity-25', 'border-indigo-500', 'border')
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.setData('application/json', JSON.stringify(content))
}

const end = (evt) => {
  console.debug('===> END', evt)
  const tr = get_container(evt.target)
  tr.classList.remove('opacity-25', 'border-indigo-500', 'border')
}

const enter = (evt) => {
  console.debug('===> ENTER', evt)
  const tr = get_container(evt.target)
  tr.classList.add('border-lime-500', 'border')
  evt.preventDefault()
}

const leave = (evt) => {
  console.debug('===> LEAVE', evt)

  const tr = get_container(evt.target)
  tr.classList.remove('border-lime-500', 'border')
  evt.preventDefault()
}

const over = (evt) => {
  console.debug('===> OVER', evt)
  evt.preventDefault()
}

const drop = (evt) => {
  console.debug('===> DROP', evt)

  const tr = get_container(evt.target)
  tr.classList.remove('border-lime-500', 'border')

  const src = JSON.parse(evt.dataTransfer.getData('application/json'))
  const weight = parseInt(tr.getAttribute('data-weight'))

  emit('change-weight-content', src, weight)

  evt.preventDefault()
}

const stateClass = (state) => {
  return {
    'published': 'text-green-400 shadow-green-100',
    'draft': 'text-yellow-400 shadow-yellow-100',
    'private': 'text-red-400 shadow-red-100'
  }[state.name.toLowerCase()]
}

const formatDate = (d) => {
  return new Date(d).toLocaleString(
    navigator.language, { 
      dateStyle: "medium",
      timeStyle: "short"
    }
  )
}

</script>

<template>
  <div>
    <div class="flex flex-col" v-if="contents">

      <!--
################
# TABULAR VIEW #
################
-->

      <table class="table-auto w-full box-border border" v-if="view == 'tabular'">
        <thead>
          <tr class="text-left text-white bg-slate-500">
            <th class="p-2" v-if="canSelect"><input disabled type="checkbox" /></th>
            <th class="p-2">Title</th>
            <th class="p-2">Owner</th>
            <th class="p-2 text-center">State</th>
            <th class="p-2 text-center">Weight</th>
            <th class="p-2 whitespace-nowrap">Last update</th>
            <th class="p-2" v-if="actions"></th>
            <slot name="tabular-th" />
          </tr>
        </thead>
        <tbody>
          <tr v-if="folder.parent">
            <td colspan="12" class="py-2 tracking-widest">
              <font-awesome-icon class="fa-flip-horizontal drop-shadow-lg inline-block mr-2 h-6 w-6" icon="fa-solid fa-arrow-turn-up" />
              <button @click="$emit('browse', folder.parent.id)"
                class="underline cursor-pointer px-2 decoration-slate-400 decoration-dotted underline-offset-4">...</button>
            </td>
          </tr>
          <tr 
            v-for="content in contents" 
            :key="content.id" 
            :draggable="canChangeWeight"
            @drag="drag"
            @dragstart="start(content, $event)"
            @dragend="end"
            @dragleave="leave"
            @dragenter="enter"
            @dragover="over"
            @drop="drop"
            :data-id="content.id"
            :data-weight="content.weight"
            :class="['odd:bg-white even:bg-slate-50 text-slate-600',
              canChangeWeight ? 'cursor-move' : '']"
          >

            <!-- SELECT CHECKBOX -->

            <td class="pl-2 w-0" v-if="canSelect"><input
              :checked="selection.has(content.id)"
              @click="$emit('select-content', content, $event.target.checked)" type="checkbox" /></td>

            <!-- TITLE -->

            <td class="p-2 whitespace-nowrap truncate max-w-md">
              <font-awesome-icon class="drop-shadow-lg inline-block align-middle mr-2 h-8 w-8" :icon="['fas', content.fa_icon]" />
              <button @click="$emit('browse', content.id)" v-if="content.type.name=='folder'" class="underline decoration-slate-400 decoration-dotted underline-offset-4">{{ content.title }}</button>
              <RouterLink v-else :to="{name: 'show-content', params: {id:
                content.id}}">{{ content.title }}</RouterLink>
            </td>

            <!-- OWNER -->

            <td class="p-2 text-xs whitespace-nowrap">
              <img :src="content.owner.gravatar" class="mr-2 h-10 w-10 inline rounded-full shadow-md" />
              <span>{{ content.owner.full_name }}</span>
            </td>

            <!-- STATE -->

            <td class="text-center">
              <font-awesome-icon :class="stateClass(content.state)"
                class="inline-block drop-shadow-sm align-middle mr-2" icon="fa-solid fa-circle" />
              <span class="text-xs">{{ content.state.name }}</span>
            </td>

            <!-- WEIGHT -->

            <td class="text-center text-xs text-slate-500">
              <span>{{ content.weight }}</span>
            </td>

            <!-- LAST UPDATE -->

            <td class="p-2 w-0 text-center text-xs whitespace-nowrap">
              {{ formatDate(content.last_update) }}
            </td>

            <!-- ACTIONS -->

            <td class="p-2 w-0" v-if="actions">
              <Menu as="div" class="text-left">
                <div>
                  <MenuButton class="rounded-sm inline-flex w-content justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    actions
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems class="z-10 w-max absolute right-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                    <div>
                      <template v-for="action in actions">
                        <MenuItem v-if="action.enabled(content)" v-slot="{ active }">
                        <button @click="$emit(action.event, content)" :class="action.class(active)" class="group flex w-full items-center rounded-md px-2 py-2 text-xs">
                          <font-awesome-icon class="h-4 w-4" :icon="action.icon"  /> {{ action.label }}
                        </button>
                        </MenuItem>
                      </template>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>

            <slot name="tabular-td" :content="content" :emit="$emit" />
          </tr>
        </tbody>
      </table>

      <!--
################
# GALLERY VIEW #
################
-->

      <div v-if="view == 'gallery'" class="w-fit">

        <ul class="flex flex-wrap text-slate-600 flex-row justify-start gap-8">

          <li 
            v-for="content in contents" 
            :key="content.id"
            :draggable="canChangeWeight"
            @drag="drag"
            @dragstart="start(content, $event)"
            @dragend="end"
            @dragleave="leave"
            @dragenter="enter"
            @dragover="over"
            @drop="drop"
            :data-id="content.id"
            :data-weight="content.weight"
            :class="[canChangeWeight ? 'cursor-move' : '']"
            class="relative"
          >

            <input v-if="canSelect" :checked="selection.has(content.id)"
              @click="$emit('select-content', content, $event.target.checked)" type="checkbox" class="absolute border-slate-300 top-1 left-1" />

            <font-awesome-icon :class="stateClass(content.state)"
              class="absolute right-1 top-0.5 h-4 w-4 drop-shadow-sm" icon="fa-solid fa-circle" />

            <div class="flex flex-col h-32 w-32 overflow-scroll mb-1 border">

              <!-- NOT FOLDER -->

              <template v-if="content.type.name != 'folder'">
                <div class="flex flex-col items-center">
                  <img :src="image_url(content.id)" v-if="content.type.name == 'file' &&
                    content.mime.major.name == 'image'" />
                  <font-awesome-icon v-else class="h-16 w-16 block" :icon="['fa-solid', content.type.icons['fa']]" />
                  <slot name="gallery-not_folder" :content="content" :emit="$emit"/>
                  <span class="text-center m-5 mt-1 leading-5">{{ content.title }}</span>
                </div>
              </template>

              <!-- FOLDER -->

              <template v-if="content.type.name == 'folder'">
                <button @click="$emit('browse', content.id)" class="flex flex-col items-center">
                  <font-awesome-icon class="h-16 w-16 block" :icon="['fa-solid', content.type.icons['fa']]" />
                  <slot name="gallery-folder" :content="content" :emit="$emit"/>
                  <span class="text-center">{{ content.title }}</span>
                </button>
              </template>

            </div>

            <template v-if="actions">
              <div class="text-right">
                <Menu as="div" class="relative text-left">
                  <div>
                    <MenuButton class="inline-flex w-full justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      actions
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-out"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                      <div>
                        <template v-for="action in actions">
                          <MenuItem v-if="action.enabled(content)" v-slot="{ active }">
                          <button @click="$emit(action.event, content)" :class="action.class(active)" class="group flex w-full items-center rounded-md px-2 py-2 text-xs">
                            <font-awesome-icon class="h-4 w-4" :icon="action.icon"  /> {{ action.label }}
                          </button>
                          </MenuItem>
                        </template>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </template>

          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

