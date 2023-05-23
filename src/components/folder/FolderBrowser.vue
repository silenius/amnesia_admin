<script setup>

import { ref, computed, watch } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Avatar from "vue-boring-avatars";
import { 
  actions as default_actions,
  selectActions as select_actions
} from '@/components/folder/FolderBrowserActions.js'

const props = defineProps({
  contents: {
    type: Array,
    default: []
  },
  selected: {
    type: Map,
    default: new Map()
  },
  folder: {
    type: Object
  },
  view: {
    type: String,
    default: 'tabular'
  },
  actions: {
    type: Array,
    default: default_actions.slice()
  },
  selectActions : {
    type: Array,
    default: select_actions.slice()
  }
})

const emit = defineEmits([
  'browse', 'delete-content', 'select-content', 'edit-content',
  'delete-selection'
])

const base = import.meta.env.VITE_BASE_BACKEND
const image_url = (id) => new URL(`${id}/download`, base)

const view = ref(props.view)
const view_icon = computed(
  () => view.value == 'tabular' ? 'fa-image fa-regular' : 'fa-solid fa-list'
)

</script>

<template>

  <button @click.prevent="view = view == 'tabular' ? 'gallery' : 'tabular'">
    <font-awesome-icon class="h-6 w-6 align-middle text-gray-600" :icon="view_icon" />
  </button>

  <!-- TABULAR VIEW -->

  <div v-if="selectActions && selected.size > 0">

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton v-slot="{ open }" class="hover:bg-slate-300 bg-slate-200 px-4 py-1 font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {{ selected.size }} items selected
          <font-awesome-icon class="h-4 w-4 align-middle text-gray-600 inline" :icon="open ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'" />
        </MenuButton>

      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">

            <template v-for="action in selectActions">
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

  <table class="border-collapse table-fixed" v-if="view == 'tabular'">
    <thead>
      <tr class="text-left">
        <th class="p-2" v-if="selectActions"><input type="checkbox" /></th>
        <th class="p-2">Title</th>
        <th class="p-2">Description</th>
        <th class="p-2">Owner</th>
        <th class="p-2" v-if="actions">Actions</th>
        <slot name="tabular-th" />
      </tr>
    </thead>

    <tbody>
      <tr v-if="folder.container_id" class="text-slate-600">  
        <td colspan="10" class="p-2">
          <button @click="$emit('browse', folder.container_id)">
            <font-awesome-icon class="h-4 w-4 align-middle" icon="fa-solid
              fa-arrow-up-from-bracket p-4" /> back to {{ folder.parent.title }}</button>
        </td>
      </tr>
      <tr v-for="content in contents" :key="content.id" class="odd:bg-white even:bg-slate-50 text-slate-600">
        <td class="pr-6 pl-2" v-if="selectActions"><input :checked="selected.has(content.id)" @click="$emit('select-content', content, $event)" type="checkbox" /></td>
        <td class="whitespace-nowrap p-2">
          <font-awesome-icon class="h-8 w-8 mr-2 align-middle" :icon="['fa-solid', content.type.icons['fa']]" />
          <button @click="$emit('browse', content.id)"
            v-if="content.type.name=='folder'" class="underline
            decoration-slate-400 decoration-dotted underline-offset-4">{{ content.title }}</button>
          <template v-if="content.type.name!='folder'">{{ content.title }}</template>
        </td>
        <td class="p-2">
          {{ content.description }}
        </td>
        <td class="p-2 whitespace-nowrap">
          <div class="grid grid-flow-col w-fit gap-2">
            <Avatar :size="24" :name="content.owner.full_name" variant="bauhaus" />
            <span class="flex flex-col">
              {{ content.owner.full_name }}
            </span>
          </div>
        </td>
        <td class="p-2" v-if="actions">
          <div class="text-right">
            <Menu as="div" class="relative text-left">
              <div>
                <MenuButton class="rounded inline-flex w-full justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        </td>
        <slot name="tabular-td" :content="content" :emit="$emit" />
      </tr>
    </tbody>
  </table>

  <!-- GALLERY VIEW -->

  <div v-if="view == 'gallery'" class="w-fit">

    <ul class="flex flex-wrap text-slate-600 flex-row justify-start gap-8">
      <li class="flex flex-col items-center h-32 w-32" v-if="folder.container_id">  
        <button class="flex items-center flex-col" @click="$emit('browse', folder.container_id)">
          <font-awesome-icon class="h-16 w-16 block" icon="fa-solid fa-arrow-up-from-bracket" />
          back to {{ folder.parent.title }}
        </button>
      </li>

      <template v-for="content in contents">

        <li>

          <input v-if="selectActions" :checked="selected.has(content.id)" @click="$emit('select-content', content, $event)" type="checkbox" class="relative border-slate-300 top-6 left-1" />

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
                  <MenuButton class="inline-flex w-full justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                  <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      </template>
    </ul>
  </div>
</template>
