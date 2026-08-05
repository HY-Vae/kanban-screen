import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-between': 'flex items-center justify-between',
    'flex-x-around': 'flex items-center justify-around',
    'flex-y-center': 'flex flex-col flex-wrap justify-center items-center',
    'flex-y-between': 'flex flex-col flex-wrap justify-between items-center',
    'flex-y-around': 'flex flex-col flex-wrap justify-around items-center',
    'wh-full': 'w-full h-full',
  },
  theme: {
    colors: {
      // 规范名：text-kanban-brand / bg-kanban-accent …
      'kanban-brand': 'var(--kanban-color-brand)',
      'kanban-brand-soft': 'var(--kanban-color-brand-5)',
      'kanban-accent': 'var(--kanban-color-accent)',
      'kanban-info': 'var(--kanban-color-info)',
      'kanban-success': 'var(--kanban-color-success)',
      'kanban-warning': 'var(--kanban-color-warning)',
      'kanban-warning-soft': 'var(--kanban-color-warning-soft)',
      'kanban-muted': 'var(--kanban-text-muted)',
      // 存量工具类兼容（c-primary-secondary 等），新代码用 kanban-*
      primary: 'var(--kanban-color-brand)',
      'primary-secondary': 'var(--kanban-color-accent)',
      info: 'var(--kanban-color-info)',
      'info-secondary': 'var(--kanban-text-muted)',
      warning: 'var(--kanban-color-warning)',
      'warning-secondary': 'var(--kanban-color-warning-soft)',
    },
    fontSizes: {
      sm: 'font-size-[14px]',
      base: 'font-size-[16px]',
      lg: 'font-size-[18px]',
      xl: 'font-size-[22px]',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
