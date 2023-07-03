<script setup>
import { ref, computed, provide, inject, watch } from 'vue'

import ContentTitle from '@/components/content/fields/ContentTitle.vue'
import ContentDescription from '@/components/content/fields/ContentDescription.vue'
import ContentIndexed from '@/components/content/fields/ContentIndexed.vue'
import ContentPublishingDate from '@/components/content/fields/ContentPublishingDate.vue'
import ContentExpirationDate from '@/components/content/fields/ContentExpirationDate.vue'
import ContentSecurity from '@/components/content/fields/ContentSecurity.vue'
import ContentBreadcrumb from '@/components/content/fields/ContentBreadcrumb.vue'
import ContentBannerImage from '@/components/content/fields/ContentBannerImage.vue'
import FileData from '@/components/file/fields/FileData.vue'
import FormTabGroup from '@/components/form/FormTabGroup.vue'

const props = defineProps({
  file: {
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
provide('editable', computed(() => props.file))

</script>

<template>
  <span class="text-slate-600">{{ file.title }}</span>
  <form @submit.prevent="$emit('submit-file')">
    <FormTabGroup>
      <template #default>
        <ContentTitle v-model:title="file.title" />
        <ContentDescription v-model:description="file.description" />
        <FileData v-model:content="file.content" />
      </template>
      <template #settings>
        <ContentPublishingDate v-model:effective="file.effective" />
        <ContentExpirationDate v-model:expiration="file.expiration" />
        <ContentIndexed v-model:is_fts="file.is_fts" />
      </template>
      <template #props>
          <ContentBreadcrumb class="pb-4" v-model:breadcrumb="file.props.breadcrumb" />
          <ContentBannerImage class="border-b pb-4" v-model:banner_image="file.props.banner_image" />
      </template>
      <template #security>
        <ContentSecurity v-model:acls="file.acls" />
      </template>
    </FormTabGroup>
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
