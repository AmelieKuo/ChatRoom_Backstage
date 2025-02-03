import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  // ...UnoCSS options,
  presets: [presetUno(), presetAttributify()],
  theme: {
    colors: {
      main_green: 'var( --main_green )',
      text_dark: 'var( --text_dark )',
      text_light: 'var( --text_light )',
      border_gray: 'var( --border_gray)',
      view: 'var(--view)',
      confirm: 'var(--confirm)',
      danger: 'var( --danger)',
      success: 'var( --success)',
      tag_gray: 'var( --tag_gray)',
    },
    fontSize: {
      h1: '26px',
      h2: '24px',
      h3: '22px',
      h4: '20px',
      h5: '18px',
      p: '16px',
    },
    breakpoints: {
      xs: '375px',
      sm: '428px',
      smplus: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
      uhd: '1920px',
    },
  },
});
