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
  }
})

const emit = defineEmits(['toggle-show'])

const { show } = toRefs(props)

const cls = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                Register
                <font-awesome-icon icon="fa-solid fa-user-astronaut"
                  class="float-right" />
              </DialogTitle>

              <form>
                <div class="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" name="first_name" id="first_name" :class="cls" placeholder="Scott" required="">
                  </div>

                  <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input type="login" name="last_name" id="last_name" :class="cls" placeholder="Tiger" required="">
                  </div>

                  <div>
                    <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                    <input type="login" name="login" id="login" :class="cls" placeholder="scott.tiger" required="">
                  </div>
                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" :class="cls" placeholder="name@company.com" required="">
                  </div>
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" :class="cls" required="">
                  </div>
                  <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" :class="cls" required="">
                  </div>
                  <!--
<div class="flex items-start">
<div class="flex items-center h-5">
<input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-slate-600 dark:ring-offset-gray-800" required="">
</div>
<div class="ml-3 text-sm">
<label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-slate-600 hover:underline dark:text-slate-500" href="#">Terms and Conditions</a></label>
</div>
</div>
-->
                  <button type="submit" class="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Create an account</button>

                  <button @click.prevent="$emit('toggle-show', false)" class="w-full text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Cancel</button>
                  <slot name="bottom" />
                </div>
              </form>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
