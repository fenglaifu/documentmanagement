<template>
    <div class="app-container">
       <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleView()"
                >工作通知详情</el-button
            >
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="listQuery.curPage"
        v-model:limit="listQuery.pageSize"
        @pagination="getDataList"
      ></pagination>  
    </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
import { WorkNoticeModelData } from './model/worknoticeModel';
export default {
  name: "Worknoticelist",
  components: {
    Pagination,
  },
  setup() {
    
    const router = useRouter();
    const {state, getDataList} = WorkNoticeModelData();

    // 查看详情
    function handleView() {
      router.push({
        name: "noticeDetail",
        params: { id: 1 },
      });
    }


    return {
      ...toRefs(state),
      handleView,
      getDataList
    };
  },
};
</script>

<style scoped>

</style>