# Central-Monitor-Flex | 数据大屏

![Vue3](https://img.shields.io/badge/Vue3-4FC08D?logo=vue.js)  ![ECharts](https://img.shields.io/badge/ECharts-AA344D?logo=apache)  ![Mock数据](https://img.shields.io/badge/MockData-本地模拟-green) ![轮询优化](https://img.shields.io/badge/轮询延迟-秒级-blue)  

**数据可视化大屏，轮询、自动适配、还可以的UI**  

## 🗡简介

感谢大家的Star

### 项目背景说明

#### 开发初衷

- 最初计划开发一个通用型数据大屏模板
- 在实践过程中发现通用化设计存在命名规范难题（文件/变量命名等）
- 最终采用"xxx-left"、"xxx-right"的命名方式作为解决方案
- 模拟数据也遵循相同的命名规则

#### 设计来源

- 设计稿采购自闲鱼平台
- 仅对原设计进行了少量调整
- 重点修改了标题部分

#### 交互功能

- 支持通过点击标题返回上级界面

#### 技术实现

- 当前为纯前端实现
- 暂未接入后端服务，只存在Mock数据

### 🚀启动项目

本项目使用 **pnpm 11+**（见 `packageManager` / `engines`）。Node 建议 `^18.18.0 || ^20.9.0 || >=21.1.0`。

```bash
# 安装依赖（首次或依赖变更后）
pnpm i

# 启动开发服务
pnpm dev
```

构建与预览：

```bash
pnpm build
pnpm preview
```

### ✔适配选项

项目里面使用到了两个适配方式，在环境配置中可以进行选择`.env.development`和`.env.production`。

#### Autofit适配

1. 修改配置文件，如下所示：

   ```properties
   # 是否启用屏幕转vw适配，可以选择 postcss-px-to-viewport-8-plugin || autofit
   VITE_POST_CSS_PX_TO_VIEWPORT8_PLUGIN="autofit"
   ```

2. 修改`App.vue`，如下所示

   ```css
   <style lang="scss">
   #app {
     width: 100%;
     height: 100%;
   }
   </style>
   ```

### postcss-px-to-viewport-8-plugin适配

1. 修改配置文件，如下所示：

   ```properties
   # 是否启用屏幕转vw适配，可以选择 postcss-px-to-viewport-8-plugin || autofit
   VITE_POST_CSS_PX_TO_VIEWPORT8_PLUGIN="postcss-px-to-viewport-8-plugin"
   ```

2. 修改`App.vue`，如下所示

   ```css
   <style lang="scss">
   #app {
     width: 100%;
     height: 1080px;
   }
   </style>
   ```

## 🌟 核心功能  

- **5大动态页面**：停车场、数据分析、大数据、社区、经营监管  

- 登录页（UI无登录逻辑）：`/login`

- **智能屏幕适配**：  
  - 支持 `postcss-px-to-viewport`（精准vw单位）  
  - 支持 `autofit`（百分比缩放，兼容不同分辨率）  
  
  - 全接口Mock（`vite-plugin-fake-server`）  
  
- **图表看点**：  
  
  - 饼图自动轮播高亮（无感hover效果）  
  - ECharts动态渲染优化  

### **📌 大屏项目核心功能总结**  

✅ **5大页面**（Vue3 + ECharts + 轮询Mock数据）  

- **登录页**（无逻辑，纯UI）  
- **主页**（导航跳转：停车场、数据分析、大数据、社区、经营监管）  
- **停车场**（动态数据刷新）  
- **数据分析**（饼图轮播 + 自动高亮）  
- **大数据**（动态图表）  
- **社区**（动态数据）  
- **经营监管**（静态页面）  

✅ **关键技术点**  

- **屏幕适配**：支持 `postcss-px-to-viewport-8-plugin`（vw方案）和 `autofit`（百分比缩放）  
- **数据Mock**：`vite-plugin-fake-server` 模拟动态接口（GET请求）  
- **图表交互**：  
  - 饼图自动轮播高亮
  - 所有图表（除经营监管）动态展示  

## 🛠️ 技术栈  

| 领域     | 技术选型                                                     |
| -------- | ------------------------------------------------------------ |
| 前端     | Vue3 + Pinia + ECharts                                       |
| 后端模拟 | vite-plugin-fake-server                                      |
| 工程化   | Vite + GitLab CI/CD（Docker镜像自动构建）                    |
| 适配方案 | postcss-px-to-viewport-8-plugin / autofit.js（配置文件可切换） |

## 🎬 路由动画

### 特性  

全局默认淡入淡出动画（`animate.css`驱动）  

支持页面定制动画效果（如弹跳、缩放等）

✅ **使用方式**

```javascript
// 任意路由快速配置动画  
meta: {
  transition: {
    enter: 'animate__zoomIn',  // 进入动画  
    leave: 'animate__zoomOut' // 离开动画  
  }
}
```

### 如何使用？  

1. **全局默认动画**：淡入淡出
2. **自定义动画**：在路由中定义`meta.transition`  

```ts
{
  path: '/your-route',
  meta: {
    transition: {
      enter: 'animate__zoomIn',  // 进入效果  
      leave: 'animate__zoomOut' // 离开效果  
    }
  }
}
```

**动画库扩展**：直接使用[animate.css官方类名](https://animate.style/)

## 📸 效果预览  

| 主页                                                         | 数据分析                                       |
| ------------------------------------------------------------ | ---------------------------------------------- |
| ![image-20250602221902683](./images/image-20250602221902683.png) | ![QQ202562-22205](./images/QQ202562-22205.gif) |

![image-20250602224251164](./images/image-20250602224305427.png)

![image-20250602224239370](./images/image-20250602224239370.png)

![image-20250602224218621](./images/image-20250602224218621.png)

![image-20250602224204600](./images/image-20250602224204600.png)
