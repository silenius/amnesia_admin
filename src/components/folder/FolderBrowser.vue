<script setup>

import { ref, unref, computed } from 'vue'
import { 
  Menu, 
  MenuButton, 
  MenuItems, 
  MenuItem, 
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
} from '@headlessui/vue'

import { 
  actions as default_actions,
  selectActions as select_actions
} from '@/components/folder/FolderBrowserActions.js'

import ContentBreadcrumb from '@/components/breadcrumbs/ContentBreadcrumb.vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'
import DefaultPagination from '@/components/pagination/DefaultPagination.vue'

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
  selected: {
    type: Map,
    default: new Map()
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
  },
  canChangeWeight: {
    type: Boolean,
    default: false
  },
  addTypes: {
    type: Array,
    default: null
  },
  editButton: {
    type: Boolean,
    default: false
  },
  sortFolderFirst: {
    type: Boolean,
    default: true
  },
  limits: {
    type: Array,
    default: [10, 50, 100, 500]
  },
  current_limit: {
    type: Number,
    default: 50
  },
  offset: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  'reload', 'browse', 'delete-content', 'select-content', 'move-content', 
  'edit-content', 'add-content', 'change-weight-content',
  'publish-content', 'unpublish-content',
  'delete-selection', 'move-selection',
  'breadcrumb-select',  
  'change-limit',  // change the current browsing limit 
  'goto-page'  // change pagination
])

const base = import.meta.env.VITE_BASE_BACKEND
const image_url = (id) => new URL(`${id}/download`, base)

const view = ref(props.view)
const view_icon = computed(
  () => view.value == 'tabular' ? 'fa-image fa-regular' : 'fa-solid fa-list'
)

