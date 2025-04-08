import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import AlertComponent from '@/components/Alert.vue'

let instance = null

export function setupAlert(app) {
  if (!instance) {
    const alertApp = createApp(AlertComponent)
    alertApp.use(ElementPlus)
    const div = document.createElement('div')
    document.body.appendChild(div)
    instance = alertApp.mount(div)
  }

  app.provide('$alert', instance.handleOpen)
}
