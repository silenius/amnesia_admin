<script setup>

import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { 
  Menu, MenuButton, MenuItems, MenuItem,
  Dialog, DialogPanel, DialogTitle, DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { useAuthStore } from '../../stores/auth.js'
import Register from '../account/Register.vue'
import Login from '../account/Login.vue'

const router = useRouter()
const auth = useAuthStore()

const login_modal_open = ref(false)
const register_modal_open = ref(false)
const login_errors = ref()

const doLogin = async(username, password) => {
  const { error } = await auth.login(username, password)

  if (!error) {
    router.go() 
  } else {
    login_errors.value = error
  }
}

const doLogout = async() => {
  if (await auth.logout()) {
    router.push('/')
  }
}

</script>
<template>
  <div class="grid grid-cols-2 grid-rows-1 items-center sm:p-2">
    <div class="w-min cursor-pointer flex sm:ml-4">
      <RouterLink :to="{name: 'home'}">
        <font-awesome-icon class="m-auto hover:text-gray-100 h-8 w-8 block transition-all
          duration-500 hover:scale-125" icon="fa-solid fa-brain" />
        <span class="text-xl font-bold sm:tracking-widest tracking-tighter">Amnesia</span>
      </RouterLink>
    </div>

    <!-- LOGGED -->

    <div v-if="auth.is_logged" class="flex justify-end sm:mr-4 ">
      <Menu as="div" class="relative">
        <MenuButton>
          <img :src="auth.user.gravatar" class="hover:scale-125 hover:cursor-pointer transition
            duration-500 h-10 w-10 sm:h-16 sm:w-16 rounded-full" />
        </MenuButton>

        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
        >
          <MenuItem v-slot="{ active }">
          <button @click="doLogout" :class="['group flex w-full items-center rounded-md px-2 py-2 text-xs', active ? 'bg-violet-500 text-white' : 'text-gray-900']">
            Sign out
          </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>

    <!-- NOT LOGGED -->

    <div v-else class="flex gap-x-2 justify-end">

      <!-- REGISTER -->

      <Register 
        :show="register_modal_open" 
        @toggle-show="(show_or_hide) => register_modal_open=show_or_hide"
        @login-instead="register_modal_open=false; login_modal_open=true"
      />

      <button @click="register_modal_open=true" class="border hover:cursor-pointer text-white p-2 rounded-sm hover:bg-white hover:text-teal-500 bg-teal-500 border-teal-400">
        register 
      </button>

      <!-- LOGIN -->

      <Login 
        :show="login_modal_open" 
        :errors="login_errors"
        @login="doLogin"
        @signup-instead="login_modal_open=false; register_modal_open=true"
        @toggle-show="(show_or_hide) => login_modal_open=show_or_hide"
      />

      <button @click="login_modal_open=true" class="text-white hover:cursor-pointer border p-2 rounded-sm hover:bg-white hover:text-violet-500 bg-violet-500 border-violet-400">
        login 
      </button>
    </div>

  </div>
</template>

