<template>
  <div class="grid grid-cols-2 grid-rows-1 items-center p-1 sm:p-2">
    <div class="w-min cursor-pointer flex">
      <RouterLink :to="{name: 'home'}">
        <font-awesome-icon class="m-auto h-8 w-8 block transition-all
          duration-500 hover:scale-125" icon="fa-solid fa-brain" />
        <span class="text-xl font-bold sm:tracking-widest tracking-tighter">Amnesia</span>
      </RouterLink>
    </div>
    <div v-if="account" class="flex justify-end ">
      <img :src="account.gravatar" class="hover:scale-125 transition
        duration-500 h-10 w-10 sm:h-16 sm:w-16 rounded-full" />
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAccounts } from '@/composables/accounts.js'

const { my } = useAccounts()

const account = ref()

onMounted( async () => {
  const { data } = await my()
  account.value = data
})

</script>
