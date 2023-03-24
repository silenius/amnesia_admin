<script setup>
import { ref, computed, provide, inject, watch } from 'vue'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

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

const emit = defineEmits([
  'submit-folder'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.folder))

</script>

<template>
  <span class="text-slate-600">{{ folder.title }}</span>
  <form @submit.prevent="$emit('submit-folder')">
    <TabGroup>
      <TabList>
        <Tab>Default</Tab>
        <Tab>Settings</Tab>
        <Tab>Security</Tab>
      </TabList>
      <TabPanels>

        <!-- DEFAULT -->

        <TabPanel>
          <ContentTitle v-model:title="folder.title" />
          <ContentDescription v-model:description="folder.description" />
        </TabPanel>

        <!-- SETTINGS -->

        <TabPanel>
          <ContentPublishingDate v-model:effective="folder.effective" />
          <ContentExpirationDate v-model:expiration="folder.expiration" />
          <FolderExcludeNav v-model:exclude_nav="folder.exclude_nav" />
          <ContentBreadcrumb v-model:breadcrumb="folder.breadcrumb" />
          <ContentIndexed v-model:is_fts="folder.is_fts" />
          <ContentBannerImage v-model:banner_image="folder.banner_image" />
          <FolderDefaultLimit v-model:default_limit="folder.default_limit" />
          <FolderDefaultPage v-model:index_content_id="folder.index_content_id" />
          <FolderPolymorphicLoading v-model:polymorphic_loading="folder.polymorphic_loading" />
          <ContentTypes 
            v-model:polymorphic_children="folder.polymorphic_children" 
            :polymorphic_loading="folder.polymorphic_loading"
          />

          <FolderOrdering 
            v-model:default_order="folder.default_order"
            :polymorphic_children="folder.polymorphic_children" 
            :polymorphic_loading="folder.polymorphic_loading"
          />

        </TabPanel>

        <!-- SECURITY -->


        <TabPanel>
          SECURITY
          <ContentSecurity 
            v-model:acls="folder.acls"
          />

        </TabPanel>


      </TabPanels>
    </TabGroup>
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
  </template>
