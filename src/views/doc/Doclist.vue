<template>
    <div class="app-container">
      <!--<el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input> -->

      <el-tree    
      :props="defaultProps"
      :load="loadNode"
      lazy
      ref="tree"
      :data="dataLists"
      :check-strictly="true"
      node-key="id"
      :expand-on-click-node="false"
      highlight-current>
    </el-tree>
      
      <pagination
        v-show="total > 0"
        :total="total"
        :page="listQuery.curPage"
        :limit="listQuery.pageSize"
        @pagination="getDataList"
      ></pagination> 
      <span @click="handleView">查看详情</span>
    </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
import { DocModelData } from './model/docModel';
import request from "../../../src/utils/request";
export default {
  name: "doclist",
  components: {
    Pagination,
  },
  setup() {
    
    const router = useRouter();
    const {state, getDataList} = DocModelData();
    // 查看详情
    function handleView() {
      router.push({
        name: "docDetail",
        params: { id: 1 },
      });
    }
    let dataLists: any[] = [{ id:"1", label:"主数据", level: 0, children:[] },{ id:"2", label:"主数据2", level: 1, children: []}];
    const loadDataTree = (node, resolve) =>{
      /* if (node.level === 0) {
        return resolve([{ id:"1", name:"主数据", objectId:"" }]);
      }
      request({
                url: "/doc/doclist",
                method: "get",
                params: state.listQuery
            })
            .then(response => {
                console.log(response);
                dataLists = response.data.data;
                if (resolve) {
                  resolve(dataLists);//动态加载时
                }else {
                  //更新节点时：
                  node.childNodes = [];
                  node.doCreateChildren(dataLists);
                }
            })
            .finally(() => {
                state.loading = false;
            }); */
      
    }

    function loadNode(node, resolve) {
      if (node.level === 0) {
        // 这里适合去做数据请求，获取到树状图数据
        // node.level === 0 是初始化树状图最开始就展示的数据
        let res = [
          {
            id: 6,
            label: "lazy_tomato集团",
            children: "",
          },
        ];
        resolve(res);
      } else {
       // 这里适合去做数据请求，获取到树状图数据 （为实现loading效果，添加了定时器）
        setTimeout(() => {
          // 每次请求的数据应该根据node.data.id 去请求（看项目后端需要什么参数，我的是点击节点的id，去获取这个节点下面的子节点数据）
          let res2 = [
            {
              id: 10,
              label: "上海分公司",
              leaf: false,
            },
            {
              id: 11,
              label: "武汉分公司",
              // leaf 这个参数可以根据请求接口，返回的数据信息，去判断这个节点是否还包含子节点，从而控制是否有右箭头
              leaf: true,
            },
          ];
          resolve(res2);
        }, 500);
      }     
    }

    function getChildNode (node,resolve) {
      request({
                url: "/doc/doclist",
                method: "get",
                params: state.listQuery
            })
            .then(response => {
                console.log(response);
                dataLists = response.data.data;
                if (resolve) {
                  resolve(dataLists);//动态加载时
                }
            })
            .finally(() => {
                state.loading = false;
            });
    }

    function getRootInfo (resolve) {
     request({
                url: "/doc/doclist",
                method: "get",
                params: state.listQuery
            })
            .then(response => {
                console.log(response);
                dataLists = response.data.data;
                if (resolve) {
                  resolve(dataLists);//动态加载时
                }
            })
            .finally(() => {
                state.loading = false;
            });
    }

    function getnodeinfo (data) {
      request({
                url: "/doc/doclist",
                method: "get",
                params: state.listQuery
            })
            .then(response => {
                console.log(response);
                dataLists = response.data.data;
                if (resolve) {
                  resolve(dataLists);//动态加载时
                }
            })
            .finally(() => {
                state.loading = false;
            });
    }

    function renderContent(h, { node, data }) {
      return (
        `<span class="custom-tree-node"><span>{node.label}</span></span>`
      );
    }

    function nodeClick(data){
      console.log(data);
      loadDataTree();
    }
    
    return {
      ...toRefs(state),
      handleView,
      getDataList,
      loadDataTree,
      dataLists,nodeClick,getnodeinfo,loadNode
    };
  },
};
</script>

<style scoped>

</style>