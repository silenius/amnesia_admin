<script setup>
import { 
    onMounted, computed, ref, reactive, nextTick,
    onUpdated, watch, watchEffect
}  from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TitleField from '@/components/TitleField.vue'
import Julien from '@/components/Julien.vue'
import ContentTitle from '@/components/content/ContentTitle.vue'
import { lineage } from '@/services/folder'

import RoleTable from '@/components/role/RoleTable.vue'

const state = reactive({
    count: 0
});

const foobar = ref('blablabla');

const count = ref(5);

const lol123 = ref(null);

const obj = {
    foo: ref(1),
    bar: ref(2)
}

function increment(event) {
    console.log(event)
    state.count++
    count.value*=2
    nextTick(() => {
        console.log('TICK');
    })
}

function warn(message, event) {
    // now we have access to the native event
    if (event) {
        event.preventDefault()
    }
    alert(message)
}

function onsubmit(event) {
    console.log('SUBMIT');
}

onMounted(() => {
    console.log(import.meta.env.MODE);
    console.log("MOUNTED");
})

onMounted(() => {
    console.log(lol123);
    console.log(lol123.value);
    console.log("MOUNTED ENCORE");
})

onUpdated(() => {
    console.log('UPDATED');
})


/*
DOES NOT WORK:
(ref() should be used)


let n = state.count;
n++;

let { count } = state
count++

*/

function pagedown() {
    console.log('PAGE DOWN');
}


const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
})


// a computed ref
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
})


const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
    // getter
    get() {
        return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [firstName.value, lastName.value] = newValue.split(' ')
    }
})

const isActive = ref(true)
const hasError = ref(false)

const error = ref(null)

const classObject = computed(() => ({
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal'
}))


// watch

const question = ref('foo?')
const answer = ref('Questions usually contain a question mark. ;-)')
const img = ref('')

// watch works directly on a ref
const stop = watch(question, async (newQuestion, oldQuestion) => {
    if (question.value.indexOf('?') > -1) {
        answer.value = 'Thinking...'
        try {
            const res = await fetch('https://yesno.wtf/api')
            const js = await res.json()
            answer.value = js.answer
            img.value = js.image
        } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
        }
    }
})

stop()

watchEffect(async () => {
    if (question.value.indexOf('?') > -1) {
        answer.value = 'Thinking...'
        try {
            const res = await fetch('https://yesno.wtf/api')
            const js = await res.json()
            answer.value = js.answer
            img.value = js.image
        } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
        }
    }

})

const people = ref([
    {'name': 'Julien', 'age': 41, 'size': 1},
    {'name': 'Cécile', 'age': 43, 'size': 1},
    {'name': 'Barbara', 'age': 39, 'size': 1},
]);

function enlarge(n) {
    console.log('ENLARGE ' + n);
    console.log(contentTitle.value);
    lineage(1806);
}

const post = {
    id: 1,
    title: 'My Journey with Vue'
}

const contentTitle = ref('placeholder')

watch(contentTitle, (v1, v2) => {
    console.log('contenTitle updated from ' + v1 + ' to ' + v2);
});

</script>

<template>
    <header>
        <!--
<ContentTitle v-model="contentTitle">
<template #before-input>
coucou petite perruche
</template>
</ContentTitle>



<input type="text" v-model="question" placeholder="lol" />
<p> {{ answer }}</p>
<img :src="img" />

<div @keyup.page-down="pagedown" class="bg-gradient-to-r from-red-500 to-orange-500">
<p> coucou </p>
<form>
<input type="text" v-model="foobar" />
<input type="submit" ref="lol123" />
</form>
<form @submit.prevent="onsubmit">
<input type="submit" />
</form>
<button @click="increment">
{{ state.count }}
</button>


<Julien v-for="person in people" 
:key="person.name"
:name="person.name"
:age="person.age" 
:fontsize="person.size"
v-bind="post"
@enlarge-text="enlarge">
Cool raoul
</Julien>

foobar: {{ foobar }}

<button @click="(event) => warn('coucou', event)">
test
</button>
coucou {{ state.count }}
coucou {{ count }}
<p v-for="book in author.books">
{{ book }}
</p>

<p v-for="book in author.books">
{{ book }}
</p>
<div class="static" :class="{ active: isActive, 'text-danger': hasError }" ></div>
<div :class="classObject"></div>
<h1 v-show="isActive">Hello! (v-show only toggles the display CSS
property of the element.)</h1>
</div>
-->
    </header>
    <div class="grid grid-flow-row border-2 border-indigo-600 gap-4">
        <div class="border-2">col1</div>
        <div class="border-2 grid-row-2">col2</div>
        <div class="border-2">col3</div>
        <div class="border-2">col4</div>
        <div class="border-2"><RoleTable /></div>
        <div class="border-2 order-first">
            coucou
            <!--


<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Description
                </th>
                <th scope="col" class="py-3 px-6">
                    Status
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="p-4 w-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image">
                    <div class="pl-3">
                        <div class="text-base font-semibold">Neil Sims</div>
                        <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td class="py-4 px-6">
                    React Developer
                </td>
                <td class="py-4 px-6">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
                    </div>
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
            -->
</div>
    </div>


        
</template>

<style>
</style>

