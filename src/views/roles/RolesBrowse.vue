<script setup>
import RoleTable from '@/components/role/RoleTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import BreadcrumbFromRouterMeta from '../../components/breadcrumbs/BreadcrumbFromRouterMeta.vue'
import { useRoles } from '../../composables/useRole.js'

const { roles, meta, change_limit, goto_page } = useRoles()

</script>

<template>
  <div>
    <div class="flex">
      <button class="h-12 font-bold hover:outline-hidden text-white bg-emerald-400
        hover:bg-emerald-500 hover:ring-4 hover:ring-emerald-100 rounded-full
        text-sm px-2 justify-center ">
        Add role
      </button>

      <BreadcrumbFromRouterMeta />

      <SelectLimit :limit="meta.limit" @set-limit="(v) => change_limit(v)" />
    </div>
    <h1 class="flex grow gap-2 mt-4 items-center mb-2 text-xl font-bold">
      <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-group']" />
      Roles
    </h1>

    <h2>This sections enables you to manage roles</h2>

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
