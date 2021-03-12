<template>
    <div>
        文档详情
        <pdf-component></pdf-component>
       <!-- <designer-view></designer-view> -->
       <!-- <word></word> -->
    </div>
</template>

<script>
import PdfComponent from '../../components/PdfComponent.vue';
import Word from '../../components/Word.vue';
import DesignerView from '../SpreadSheet/DesignerView.vue';
export default {
    name: 'Docdetail',
    components: {
        PdfComponent,
        DesignerView,
        Word
    }
}
</script>

<style scoped>

</style>