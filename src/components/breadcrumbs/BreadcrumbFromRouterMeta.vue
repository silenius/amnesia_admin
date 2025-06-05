<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const base = import.meta.env.BASE_URL
const route = useRoute()

const breadcrumbs = computed(() => route.matched.map(
    (x) => x.meta.breadcrumb ? x.meta.breadcrumb(route) : []
  )
)

</script>

<template>
  {{ breadcrumbs }}

  <ol class="shadow-lg border px-4 py-2 rounded-full border-slate-200 w-fit mx-auto flex justify-center">
    <li class="flex" v-for="(item, idx) in breadcrumbs">
      <a class="flex items-center" :href="item.path">
        <a :href="base" v-if="!idx"><font-awesome-icon icon="fa-solid fa-house" /></a>
        <span :class="[idx+2 >= breadcrumbs.length ? 'block' : 'hidden sm:block']" class="ml-2"> / {{ item.text }}</span>
      </a>
    </li>
  </ol>
</template>
