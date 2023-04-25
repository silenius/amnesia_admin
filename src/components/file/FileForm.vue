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

const props = defineProps({
  doc: {
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
  'submit-file'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.doc))

</script>

<template>
  <span class="text-slate-600">{{ doc.title }}</span>
  <form @submit.prevent="$emit('submit-file')">
    <TabGroup>
      <TabList>
        <Tab>Default</Tab>
        <Tab>Settings</Tab>
        <Tab>Security</Tab>
      </TabList>
      <TabPanels>

        <!-- DEFAULT -->

        <TabPanel>
          <ContentTitle v-model:title="doc.title" />
          <ContentDescription v-model:description="doc.description" />
        </TabPanel>

        <!-- SETTINGS -->

        <TabPanel>
          <ContentPublishingDate v-model:effective="doc.effective" />
          <ContentExpirationDate v-model:expiration="doc.expiration" />
          <ContentBreadcrumb v-model:breadcrumb="doc.breadcrumb" />
          <ContentIndexed v-model:is_fts="doc.is_fts" />
          <ContentBannerImage v-model:banner_image="doc.banner_image" />
        </TabPanel>

        <!-- SECURITY -->


        <TabPanel>
          SECURITY
          <ContentSecurity 
            v-model:acls="doc.acls"
          />

        </TabPanel>


      </TabPanels>
    </TabGroup>
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
  </template>