const get_container = (node) => {
  let target = node
  const elem = unref(view) == 'tabular' ? 'tr' : 'li'

  if (target.nodeType != Node.ELEMENT_NODE) {
    target = target.parentNode
  }

  return target.closest(elem)
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
      <div class="flex">

        <!-- BREADCRUMB -->

        <div class="grow flex items-center">
          <ContentBreadcrumb 
            :content="folder" 
            @item-select="(content) => $emit('breadcrumb-select', content)" 
          />
        </div>

        <div class="hidden md:block flex items-center justify-end">

          <!-- PER PAGE -->

          <select class="text-sm rounded-full" @change="$emit('change-limit', $event.target.value)">
            <option :selected="limit==current_limit" v-for="limit in limits">{{ limit }}</option>
          </select> <span class="mr-2 text-xs">per page</span>

          <!-- EDIT FOLDER -->

          <button v-if="editButton" @click.prevent="$emit('edit-content',
            folder)" class="hover:outline-none text-white bg-amber-400
            hover:bg-amber-500 hover:ring-4 hover:ring-amber-100 font-medium
            rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-amber-900"><font-awesome-icon class="h-4 w-4" icon="fa-pen-to-square" />Edit</button>

          <!-- ADD CONTENT TO FOLDER -->

          <Menu as="div" class="relative inline" v-if="addTypes">
            <MenuButton class="hover:outline-none text-white bg-emerald-400
              hover:bg-emerald-500 hover:ring-4 hover:ring-emerald-100
              font-medium rounded-full text-sm px-3 py-2.5 mr-2 mb-2 dark:focus:ring-emerald-900">
              <font-awesome-icon class="h-4 w-4" icon="fa-regular fa-square-plus" />
              Add
            </MenuButton>
            <MenuItems as="div" class="z-10 absolute right-0 mt-2 w-56
              rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem as="div" v-slot="{ active }" v-for="t in addTypes" :key="t.id">
              <button @click="$emit('add-content', folder, t.name)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md p-2 text-sm', ]" > 
                <font-awesome-icon class="w-4 h-4 mr-2" :icon="['fa-solid', t.icons.fa]" /> {{ t.name }}
              </button>
              </MenuItem>
            </MenuItems>
          </Menu>

          <!-- SETTINGS -->

          <Popover class="relative inline">
            <PopoverButton class="text-white bg-rose-500 hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm p-2 mr-2 mb-2 dark:focus:ring-rose-900">
              <font-awesome-icon class="h-6 w-6 align-middle" icon="fa-solid fa-sliders" />
            </PopoverButton>
            <PopoverOverlay class="fixed inset-0 bg-black opacity-25" />

            <PopoverPanel class="absolute right-0 w-max p-4 bg-white z-10">
              <div class="flex items-start">
                <InputCheckbox :checked="sortFolderFirst" @change="(n) =>
                  $emit('reload', {sort_folder_first: n === 'true'})"/>
                <div class="flex flex-col items-start">
                  Folders first
                  <span v-if="sortFolderFirst" class="text-xs">Folders will
                    appear first in the selected order</span>
                  <span v-else class="text-xs">Folders won't specially appear first</span>
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          <!-- VIEW -->

          <button class="text-white bg-rose-500 hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm p-2 mr-2 mb-2 dark:focus:ring-rose-900" @click.prevent="view = view == 'tabular' ? 'gallery' : 'tabular'">
            <font-awesome-icon class="h-6 w-6 align-middle" :icon="view_icon" />
          </button>
        </div>
      </div>

      <!-- SELECTED ITEMS -->

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

      <!-- TABULAR VIEW -->

      <table class="table-auto w-full box-border border" v-if="view == 'tabular'">
        <thead>
          <tr class="text-left text-white bg-slate-500">
            <th class="p-2" v-if="selectActions"><input disabled type="checkbox" /></th>
            <th class="p-2">Title</th>
            <th class="p-2">Owner</th>
            <th class="p-2 text-center">State</th>
            <th class="p-2 whitespace-nowrap">Last update</th>
            <th class="p-2" v-if="actions"></th>
            <slot name="tabular-th" />
          </tr>
        </thead>
        <tbody>
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

            <td class="pl-2 w-0" v-if="selectActions"><input :checked="selected.has(content.id)" @click="$emit('select-content', content, $event)" type="checkbox" /></td>

            <!-- TITLE -->

            <td class="p-2 whitespace-nowrap truncate max-w-md">
              <font-awesome-icon class="drop-shadow-lg inline-block align-middle mr-2 h-8 w-8" :icon="['fa-solid', content.type.icons['fa']]" />
              <button @click="$emit('browse', content.id)"
                v-if="content.type.name=='folder'" class="underline decoration-slate-400 decoration-dotted underline-offset-4">{{ content.title }}</button>
              <template v-if="content.type.name!='folder'">{{ content.title }}</template>
            </td>

            <!-- OWNER -->

            <td class="p-2 text-xs whitespace-nowrap">
              <img :src="content.owner.gravatar" class="mr-2 h-10 w-10 inline rounded-full shadow-md" />
              <span>{{ content.owner.full_name }}</span>
            </td>

            <!-- STATE -->

            <td class="text-center">
              <font-awesome-icon :class="stateClass(content.state)"
                class="inline-block drop-shadow align-middle mr-2" icon="fa-solid fa-circle" />
              <span class="text-xs">{{ content.state.name }}</span>
            </td>

            <!-- LAST UPDATE -->

            <td class="p-2 w-0 text-center text-xs whitespace-nowrap">
              {{ formatDate(content.last_update) }}
            </td>

            <!-- ACTIONS -->

            <td class="p-2 w-0" v-if="actions">
              <div class="text-right">
                <Menu as="div" class="text-left">
                  <div>
                    <MenuButton class="rounded inline-flex w-content justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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

            <input v-if="selectActions" :checked="selected.has(content.id)"
              @click="$emit('select-content', content, $event)" type="checkbox"
              class="absolute border-slate-300 top-1 left-1" />

            <font-awesome-icon :class="stateClass(content.state)"
              class="absolute right-1 top-0.5 h-4 w-4 drop-shadow" icon="fa-solid fa-circle" />

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
        </ul>
      </div>
    </div>
    <slot name="pagination">
      <DefaultPagination
        :limit="current_limit"
        :offset="offset"
        :total="total"
        @goto-page="(page) => $emit('goto-page', page)"
        class="flex justify-center my-4"
      />
    </slot>
  </div>
</template>
