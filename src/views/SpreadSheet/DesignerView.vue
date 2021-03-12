<template>
    <div>
        <excel-designer v-on:designerInitialized="designerInitialized"></excel-designer>
    </div>
</template>

<script>
import ExcelDesigner from '../../components/ExcelDesigner.vue'
import {ref} from "vue"
import axios from "axios"
import GC from '@grapecity/spread-sheets'
import ExcelIO from '@grapecity/spread-excelio'
export default {
    name: 'DesignerView',
    components: {
        ExcelDesigner
    },
    setup() {
        let designer = undefined;
        let workbook = undefined;
        let designerInitialized=(wb)=>{
            designer = wb;
            workbook = designer.getWorkbook();
            const service = axios.create({
                baseURL: "http://localhost:4000/api",
                timeout: 5000
            });
        /* service.get('/loadExcel/1').then(result => {
            console.log(result)
            let blob = new Blob([result.data], { type: "application/octet-stream" });
            let excelIO = new GC.Spread.Excel.IO();
            let excelFile = '/public/OA系统人员信息.xls';
            excelIO.open(blob, function (json) {
                var workbookObj = json;
                workbook.fromJSON(workbookObj);
            }, function (e) {
                console.log(e);
            });
            
        }).catch(error => {
            console.log("error")
            console.log(error)
        }) */
        service.get('/loadExcels/as').then(result => {
            console.log(result)
            let blobdata = new Blob([result.data], { type: "application/vnd.oasis.opendocument.spreadsheet;charset=utf-8" });
            let excelIO = new GC.Spread.Excel.IO();
            let excelFiles = '/public/OA系统人员信息.xls';
            excelIO.open(blobdata, function (json) {
                var workbookObj = json;
                console.log('workbookObj')
                console.log(workbookObj)
                workbook.fromJSON(workbookObj);
            }, function (e) {
                console.log(e);
            });
            
        }).catch(error => {
            console.log("error")
            console.log(error)
        })

            /* let excelIO = new GC.Spread.Excel.IO();
            let excelFile = '/public/OA系统人员信息.xls';
            excelIO.open(excelFile, function (json) {
                var workbookObj = json;
                workbook.fromJSON(workbookObj);
            }, function (e) {
                console.log(e);
            }); */
        }

        return {designerInitialized}
    }
}
</script>

<style scoped>

</style>