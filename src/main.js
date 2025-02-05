import { createApp, createVNode } from 'vue'
import { createPinia } from 'pinia';
import '@unocss/reset/tailwind.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import 'virtual:uno.css';
import './assets/css/style.css';
import { setupDayjs, setupAlert } from '@/plugins';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia()

setupDayjs(app);
setupAlert(app);

app.use(ElementPlus, { locale: zhTw });
app.use(pinia);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const Icon = (props) => {
  const { name } = props;
  return createVNode(ElementPlusIconsVue[name]);
};

app.component('UseIcon', Icon);

app.mount('#app');
