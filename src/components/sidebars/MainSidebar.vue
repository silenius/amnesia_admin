<template>
  <nav class="bg-gray-700 h-screen text-gray-200 flex flex-col justify-start
    items-start gap p-4">
    <button @click="$router.push({name: 'browse-content', params: {id: 1}})"
      class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-folder-tree" /> Content
    </button>
    <button @click="$router.push({name: 'browse-accounts'})" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-user-astronaut" /> Accounts
    </button>
    <button @click="$router.push('roles')" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-user-group" /> Roles
    </button>
    <button @click="" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-shield-halved" /> Security
    </button>
  </nav>
</template>

<script setup>


</script>
