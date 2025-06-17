<script setup>
import { toValue, ref, toRefs, provide } from 'vue'
import { 
  Menu, MenuButton, MenuItems, MenuItem,
  Dialog, DialogPanel, DialogTitle, DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

import AccountForm from './AccountForm.vue'
import { useUsersStore } from '../../stores/users.js'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const user_store = useUsersStore()

const account_for_form = ref({})

async function create() {
  const { error } = await user_store.create(account_for_form)

  if (!error) {
    emit('toggle-show', false)
  } else {
    setErrorFromResponse(error)
  }
}

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

const emit = defineEmits(['login-instead', 'toggle-show'])
const { show } = toRefs(props)
</script>

<template>
  <Teleport to="body">
    <TransitionRoot appear :show="show" as="template">
      <Dialog as="div" :open="show" @close="show=false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-500 ease-out"
              enter-from="opacity-0 scale-75"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3" class="text-lg font-medium leading-6 text-gray-900
                  mb-4 pb-2 tracking-widest border-b-2 font-bold"
                >
                  Register
                  <font-awesome-icon icon="fa-solid fa-user-astronaut"
                    class="float-right" />
                </DialogTitle>

                <AccountForm 
                  :account="account_for_form"
                  @toggle-show="(v) => $emit('toggle-show', v)"
                  @submit-account="create"
                >
                  <template #bottom>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? 
                      <a href="#" @click.prevent="$emit('login-instead')" class="font-medium text-slate-600 hover:underline dark:text-slate-500">Login here</a>
                    </p>
                  </template>
                </AccountForm>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
