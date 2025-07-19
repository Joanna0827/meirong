# 部署指南

## GitHub 仓库信息

您的美容店预约系统已经成功推送到 GitHub 仓库：
- **仓库地址**: https://github.com/Joanna0827/meirong.git
- **仓库名称**: meirong

## 部署选项

### 1. Vercel 部署（推荐）

Vercel 是 Next.js 官方推荐的部署平台，提供免费托管服务。

#### 步骤：
1. 访问 [Vercel](https://vercel.com) 并注册/登录
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择您的仓库 `Joanna0827/meirong`
5. 配置环境变量：
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://qsvzvxvejupjvlkxcsxa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnp2eHZlanVwanZsa3hjc3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTIzNjgsImV4cCI6MjA2ODQ2ODM2OH0.8j5D0mz7CXENY1HiiCGJ2ZoCQypeuEgTWUzuysz34y0
   ```
6. 点击 "Deploy"

#### 优势：
- 自动部署（每次推送代码自动更新）
- 免费 SSL 证书
- 全球 CDN
- 自动优化

### 2. Netlify 部署

#### 步骤：
1. 访问 [Netlify](https://netlify.com) 并注册/登录
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择您的仓库 `Joanna0827/meirong`
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
6. 添加环境变量（同 Vercel）
7. 点击 "Deploy site"

### 3. Railway 部署

#### 步骤：
1. 访问 [Railway](https://railway.app) 并注册/登录
2. 点击 "New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择您的仓库
5. 添加环境变量
6. 自动部署

## 本地开发

如果您想在本地运行项目：

```bash
# 克隆仓库
git clone https://github.com/Joanna0827/meirong.git
cd meirong

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看应用。

## 环境变量配置

在生产环境中，您需要配置以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsvzvxvejupjvlkxcsxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnp2eHZlanVwanZsa3hjc3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTIzNjgsImV4cCI6MjA2ODQ2ODM2OH0.8j5D0mz7CXENY1HiiCGJ2ZoCQypeuEgTWUzuysz34y0
```

## 自定义域名

部署完成后，您可以：

1. 在部署平台配置自定义域名
2. 更新 DNS 记录指向部署平台
3. 配置 SSL 证书（通常自动提供）

## 更新和维护

### 代码更新
```bash
# 拉取最新代码
git pull origin main

# 安装新依赖（如果有）
npm install

# 本地测试
npm run dev
```

### 数据库管理
- 访问 [Supabase Dashboard](https://supabase.com/dashboard)
- 选择您的项目 `meirong`
- 在 Table Editor 中查看和管理数据

## 故障排除

### 常见问题

1. **构建失败**
   - 检查环境变量是否正确配置
   - 确保所有依赖都已安装

2. **数据库连接问题**
   - 验证 Supabase URL 和 API Key
   - 检查数据库表是否存在

3. **样式问题**
   - 确保 Tailwind CSS 正确配置
   - 检查构建输出

### 获取帮助

如果遇到问题，可以：
1. 查看部署平台的日志
2. 检查 GitHub Issues
3. 联系技术支持

## 安全注意事项

1. **API Key 安全**
   - 不要在客户端代码中暴露敏感信息
   - 使用环境变量管理密钥

2. **数据库安全**
   - 定期备份数据
   - 监控数据库访问

3. **应用安全**
   - 定期更新依赖
   - 启用 HTTPS

---

部署完成后，您的美容店预约系统就可以在互联网上访问了！🎉 