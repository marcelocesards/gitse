<template>
    <div class="container">
      <h3>GitSe</h3>
      <div class="">
        <div class="flex flex-column gap-2">
            <label for="workspace-name" class="fw-bold">Name</label>
              <input class="form-control" id="workspace-name" v-model="name" />
        </div>
        <div class="flex flex-column gap-2">
            <label for="workspace-path" class="fw-bold">Path</label>
              <input class="form-control" id="workspace-path" v-model="path"/>
        </div>
        
        <button class="btn btn-secondary mt-3" @click="setWorkspace">Create</button>
      </div>
    </div>
      <div class="container-fluid overflow-hidden ">
        <div class="table-fix-head">
          <TextDataTable v-if="!table.repos" :columns="table.columns" :rows="table.rows"/>
        </div>
      </div>
</template>
    
<script>
    import TextDataTable from '@renderer/components/TextDataTable.vue';
    export default {
      name: "WorkspacesPage",
      components: {
        TextDataTable
      },
      data(){
        return {
          name: "",
          path: "",
          table: {
            columns: ["#","Workspace","Path", "Repos"],
            rows: []
          }
        }
      },
      mounted(){
        this.configure();
      },
      methods: {
        configure(){
          window.api.onListWorkspaces(this.handleListWorkspaces);
        },
        handleListWorkspaces(workspaces){
          if(!workspaces) return;
          
          this.table.rows = Object.entries(workspaces).map((item,index)=> ({
            
            fields:[
              index+1,
              item[1].name, 
              item[1].path
            ]}));
        },
        setWorkspace(){
          window.api.setWorkspace({
            name: this.name,
            path: this.path
          });
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
    