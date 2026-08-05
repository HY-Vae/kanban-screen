FROM node:22-alpine AS build-stage

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com \
 && npm install -g pnpm@11.9.0

# pnpm-workspace.yaml 含 packageExtensions，frozen install 前必须拷入，否则 checksum 不匹配
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm config set registry https://registry.npmmirror.com \
 && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine AS production-stage

# Alpine 需 tzdata，nginx 日志等才按 TZ 显示
RUN apk add --no-cache tzdata
ENV TZ=Asia/Shanghai \
    GATEWAY_HOST=kanban-gateway

# 官方镜像会对 /etc/nginx/templates/*.template 做 envsubst（替换 GATEWAY_HOST）
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
