import { reactive, onMounted, ref } from "vue";
import request from "../../../../src/utils/request";
import store from "../../../store"

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
            label: "fileName",
            children: "children",
            isLeaf: 'leaf'
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
                console.log('getAllDataList()');
                console.log(response);
                state.dataList = response.data;
                // state.total = response.data.total;
                store.state.dirFileDataList = response.data;
            })
            .finally(() => {
                state.loading = false;
            });
    }
    

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

    const download = (filePath: String) => {
        /* return request({
            url: "/downloadFile",
            method: "get",
            params: {'filePath': filePath}
        })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log('download');
            console.log(error);
        }); */
        window.location.href = request.defaults.baseURL + "/downloadFile?filePath=" + filePath;

    }

    return {state, getAllDataList, getPageDataList, getDirPathDataList, download}
}