<template>
<table class="table">
  <thead>
    <tr>
      <th scope="col" v-for="(item,index) in columns" :key="index">{{ item }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in rows" :key="index">
        <th scope="row">{{ item.id }}</th>
        <td >{{ item.local }}</td>
        <td >{{ item.currentBranch }}</td>
        <td ><a :href="item.remoteUrl" target="_blank">{{ item.remote && item.remoteUrl ? item.remote + ":" + item.remoteUrl.split("/").slice(-1) : ""}}</a></td>
    </tr>
  </tbody>
</table>
</template>
<script>
export default {
    name: "TextDataTable",
    props: {
        rows: Array
    },
    data(){
      return {
        columns:["#","Local","Current Branch","Remote"]
      }
    }
}
</script>
<style scoped>
</style>