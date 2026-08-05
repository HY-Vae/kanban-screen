import autofit from 'autofit.js';

/** 设计稿宽度（px） */
export const KANBAN_DESIGN_WIDTH = 1920;

/** 设计稿高度（px） */
export const KANBAN_DESIGN_HEIGHT = 1080;

/**
 * 按 1920×1080 设计稿缩放整屏
 * 全仓只允许在插件入口调用一次，禁止各页重复 init
 */
export function initAutofit(): void {
  autofit.init({
    dh: KANBAN_DESIGN_HEIGHT,
    dw: KANBAN_DESIGN_WIDTH,
    el: 'body',
    resize: true,
    transition: 0.49,
    limit: 0.1,
    allowScroll: false,
  });
}
