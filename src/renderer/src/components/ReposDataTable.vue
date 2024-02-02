<template>

<DownloadMenu class="text-primary"
@on-json="onDownloadJson"
@on-csv="onDownloadCsv"
@on-xlsx="onDownloadXlsx"
@on-close="showDownloadMenu=false"
/>  

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

import DownloadMenu from '@renderer/components/DownloadMenu.vue';
import { downloadFile } from '@renderer/core/fileService';

export default {
    name: "TextDataTable",
    components: {
      DownloadMenu
    },
    props: {
        rows: Array
    },
    data(){
      return {
        columns:["#","Local","Current Branch","Remote"]
      }
    },
    methods:{
      onDownloadJson(){
        let items = this.rows;
          
        items = items.map(item=>{
            const keys = Object.keys(item);
            for(const key of keys){
                if(typeof item[key] === 'object' || Array.isArray(item[key])){
                    item[key] = JSON.stringify(item[key]);
                }
            }
            return item;
        })
        downloadFile(items,"json");
      },
      onDownloadCsv(){
        let items = this.rows;
          
        items = items.map(item=>{
            const keys = Object.keys(item);
            for(const key of keys){
                if(typeof item[key] === 'object' || Array.isArray(item[key])){
                    item[key] = JSON.stringify(item[key]);
                }
            }
            return item;
        })
        downloadFile(items,"csv");
      },
      onDownloadXlsx(){
        let items = this.rows;
        console.log(items)
        items = items.map(item=>{
            const keys = Object.keys(item);
            for(const key of keys){
                if(typeof item[key] === 'object' || Array.isArray(item[key])){
                    item[key] = JSON.stringify(item[key]);
                }
            }
            return item;
        })
        downloadFile(items,"xlsx");
      }
    }
}
</script>
<style scoped>
</style>