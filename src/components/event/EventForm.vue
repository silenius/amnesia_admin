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
import EventBody from '@/components/event/fields/EventBody.vue'
import EventStart from '@/components/event/fields/EventStart.vue'
import EventEnds from '@/components/event/fields/EventEnds.vue'

const props = defineProps({
  event: {
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
  'submit-event'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.event))

</script>

<template>
  <span class="text-slate-600">{{ event.title }}</span>
  <form @submit.prevent="$emit('submit-event')">
    <TabGroup>
      <TabList>
        <Tab>Default</Tab>
        <Tab>Settings</Tab>
        <Tab>Security</Tab>
      </TabList>
      <TabPanels>

        <!-- DEFAULT -->

        <TabPanel>
          <ContentTitle v-model:title="event.title" />
          <ContentDescription v-model:description="event.description" />
          <EventStart v-model:starts="event.starts" />
          <EventEnds v-model:ends="event.ends" />
          <EventBody v-model:body="event.body" />
        </TabPanel>

        <!-- SETTINGS -->

        <TabPanel>
          <ContentPublishingDate v-model:effective="event.effective" />
          <ContentExpirationDate v-model:expiration="event.expiration" />
          <ContentBreadcrumb v-model:breadcrumb="event.breadcrumb" />
          <ContentIndexed v-model:is_fts="event.is_fts" />
          <ContentBannerImage v-model:banner_image="event.banner_image" />
        </TabPanel>

        <!-- SECURITY -->


        <TabPanel>
          SECURITY
          <ContentSecurity 
            v-model:acls="event.acls"
          />

        </TabPanel>


      </TabPanels>
    </TabGroup>
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
  </template>
