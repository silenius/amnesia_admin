<script setup>
import { ref } from 'vue'

const faClass = ref([
  'h-10', 'w-10'
])

const buttonClass = ref([
  'p-4', 'rounded-full', 'border-slate-100',
  'hover:border-slate-200 hover:bg-slate-100 text-slate-600 hover:border-dotted'
])

const sectionClass = ref([
  'flex', 'justify-start', 'items-center', 'flex-row', 'gap-4', 'w-full'
])
</script>

<template>
  <p class="m-4 pb-2 border-b-2 text-xl font-bold">Dashboard</p>
  <div :class="sectionClass">
    <button @click="$router.push({name: 'browse-content', params: {id: 1}})" :class="buttonClass">
      <font-awesome-icon :class="faClass" icon="fa-solid fa-folder-tree" />
      <div>Content</div>
    </button>
  </div>

  <div :class="sectionClass">
    <button @click="$router.push('accounts')" :class="buttonClass">
      <font-awesome-icon :class="faClass" icon="fa-solid fa-user-astronaut" />
      <div>Accounts</div>
    </button>
    <button @click="$router.push('roles')" :class="buttonClass">
      <font-awesome-icon :class="faClass" icon="fa-solid fa-user-group" />
      <div>Roles</div>
    </button>
  </div>

  <div :class="sectionClass">
    <button @click="" :class="buttonClass">
      <font-awesome-icon :class="faClass" icon="fa-solid fa-shield-halved" />
      <div>Security</div>
    </button>
  </div>

</template>
