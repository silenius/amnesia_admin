<template>
  <table class="border-collapse table-fixed">
    <thead>
      <tr class="text-left">
        <th class="p-2">Field</th>
        <th class="p-2">Direction</th>
        <th class="p-2">Nulls</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders">
        <td>
          <input type="checkbox" />
          {{ order.doc }}
        </td>

      </tr>
    </tbody>
  </table>
</template>


<script setup>



</script>
