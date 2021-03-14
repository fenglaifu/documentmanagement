<template>
    <div class="app-container">
      <div class="btn-container">
            <el-button type="success" icon="el-icon-edit" @click="uploadFile">上传</el-button>
            <div>{{fileName}}</div>
      </div>
      <el-upload  :action="uploadFile"  :on-success="UploadSuccess" :file-list="fileList">
          <el-button size="small" type="primary" >点击上传</el-button>
      </el-upload>

      <el-tree    
      :props="defaultProps"
      :data="dataTreeList"
      ref="tree"
      node-key="id"
      @node-click="handleNodeClick"
      >
    </el-tree> 
    </div>
</template>

<script lang="ts">
import { toRefs, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
import { DocModelData } from './model/docModel';
import request from "../../../src/utils/request";
import store from "../../store";

export default {
  name: "doclist",
  components: {
    Pagination,
  },
  setup() {
        
    let dataTreeList: any[] = [];
    const router = useRouter();
    const {state, getPageDataList, getAllDataList, download} = DocModelData();
    getAllDataList();
    watchEffect(() => {
      console.log('watchEffect')
      if(store.state.dirFileDataList && store.state.dirFileDataList.length > 0){
        dataTreeList = store.state.dirFileDataList;
        /* store.state.dirFileDataList.forEach((item,idx) => {
          dataTreeList.push(item);
          console.log(dataTreeList)
        }); */
      }
      console.log('dataTreeList')
          console.log(dataTreeList)
      console.log('watchEffect end')
    })

    const handleNodeClick = (data:any, Node:any, element:any) => {
        console.log(data);
        console.log(Node);
        console.log(element);
        if(data.isDir){
          return;
        }
        store.state.selectedFileData = data;
        if(data.fileName){
          const suffix = data.fileName.substring(data.fileName.indexOf('.') + 1).toLowerCase();
          if(suffix === 'pdf'){
            router.push({ name: "docdetailPdf", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'doc' || suffix === 'docx'){
            router.push({ name: "docdetailDocx", params: { id:  data.id}});
            return;
          }
          else if(suffix === 'xls' || suffix === 'xlsx'){
            router.push({ name: "docdetailXlsx", params: { id:  data.id}});
            return;
          }
          else {
            router.push({ name: "docdetail", params: { id:  data.id}});
            return;
          }
        }
    }

    const uploadFile = () => {

    }


    return {
      ...toRefs(state),
      getPageDataList,
      dataTreeList,
      handleNodeClick,
      uploadFile
    };
  },
};
</script>

<style scoped>
  .app-container{
    font-size: 30px;
  }
  .btn-container {
    text-align: left;
    padding: 0px 10px 20px 0px;
}
</style>