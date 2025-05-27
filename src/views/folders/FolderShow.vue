<script setup>
import { toRefs, ref, watch, computed }  from 'vue'
import { useFolder } from '../../composables/useFolder.js'
import { useFolderBrowser } from '../../composables/useFolderBrowser.js'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import SelectFolderFilters from '../../components/folder/SelectFolderFilters.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import EditContentButton from '../../components/content/EditContentButton.vue'
import FolderBrowser from '../../components/folder/FolderBrowser.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
})

const { content } = toRefs(props)
const {
  browse, result, meta, error, change_limit, goto_page, view
} = useFolderBrowser(content)

const view_icon = computed(
  () => view.value == 'tabular' ? 'fa-image fa-regular' : 'fa-solid fa-list'
)

</script>
<template>          
  <Teleport defer to="#lol">
    <SelectFolderFilters @change-filter="(p) => browse(p)" />
    <SelectLimit :limit="meta.limit" @set-limit="(v) => change_limit(v)" />
  </Teleport>

  <FolderBrowser
    v-if="content"
    class="mt-4"
    :view="'list'"
    :actions="[]"
    :folder="content"
    :contents="result" 
    :canChangeWeight="false"
    :canSelect="false"
  />

  <Pagination
    v-if="meta.count > meta.limit"
    :limit="meta.limit"
    :offset="meta.offset"
    :total="meta.count"
    @goto-page="(page) => goto_page(page)"
    class="flex justify-center my-4 gap-x-2"
  />


</template>


