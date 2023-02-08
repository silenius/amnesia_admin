<script setup>

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilSquareIcon, TrashIcon, UserIcon, AdjustmentsVerticalIcon, LockClosedIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import Avatar from "vue-boring-avatars";

import { useAccounts } from '@/composables/accounts.js'

const props = defineProps({
  accounts: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const delete_account = (id) => {
  destroyAccount(id)
}

const edit_account = (id) => {
  router.push({
    name: 'edit_account',
    params: { id: id }
  })
}

const edit_members = (id) => {
  router.push({
    name: 'edit_members',
    params: { id: id }
  })
}

</script>

<template>
  <table class="table-auto border-spacing-4 text-xs">
    <thead>
      <tr class="text-left bg-slate-100">
        <th class="p-2">Name</th>
        <th>Enabled</th>
        <slot name="headers"></slot>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="account in accounts" :key="account.id" class="odd:bg-white even:bg-slate-50 text-slate-600">
        <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
          <div class="grid grid-flow-col w-fit gap-4">
            <Avatar :size="32" :name="account.full_name" variant="bauhaus" />
            <span class="flex flex-col">
              <strong>{{ account.first_name }} {{ account.last_name }}</strong>
              <small>{{ account.email }}</small>
            </span>
          </div>
        </td>
        <td class="text-center">
          <CheckIcon v-if="account.enabled" class="inline-block h-4 w-4" />
          <XMarkIcon v-if="!account.enabled" class="inline-block h-4 w-4" />
        </td>
        <slot :account="account" name="tds"></slot>
        <td>
        </td>
      </tr>
    </tbody>

  </table>

  </template>
