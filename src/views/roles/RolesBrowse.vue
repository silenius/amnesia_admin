<script setup>
import { inject, ref } from 'vue'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import RoleTable from '@/components/role/RoleTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import BreadcrumbFromRouterMeta from '../../components/breadcrumbs/BreadcrumbFromRouterMeta.vue'
import { useRoles } from '../../composables/useRole.js'
import RoleAdd from "../../views/roles/RoleAdd.vue"

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const { destroy_role, roles, browse, meta, change_limit, goto_page } = useRoles()

</script>

<template>
  <div>

    <!-- DIALOG ADD ROLE -->

    <Teleport to="body">
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg flex gap-2 items-center font-medium leading-6 text-gray-900"
                  >
                    <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-group']" />
                    Add a role
                  </DialogTitle>
                  <div class="mt-2">
                    <RoleAdd 
                      :emit_created="true"
                      @role-created="browse() ; closeModal()"
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>

    <div class="flex">
      <button @click.prevent="openModal" class="h-12 font-bold hover:outline-hidden text-white bg-emerald-400
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
      @delete-role="destroy_role"
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
