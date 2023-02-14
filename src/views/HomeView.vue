<script setup>
</script>

<template>
  <div class="h-32 flex justify-center items-center flex-row gap-4 border w-full">

    <button @click="this.$router.push('accounts')">
       <font-awesome-icon class="h-8 w-8" icon="fa-solid fa-user-astronaut" />
      <div>Accounts</div>
    </button>
    <button @click="this.$router.push('roles')">
      <font-awesome-icon class="h-8 w-8" icon="fa-solid fa-user-group" />
      <div>Roles</div>
    </button>

  </div>

</template>
