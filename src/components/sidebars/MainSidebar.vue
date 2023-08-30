<template>
  <div class="bg-gray-700 min-h-screen text-gray-200 flex flex-col">

    <button @click="$router.push({name: 'browse-content', params: {id: 1}})"
      class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-folder-tree" /> Content
    </button>
    
    <button @click="$router.push({name: 'browse-accounts'})" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-user-astronaut" /> Accounts
    </button>
    
    <button @click="$router.push({name: 'roles'})" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-user-group" /> Roles
    </button>
    
    <button @click="" class="flex gap-1 items-center">
      <font-awesome-icon class="w-4 h-4" icon="fa-solid fa-shield-halved" /> Security
    </button>
    
  </div>
</template>

<script setup>

</script>
