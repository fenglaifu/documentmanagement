import { reactive, onMounted, ref } from "vue";
import request from "../../../../src/utils/request";

export function DocModelData() {

    const state = reactive({
        loading: true, // 加载状态
        dataList: [], // 列表数据
        total: 20,
        listQuery: {
            curPage: 1,
            pageSize: 10,
        },
        defaultProps: {
            label: "label",
            children: "children"
        }
    });

    const getDataList = () => {
        state.loading = true;
        return request({
                url: "/doc/doclist",
                method: "get",
                params: state.listQuery
            })
            .then(response => {
                console.log(response);
                state.dataList = response.data.data;
                state.total = response.data.total;
            })
            .finally(() => {
                state.loading = false;
            });
    }
    getDataList();
    return {state, getDataList}
}