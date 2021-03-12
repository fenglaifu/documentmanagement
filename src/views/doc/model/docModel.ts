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
        dirFilePath: '',
        defaultProps: {
            label: "label",
            children: "children"
        }
    });

    const getPageDataList = () => {
        state.loading = true;
        let url = `/docFile/${state.listQuery.curPage}/${state.listQuery.pageSize}`;
        return request({
                url: url,
                method: "get"
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
    
    const getAllDataList = () => {
        state.loading = true;
        return request({
                url: "/docFile/getAllData",
                method: "get"
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
    getAllDataList();

    const getDirPathDataList = () => {
        state.loading = true;
        return request({
                url: "/getAllData/dirPath",
                method: "get",
                params: state.dirFilePath
            })
            .then(response => {
                console.log(response);
            })
            .finally(() => {
                state.loading = false;
            });
    }

    return {state, getAllDataList, getPageDataList, getDirPathDataList}
}