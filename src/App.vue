<script setup>
import { computed, ref, reactive, nextTick }  from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TitleField from '@/components/TitleField.vue'

const state = reactive({
    count: 0
});

const foobar = ref('blablabla');

const count = ref(1);

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

</script>

<template>
  <header>

        <div @keyup.page-down="pagedown">
            <form>
                <input type="text" v-model="foobar" />
                <input type="submit" />
            </form>
            <form @submit.prevent="onsubmit">
                <input type="submit" />
            </form>
            <button @click="increment">
                {{ state.count }}
            </button>

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

  </header>

</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
