<script setup>
import { ref, toRefs } from 'vue'

import { 
  Menu, MenuButton, MenuItems, MenuItem,
  Dialog, DialogPanel, DialogTitle, DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Error,
    required: false
  }
})

const username = ref(null)
const password = ref(null)

const emit = defineEmits(['toggle-show', 'login', 'signup-instead'])

const { show } = toRefs(props)

</script>

<template>
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
                Login
                <font-awesome-icon icon="fa-solid fa-user-astronaut"
                  class="float-right" />
              </DialogTitle>

              <div v-if="errors" class="bg-red-600 p-2 my-6 text-white">
                <div v-if="errors.name == 'HTTPError'">
                  <p v-for="error in errors.data">{{ error }}</p>
                </div>
                <div v-else>{{ errors }}</div>
              </div>

              <div class="space-y-4 md:space-y-6">
                <div>
                  <label for="username" class="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white">Username</label>
                  <input type="username" v-model="username" name="username" id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900
                    sm:text-sm rounded-lg focus:ring-blue-600
                    focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500
                    dark:focus:border-blue-500" placeholder="username" required="">
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                </div>
                <button v-if="username && password" @click.prevent="$emit('login', username, password)" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="#" @click="$emit('signup-instead')" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                </p>
              </div>

              <button
                type="button"
                class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click.prevent="$emit('toggle-show', false)"
              >
                Close
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
