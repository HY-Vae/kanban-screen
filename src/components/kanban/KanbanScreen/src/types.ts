/** 三栏主轴排布 */
export type KanbanScreenJustify = 'between' | 'center' | 'start';

/** 三栏交叉轴对齐 */
export type KanbanScreenAlign = 'stretch' | 'center' | 'start';

/**
 * 大屏三栏壳属性
 *
 * 壳只提供「左 / 中 / 右 / footer」结构与排布开关；
 * 各屏尺寸、装饰、透视切图差异由域面板自己写，不要假设默认值适合所有主题。
 */
export interface KanbanScreenProps {
  /**
   * 本屏背景图路径；传入时写入 app store，供 layout 使用
   * 例：`/images/bg/bg03.png`
   */
  background?: string;
  /**
   * 左列宽度；`flex` 表示弹性占满
   * @default '530px'
   */
  leftWidth?: string;
  /**
   * 中列宽度；`flex` 表示弹性占满
   * @default 'flex'
   */
  centerWidth?: string;
  /**
   * 右列宽度；缺省与 leftWidth 相同
   */
  rightWidth?: string;
  /** 水平内边距；无需求时传 `0` */
  paddingX?: string;
  /** 垂直内边距；无需求时传 `0` */
  paddingY?: string;
  /** 列间距 */
  gap?: string;
  /**
   * 三栏主轴排布
   * - `between`：拉满整行（满宽三栏屏）
   * - `center`：列簇居中紧挨（如停车透视切图屏）
   * - `start`：靠左排布
   * @default 'between'
   */
  justify?: KanbanScreenJustify;
  /**
   * 三栏交叉轴对齐
   * @default 'stretch'
   */
  align?: KanbanScreenAlign;
}
