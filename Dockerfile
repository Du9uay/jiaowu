# 多阶段构建 Dockerfile
# 阶段1: 构建阶段
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖 (使用 force 参数处理锁文件兼容性问题)
RUN pnpm install --force

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 阶段2: 生产阶段
FROM nginx:alpine

# 复制构建产物到 nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 