<script setup>
    import { ref } from 'vue'
    
    const faClass = ref([
        'h-10', 'w-10'
    ])

    const buttonClass = ref([
        'p-4', 'rounded-full', 'border-slate-100', 'h-32', 'w-32',
        'hover:border-slate-200 hover:bg-slate-100 text-slate-600 hover:border-dotted'
    ])

    const sectionClass = ref([
        'flex', 'justify-start', 'items-center', 'flew-row', 'gap-4', 'w-full'
    ])
</script>

<template>

  <div :class="sectionClass">
    <button @click="this.$router.push({name: 'browse-content', params: {id: 1}})" :class="buttonClass">
       <font-awesome-icon :class="faClass" icon="fa-solid fa-folder-tree" />
      <div>Content</div>
    </button>
  </div>

  <div :class="sectionClass">
    <button @click="this.$router.push('accounts')" :class="buttonClass">
       <font-awesome-icon :class="faClass" icon="fa-solid fa-user-astronaut" />
      <div>Accounts</div>
    </button>
    <button @click="this.$router.push('roles')" :class="buttonClass">
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
