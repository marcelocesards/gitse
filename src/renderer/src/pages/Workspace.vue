<template>
    <div class="container">
      <h3>GitSe</h3>
      <div class="">
        <div class="flex flex-column gap-2">
            <label for="local-library" class="fw-bold">Workspace</label>
            <div class="input-group">
              <input class="form-control" id="local-library" v-model="path" aria-describedby="local-library-help" />
              <button class="btn btn-secondary" @click="setDirectory">Send</button>
            </div>
            <small id="local-library-help" class="text-secondary">Enter your local repositories workspace.</small>
        </div>
      </div>
    </div>
      <div class="container-fluid overflow-hidden ">
        <div class="table-fix-head">
          <TextDataTable v-if="!table.repos" :columns="table.columns" :rows="table.rows"/>
          <ReposDataTable  v-if="table.repos" :rows="table.rows"/>
        </div>
      </div>
</template>
    
<script>
    import TextDataTable from '@renderer/components/TextDataTable.vue';
    import ReposDataTable from '@renderer/components/ReposDataTable.vue';
    export default {
      name: "WorkspacePage",
      components: {
        TextDataTable,
        ReposDataTable
      },
      data(){
        return {
          path: "",
          table: {
            repos:true,
            columns: ["#","Local","Current Branch", "Remote","Remote URL"],
            rows: []
          }
        }
      },
      mounted(){
        this.configure();
      },
      methods: {
        configure(){
          window.api.onListDirectoryContent(this.handleListDirectoryContent);
        },
        handleListDirectoryContent({repositories,directories,files}){
          if(this.table.repos){
            this.table.rows = repositories.map((item,index)=> ({
              id:index+1,
              local:item.local,
              currentBranch:item.currentBranch,
              remote:item.remote,
              remoteUrl:item.remoteUrl}));
          }
          else{
            this.table.rows = repositories.map((item,index)=> ({fields:[
              index+1,
              item.local, 
              item.currentBranch,
              item.remote,
              item.remoteUrl]}));
          }
        },
        setDirectory(){
          window.api.setDirectory(this.path);
        }
      }
    }
</script>
    
<style>
    .table-fix-head{
       overflow: auto;
       min-height: 200px; 
       max-height: 80vh;
    }
    .table-fix-head thead th {
      position: sticky; top: 0; z-index: 1; 
    }
    table  { border-collapse: collapse; width: 100%; }
    th, td { padding: 8px 16px; }
</style>
    