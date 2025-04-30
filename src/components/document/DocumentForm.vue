<script setup>
import { ref, computed, provide, inject, watch } from 'vue'

import ContentTitle from '../content/fields/ContentTitle.vue'
import ContentDescription from '../content/fields/ContentDescription.vue'
import ContentIndexed from '../content/fields/ContentIndexed.vue'
import ContentPublishingDate from '../content/fields/ContentPublishingDate.vue'
import ContentExpirationDate from '../content/fields/ContentExpirationDate.vue'
import ContentSecurity from '../content/fields/ContentSecurity.vue'
import ContentBreadcrumb from '../content/fields/ContentBreadcrumb.vue'
import ContentBannerImage from '../content/fields/ContentBannerImage.vue'
import DocumentBody from './fields/DocumentBody.vue'
import FormTabGroup from '../form/FormTabGroup.vue'

const props = defineProps({
  doc: {
    type: Object,
    required: true
  },
  action: {
    type: String,
    default: 'Submit'
  }
})

const section_cls="flex flex-col gap-4"

const emit = defineEmits([
  'submit-document'
])

const errors = inject('errors')

// note provide result is _not_ reactive by default
provide('editable', computed(() => props.doc))

</script>

<template>
  <form @submit.prevent="$emit('submit-document')">
    <FormTabGroup>
      <template #default>
        <section :class="section_cls">
          <ContentTitle v-model="doc.title" />
          <ContentDescription v-model="doc.description" />
          <DocumentBody v-model:body="doc.body" />
        </section>
      </template>
      <template #settings>
        <section :class="section_cls">
          <ContentPublishingDate v-model:effective="doc.effective" />
          <ContentExpirationDate class="border-b pb-4" v-model:expiration="doc.expiration" />
        </section>
        <ContentIndexed class="mt-2" v-model:is_fts="doc.is_fts" />
      </template>
      <template #props>
        <section :class="section_cls">
          <ContentBreadcrumb v-model:breadcrumb="doc.props.breadcrumb" />
          <ContentBannerImage class="border-b pb-4" v-model:banner_image="doc.props.banner_image" />
        </section>
      </template>
      <template #security>
        <section :class="section_cls">
          <ContentSecurity v-model:acls="doc.acls" />
        </section>
      </template>
    </FormTabGroup>
    <button type="submit" class="mt-4 rounded-sm w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
