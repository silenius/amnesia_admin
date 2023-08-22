<script setup>
import { ref, computed, provide, inject, watch } from 'vue'


import ContentTitle from '@/components/content/fields/ContentTitle.vue'
import ContentDescription from '@/components/content/fields/ContentDescription.vue'
import ContentIndexed from '@/components/content/fields/ContentIndexed.vue'
import FolderExcludeNav from '@/components/folder/fields/FolderExcludeNav.vue'
import ContentPublishingDate from '@/components/content/fields/ContentPublishingDate.vue'
import ContentExpirationDate from '@/components/content/fields/ContentExpirationDate.vue'
import FolderDefaultPage from '@/components/folder/fields/FolderDefaultPage.vue'
import FolderPolymorphicLoading from '@/components/folder/fields/FolderPolymorphicLoading.vue'
import FolderOrdering from '@/components/folder/fields/FolderOrdering.vue'
import FolderDefaultLimit from '@/components/folder/fields/FolderDefaultLimit.vue'
import ContentTypes from '@/components/content/fields/ContentTypes.vue'
import ContentSecurity from '@/components/content/fields/ContentSecurity.vue'
import ContentBreadcrumb from '@/components/content/fields/ContentBreadcrumb.vue'
import ContentBannerImage from '@/components/content/fields/ContentBannerImage.vue'
import FormTabGroup from '@/components/form/FormTabGroup.vue'

const props = defineProps({
  folder: {
    type: Object,
    required: true
  },
  container: {
    type: Object
  },
  action: {
    type: String,
    default: 'Submit'
  }
})

const section_cls="flex flex-col gap-4"

const emit = defineEmits([
  'submit-folder'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.folder))

</script>

<template>
  <form @submit.prevent="$emit('submit-folder')">
    <FormTabGroup>
      <template #default>
        <section :class="section_cls">
          <ContentTitle v-model:title="folder.title" />
          <ContentDescription v-model:description="folder.description" />
        </section>
      </template>
      <template #settings>
        <section :class="section_cls">
          <ContentPublishingDate v-model:effective="folder.effective" />
          <ContentExpirationDate class="border-b pb-4" v-model:expiration="folder.expiration" />
          <FolderExcludeNav v-model:exclude_nav="folder.exclude_nav" />
          <ContentIndexed v-model:is_fts="folder.is_fts" class="border-b pb-4"/>
          <FolderDefaultLimit class="border-b pb-4" v-model:default_limit="folder.default_limit" />
          <FolderDefaultPage class="border-b pb-4" v-model:index_content_id="folder.index_content_id" />
          <FolderPolymorphicLoading v-model:polymorphic_loading="folder.polymorphic_loading" />
          <ContentTypes  class="border-b pb-4"
            v-model:polymorphic_children="folder.polymorphic_children" 
            :polymorphic_loading="folder.polymorphic_loading"
          />

          <FolderOrdering 
            v-model:default_order="folder.default_order"
            :polymorphic_children="folder.polymorphic_children" 
            :polymorphic_loading="folder.polymorphic_loading"
          />
        </section>

      </template>
      <template #props>
        <ContentBreadcrumb class="pb-4" v-model:breadcrumb="folder.props.breadcrumb" />
        <ContentBannerImage class="border-b pb-4" v-model:banner_image="folder.props.banner_image" />
      </template>
      <template #security :class="section_cls">
        <ContentSecurity 
          v-model:acls="folder.acls"
        />
      </template>
    </FormTabGroup>
    <button type="submit" class="mt-4 rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
