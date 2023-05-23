<template>
  <TabGroup>
    <TabList class="flex rounded-xl">
      <Tab v-for="tab in tabs" :key="tab.key" v-slot="{ selected }">
        {{ tab.title }}
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
        title: 'Security',
        key: 'security'
      }
    ]
  }
})

</script>
