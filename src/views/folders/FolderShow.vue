<template>          

  <!-- VIEW -->

  <button class="text-white bg-rose-500 text-sm hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm p-2 dark:focus:ring-rose-900" @click.prevent="view = view == 'tabular' ? 'gallery' : 'tabular'">
    <font-awesome-icon class="h-6 w-6" :icon="view_icon" />
  </button>

  <EditContentButton class="p-1" :label="null" @click.prevent="$emit('edit-content', content)" />

  <article class="mt-4 prose" v-if="view=='tabular'">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <p v-for="item in data">
      <font-awesome-icon class="drop-shadow-lg inline-block align-middle mr-2 h-8 w-8" :icon="['fa-solid', item.type.icons['fa']]" />
      <RouterLink :to="{name: 'show-content', params:{id: item.id}}">
        {{ item.title }}
      </RouterLink>
    </p>
  </article>
  <div class="w-fit" v-if="view=='gallery'">

    <ul class="flex flex-wrap text-slate-600 flex-row justify-start gap-8">
      <li 
        v-for="item in data" 
        :key="item.id"
        class="relative"
      >

      <RouterLink :to="{name: 'show-content', params:{id: item.id}}">
        <div class="flex flex-col h-32 w-32 overflow-scroll mb-1 border">

            <div class="flex flex-col items-center">
              <img :src="image_url(item.id)" v-if="item.type.name == 'file' && item.mime.major.name == 'image'" />
              <font-awesome-icon v-else class="h-16 w-16 block" :icon="['fa-solid', item.type.icons['fa']]" />
              <span class="text-center m-5 mt-1 leading-5">{{ item.title }}</span>
            </div>
        </div>
      </RouterLink>
      </li>
    </ul>
  </div>

  <DefaultPagination
    :limit="limit"
    :offset="offset"
    :total="meta.count"
    @change="(n) => reload(n)"
    class="flex justify-center my-4"
  />
</template>

<script setup>
import { ref, watch, computed, onBeforeMount, onUnmounted, onMounted, onUpdated } from 'vue'
import { useFolder } from '@/composables/folders.js'
import { createBrowser } from '@/composables/browser.js'
import DefaultPagination from '@/components/pagination/DefaultPagination.vue'
import EditContentButton from '@/components/buttons/EditContentButton.vue'

onBeforeMount(() => console.log('===> FolderShow before mounted'))
onMounted(() => console.log('===> FolderShow mounted'))
onUnmounted(() => console.log('===> FolderShow unmounted'))
onUpdated(() => console.log('===> FolderShow updated'))
const { browse } = useFolder()

const base = import.meta.env.VITE_BASE_BACKEND
const image_url = (id) => new URL(`${id}`, base)

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  view: {
    type: String,
    default: 'tabular'
  },

})

const view = ref(props.view)
const view_icon = computed(
  () => view.value == 'tabular' ? 'fa-image fa-regular' : 'fa-solid fa-list'
)


const folder_id = computed(() => props.content.id)

const { 
  reload, meta, data, limit, offset, sort_folder_first,
} = createBrowser(folder_id, browse)

watch(() => props.content.id, async () => {
  await reload({offset:0})
}, { immediate: true })

</script>
