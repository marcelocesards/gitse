<template>
<table class="table">
  <thead>
    <tr>
      <th scope="col" v-for="(item,index) in columns" :key="index">{{ item }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in rows" :key="index">
      <template v-for="(field,fieldIndex) in item.fields" :key>
        <th scope="row" v-if="fieldIndex==0">{{ field }}</th>
        <td v-if="fieldIndex>0">{{ field }}</td>
      </template>
    </tr>
  </tbody>
</table>
</template>
<script>
export default {
    name: "TextDataTable",
    props: {
        columns: Array,
        rows: Array
    }
}
</script>