<script setup>
import RoleTable from '@/components/role/RoleTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import { useRoles } from '../../composables/useRole.js'

const { roles, meta, change_limit, goto_page } = useRoles()

</script>

<template>
  <div>
    <div class="flex">
      <h1 class="flex grow gap-2 items-center mb-4 text-3xl border-b font-bold">
        <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-group']" />
        Roles
      </h1>
      <SelectLimit :limit="meta.limit" @set-limit="(v) => change_limit(v)" />
    </div>
    <h2 class="text-2xl">This sections enables you to manage roles</h2>
<!--
    <button class="rounded w-fit hover:bg-green-200 bg-green-100
        px-4 py-1 text-green-600 focus:outline-hidden focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="add_role">
        Add Role
    </button>
-->

    <RoleTable 
      :roles="roles"
      class="mt-4"
    />

    <Pagination
      v-if="meta.count > meta.limit"
      :limit="meta.limit"
      :offset="meta.offset"
      :total="meta.count"
      @goto-page="(page) => goto_page(page)"
      class="flex justify-center my-4 gap-x-2"
    />


  </div>
</template>
