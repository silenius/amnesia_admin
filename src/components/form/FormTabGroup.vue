<template>
  <TabGroup>
    <TabList class="border-b flex mb-4 flex-col sm:flex-row">
      <Tab class="pb-4" v-for="tab in tabs" :key="tab.key" v-slot="{ selected }">
        <span :class="[ 'pb-4 px-12', selected ? 'border-b-2 border-indigo-500 text-indigo-500 font-bold' : 'font-thin' ]">{{ tab.title }}</span>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.key">
        <slot :name="tab.key" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: [
      {
        title: 'Default',
        key: 'default'
      },
      {
        title: 'Settings',
        key: 'settings'
      },
      {
        title: 'Properties',
        key: 'props'
      },
      {
        title: 'Security',
        key: 'security'
      },
    ]
  }
})

</script>
