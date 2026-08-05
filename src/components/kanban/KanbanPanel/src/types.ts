/** 大屏通用面板属性 */
export interface KanbanPanelProps {
  /** 面板标题 */
  title?: string;
  /** 面板宽度 */
  width?: string;
  /** 面板高度 */
  height?: string;
  /** 内容区宽度 */
  bodyWidth?: string;
  /** 内容区高度 */
  bodyHeight?: string;
  /** 背景图 URL（css url 内容）；空则用 token 背景色 */
  backgroundImage?: string;
}
