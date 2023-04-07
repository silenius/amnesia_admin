<script setup>
import { ref, computed, provide, inject, watch } from 'vue'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import ContentTitle from '@/components/content/fields/ContentTitle.vue'
import ContentDescription from '@/components/content/fields/ContentDescription.vue'
import ContentIndexed from '@/components/content/fields/ContentIndexed.vue'
import ContentPublishingDate from '@/components/content/fields/ContentPublishingDate.vue'
import ContentExpirationDate from '@/components/content/fields/ContentExpirationDate.vue'
import ContentSecurity from '@/components/content/fields/ContentSecurity.vue'
import ContentBreadcrumb from '@/components/content/fields/ContentBreadcrumb.vue'
import ContentBannerImage from '@/components/content/fields/ContentBannerImage.vue'
import DocumentBody from '@/components/document/fields/DocumentBody.vue'

const props = defineProps({
  document: {
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
  'submit-document'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.document))

</script>

<template>
  <span class="text-slate-600">{{ document.title }}</span>
  <form @submit.prevent="$emit('submit-document')">
    <TabGroup>
      <TabList>
        <Tab>Default</Tab>
        <Tab>Settings</Tab>
        <Tab>Security</Tab>
      </TabList>
      <TabPanels>

        <!-- DEFAULT -->

        <TabPanel>
          <ContentTitle v-model:title="document.title" />
          <ContentDescription v-model:description="document.description" />
          <DocumentBody v-model:body="document.body" />
        </TabPanel>

        <!-- SETTINGS -->

        <TabPanel>
          <ContentPublishingDate v-model:effective="document.effective" />
          <ContentExpirationDate v-model:expiration="document.expiration" />
          <ContentBreadcrumb v-model:breadcrumb="document.breadcrumb" />
          <ContentIndexed v-model:is_fts="document.is_fts" />
          <ContentBannerImage v-model:banner_image="document.banner_image" />
        </TabPanel>

        <!-- SECURITY -->


        <TabPanel>
          SECURITY
          <ContentSecurity 
            v-model:acls="document.acls"
          />

        </TabPanel>


      </TabPanels>
    </TabGroup>
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
  </template>
