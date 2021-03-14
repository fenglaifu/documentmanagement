<template>
    <div class="app-container">
        <el-upload
            :action="actionUrl"
            multiple
            :on-change="onUploadChange"
            :http-request="uploadFile"
            :show-file-list="true">
            <el-button slot="trigger" size="small" type="primary">选取</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        </el-upload>

        <el-row>
          <el-col>
              上传目录:{{parentId}}
          </el-col>
          <el-col>
              <div><el-input type="text" v-model="filePath" placeholder=""></el-input></div>
              <el-tree    
                    :props="defaultProps"
                    :data="dataTreeList"
                    ref="tree"
                    node-key="id"
                    @node-click="handleNodeClick">
            </el-tree> 
          </el-col>
        </el-row>
        
    </div>
</template>

<script lang="ts">
import { ref, toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docUpload',
    emits: ['uploadFile'],
    setup(prop, { emit }){
        const {state, getAllDataList, uploadSingle, uploadMulti, baseURL} = DocModelData();
        getAllDataList();
        let actionUrl = baseURL + '/uploadSingle';
        let dataTreeList: any[] = [];
        const removeData = (data: any[]) => {
            let newDataTree:any[] = [];
            if(data && data.length > 0){
                console.log('data')
                console.log(data)
                data.forEach(item => {
                    if(item.isDir){
                        newDataTree.push(item);
                        if(item.children && item.children.length > 0){
                            removeData(item.children);
                        }
                    }
                })
            }
            return newDataTree;
        }
        dataTreeList = removeData(Object.assign([], store.state.dirFileDataList));

        watchEffect(() => {
            console.log('watchEffect')
            if(store.state.dirFileDataList && store.state.dirFileDataList.length > 0){
                // dataTreeList = store.state.dirFileDataList;
                /* store.state.dirFileDataList.forEach((item,idx) => {
                dataTreeList.push(item);
                console.log(dataTreeList)
                }); */
                dataTreeList = removeData(Object.assign([], store.state.dirFileDataList));
                console.log(dataTreeList)
                console.log('new dataTreeList')
            }
            console.log('dataTreeList')
            console.log(dataTreeList)
            console.log('watchEffect end')
        })

        let filePath = ref();
        let parentId = ref();
        let fileList:any[] = [];
        const submitUpload = (item) => {
            console.log('submitUpload')
            console.log(item)
            emit('uploadFile')
        }
        const uploadFile = (param) => {
            console.log('uploadFile')
            console.log(param)
            // uploadSingle(null)
            var file = param.file;
            var file_form = new FormData();
            file_form.append("file", file);
            file_form.append("filePath", filePath.value);
            file_form.append("parentId", parentId.value);
            uploadSingle(file_form);
            return;
        }
        const handleBeforeUpload = (file,id) => {
            console.log('file,id')
            console.log(file,id)
        }
        const handleSuccess = () => {

        }
        const handleError = () => {

        }
        const onUploadChange = () => {

        }
        

        const handleNodeClick = (data:any, Node:any, element:any) => {
            console.log(data)
            if(data.isDir){
                filePath.value = data.filePath;
                parentId.value = data.id;
            }
            
        }
        return {
            ...toRefs(state),
            actionUrl,
            fileList,
            uploadFile,
            handleBeforeUpload,
            handleSuccess,
            handleError,
            onUploadChange,
            submitUpload,
            dataTreeList,
            handleNodeClick,
            filePath,
            parentId
        }
    }
}
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>