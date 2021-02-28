<template>
    <div class="app-container">
       <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleView()"
                >工作通知详情</el-button
            >
        
    </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
export default {
  name: "Worknoticelist",
  components: {
    Pagination,
  },
  setup() {
    
    const router = useRouter();

    // 查看详情
    function handleView() {
      router.push({
        name: "noticeDetail",
        params: { id: 1 },
      });
    }


    return {
      handleView
    };
  },
};
</script>

<style scoped>

</style>