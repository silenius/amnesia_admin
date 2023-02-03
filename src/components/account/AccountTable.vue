<script setup>

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilSquareIcon, TrashIcon, UserIcon, AdjustmentsVerticalIcon, LockClosedIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'

import { useAccounts } from '@/composables/accounts.js'

const { accounts, getAccounts } = useAccounts()
const router = useRouter()

onMounted(getAccounts)

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
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="account in accounts" :key="account.id" class="odd:bg-white
        even:bg-slate-50 text-slate-600">
        <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
          {{ account.first_name }} {{ account.last_name }}
        </td>
      </tr>
    </tbody>

  </table>

  </template>
