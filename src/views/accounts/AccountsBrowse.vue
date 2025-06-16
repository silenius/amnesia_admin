<script setup>

import { ref, toValue, provide, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import AccountTable from '../../components/account/AccountTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import BreadcrumbFromRouterMeta from '../../components/breadcrumbs/BreadcrumbFromRouterMeta.vue'
import { useUsersStore } from '../../stores/users.js'
import AccountForm from '../../components/account/AccountForm.vue'

const user_store = useUsersStore()
const { meta, users } = storeToRefs(user_store)

onMounted(() => {
  user_store.browse()
})

const account_for_form = ref({})

async function create_or_modify() {
  const { error } = account_for_form.value.id 
    ? await user_store.update(account_for_form) 
    : await user_store.create(account_for_form)

  if (!error) {
    modal_open.value = false
  } else {
    setErrorFromResponse(error)
  }
}

const modal_open = ref(false)

const errors = ref({})

const setError = (key, value) => {
  if (value === false) {
    delete errors.value[key]
  } else {
    errors.value[key] = value
  }
}

const setErrorFromResponse = async(error) => {
  const error_value = toValue(error)

  for (const [k, v] of Object.entries(error_value.data)) {
    setError(k, v)
  }
}

provide('errors', {
  errors,
  setError,
  setErrorFromResponse
})


</script>

<template>
  <div>

    <!-- DIALOG ADD ACCOUNT -->

    <Teleport to="body">
      <TransitionRoot appear :show="modal_open" as="template">
        <Dialog as="div" @close="modal_open=false" class="relative z-10">
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
                    class="text-lg border-b-2 mb-4 flex gap-2 items-center font-medium leading-6 text-gray-900"
                  >
                    Account
                    <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-group']" />
                  </DialogTitle>
                  <div class="mt-2">
                    <AccountForm 
                      :account="account_for_form"
                      @submit-account="create_or_modify"
                      @toggle-show="(v) => modal_open=v"
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
      <button @click.prevent="account_for_form = {} ; modal_open=true" class="h-12 font-bold hover:outline-hidden text-white bg-emerald-400
        hover:bg-emerald-500 hover:ring-4 hover:ring-emerald-100 rounded-full
        text-sm px-2 justify-center ">
        Add account
      </button>
      <BreadcrumbFromRouterMeta />
      <SelectLimit :limit="meta.limit" @set-limit="(v) => user_store.change_limit(v)" />
    </div>
    <h1 class="flex mt-4 grow gap-2 items-center mb-2 text-xl font-bold">
      <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-astronaut']" />
      Accounts
    </h1>

    <h2>This sections enables you to manage accounts</h2>
    <AccountTable 
      v-if="users"
      class="mt-4"
      :accounts="users" 
      :actions="true" 
      @reset-password="user_store.reset_password(account)"
      @edit-account="(account) => { account_for_form=account ; modal_open = true }"
      @delete-account="user_store.delete_"
      @toggle-enabled="(a) => user_store.patch(a.id, { enabled: !a.enabled})" 
    />
    <Pagination
      v-if="meta.count > meta.limit"
      :limit="meta.limit"
      :offset="meta.offset"
      :total="meta.count"
      @goto-page="(page) => user_store.goto_page(page)"
      class="flex justify-center my-4 gap-x-2"
    />

  </div>
</template>
