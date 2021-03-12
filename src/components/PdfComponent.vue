<template>
    <div class="app-container">
        
        <!-- <pdf src="/public/大型互联网分布式系统架构演进之路.pdf"></pdf> -->
        <iframe class="iframe" src="/public/pdf/web/viewer.html?file=/public/大型互联网分布式系统架构演进之路.pdf"></iframe>
    </div>
</template>

<script>
/* import pdf from 'vue-pdf'; */
export default {
    /* components: {
        pdf
    } */
}
</script>

<style scoped>
    .app-container{
        padding: 0px;
        min-height: calc(100vh - 150px);
    }
    .iframe{
        min-height: calc(100vh - 150px);
        max-width: calc(100vw);
        width: 100%;
    }

</style>