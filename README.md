# kanban-screen

Vue 3 数据可视化大屏样例。停车、社区、经营监管等几套主题屏；默认走 Mock，未接真实后端。

## 快速开始

需要 **Node `>=22.13`**、**pnpm 11+**。

```bash
pnpm i
pnpm dev
```

```bash
pnpm build
pnpm preview
```

## 包含

| 路由 | 内容 |
| --- | --- |
| `/portal` | 入口 |
| `/parking` | 智慧停车 |
| `/community` | 社区 |
| `/analyse` | 数据分析 |
| `/business` | 经营监管 |
| `/insight` | 大数据 |
| `/login` | 登录页 UI（演示用，逻辑很薄） |

- 适配：**autofit**，按 `1920×1080` 等比缩放。
- 接口：`vite-plugin-fake-server`，前缀见 `.env` 的 `VITE_MOCK_BASE_API`（默认 `/mock`），类型与 `src/api` 对齐。
- 图表：ECharts；部分屏有轮询、饼图自动高亮。

## 文档

- Docker 部署见 [`docker/`](./docker/)（`compose.yml` 默认宿主机端口 `18081`）

## 技术栈

Vue 3 · Vite · TypeScript · Pinia · UnoCSS · Sass · ECharts · autofit.js · axios

## 预览

| 入口 | 数据分析 |
| --- | --- |
| ![](./images/image-20250602221902683.png) | ![](./images/QQ202562-22205.gif) |

![](./images/image-20250602224305427.png)

![](./images/image-20250602224239370.png)

![](./images/image-20250602224218621.png)

![](./images/image-20250602224204600.png)

## License

[Apache-2.0](./LICENSE)
