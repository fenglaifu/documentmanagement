import { createApp } from 'vue'
import App from './App.vue'
import router from "../src/router"
import store from '../src/store'

import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

// 全局样式
import "styles/index.scss";

createApp(App).use(router).use(store).use(element3).mount('#app')
