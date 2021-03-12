<template>
    <div>
        <div v-html="vHtml" />
    </div>
</template>

<script>
import mammoth from 'mammoth';
import {convertToHtml} from "mammoth";
import axios from "axios";
export default {
    name: 'Word',
    setup(){
        let vHtml = '11';
        
        mammoth.convertToHtml({path: "E:/vue3/gitcodeDocmanagement/documentmanagement/public/20210226_v4.5.15-api doc-ruby stock mgt.docx"})
        .then(result => {
            vHtml = result.value; // The generated HTML
            var messages = result.messages; // Any messages, such as warnings during conversion
        })
        .done();

        return {
            vHtml
        }
    }
}

</script>

<style scoped>

</style>