<script setup>
import { 
    onMounted, computed, ref, reactive, nextTick,
    onUpdated, watch, watchEffect
}  from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TitleField from '@/components/TitleField.vue'
import ContentTitle from '@/components/content/ContentTitle.vue'
import { lineage } from '@/services/folder'

import RoleTable from '@/components/role/RoleTable.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
</script>

<template>
    <header>
    </header>
    <RouterView />
    <div class="container mx-auto">
    <div class="grid gap-4">
    <div><BreadCrumb :items="items" /></div>
    <div><RoleTable /></div>
       </div>
    </div>
</template>

<style>
</style>

