import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin, type VueQueryPluginOptions } from "vue-query";
import { QueryClient } from "vue-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  }),
};

app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(createPinia());
app.use(router);

app.mount("#app");
