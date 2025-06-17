<script setup>
import AccountFirstName from './fields/AccountFirstName.vue'
import AccountLastName from './fields/AccountLastName.vue'
import AccountLogin from './fields/AccountLogin.vue'
import AccountEmail from './fields/AccountEmail.vue'
import AccountPassword from './fields/AccountPassword.vue'
import AccountPasswordRepeat from './fields/AccountPasswordRepeat.vue'

const props = defineProps({
  account: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['submit-account', 'toggle-show'])

const cls = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

</script>

<template>
  <form @submit.prevent="$emit('submit-account')">
    <div class="space-y-4 md:space-y-6" action="#">
      <AccountFirstName v-model="account.first_name" />
      <AccountLastName v-model="account.last_name" />
      <AccountLogin v-model="account.login" />
      <AccountEmail v-model="account.email" />
      <AccountPassword v-model="account.password" />
      <AccountPasswordRepeat v-model="account.password_repeat" />
      <button type="submit" class="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Create an account</button>
      <button @click.prevent="$emit('toggle-show', false)" class="w-full text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Cancel</button>
      <slot name="bottom" />
    </div>
  </form>
</template>
