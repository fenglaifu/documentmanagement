<template>
    <div>
        
        <div class="btn-container">
            <el-button type="success" icon="el-icon-edit">下载</el-button>
            <div>{{fileName}}</div>
        </div>
        <!-- <pdf-component></pdf-component> -->
       <!-- <designer-view></designer-view> -->
       <!-- <word></word> -->
    </div>
</template>

<script>
/* import PdfComponent from '../../components/PdfComponent.vue';
import Word from '../../components/Word.vue';
import DesignerView from '../SpreadSheet/DesignerView.vue'; */
import { useRouter } from "vue-router";
import { toRefs, watchEffect } from "vue";
import { DocModelData } from './model/docModel';
import store from "../../store";
export default {
    name: 'docdetail',
    /* components: {
        PdfComponent,
        DesignerView,
        Word
    }, */
    setup(){
        const {state, getPageDataList, getAllDataList, download} = DocModelData();
        const router = useRouter();
        let selectedFileData = store.state.selectedFileData;
        watchEffect(() => {
            console.log('watchEffect')
            selectedFileData = store.state.selectedFileData;
            console.log(selectedFileData.fileName)
        })
        return {
            ...toRefs(state),
            download, 
            router,
            ...toRefs(selectedFileData)
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