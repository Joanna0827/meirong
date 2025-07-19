# 美丽时光美容店预约系统

一个现代化的美容店预约管理系统，使用 Next.js + TypeScript + Tailwind CSS + Supabase 构建。

## 功能特性

### 用户端功能
- 🌸 **在线预约** - 客户可以填写预约表单，选择服务项目、日期和时间
- 📱 **预约查询** - 客户可以通过手机号查询自己的预约记录
- 🎨 **美观界面** - 现代化的粉色主题设计，符合美容店风格
- 📱 **响应式设计** - 支持手机、平板、电脑等各种设备

### 管理端功能
- 📊 **数据统计** - 显示总预约数、待确认、已确认、已完成、已取消的统计
- 📋 **预约管理** - 查看所有预约记录，支持状态筛选
- ✅ **状态更新** - 可以更新预约状态（确认、完成、取消）
- 📝 **备注查看** - 查看客户的特殊要求和备注信息

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **部署平台**: 支持 Vercel、Netlify 等

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd beauty-salon-booking
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
创建 `.env.local` 文件并添加 Supabase 配置：
```env
NEXT_PUBLIC_SUPABASE_URL=https://qsvzvxvejupjvlkxcsxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnp2eHZlanVwanZsa3hjc3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTIzNjgsImV4cCI6MjA2ODQ2ODM2OH0.8j5D0mz7CXENY1HiiCGJ2ZoCQypeuEgTWUzuysz34y0
```

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 访问应用
- 用户端: http://localhost:3000
- 管理端: http://localhost:3000/admin

## 数据库结构

### appointments 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键，自动生成 |
| customer_name | VARCHAR(100) | 客户姓名 |
| customer_phone | VARCHAR(20) | 客户手机号 |
| service_name | VARCHAR(200) | 服务项目名称 |
| appointment_date | DATE | 预约日期 |
| appointment_time | TIME | 预约时间 |
| duration_minutes | INTEGER | 服务时长（分钟） |
| status | VARCHAR(20) | 预约状态 |
| notes | TEXT | 备注信息 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 预约状态
- `pending` - 待确认
- `confirmed` - 已确认
- `completed` - 已完成
- `cancelled` - 已取消

## 项目结构

```
beauty-salon-booking/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主页面（用户端）
│   │   ├── admin/
│   │   │   └── page.tsx      # 管理后台
│   │   └── layout.tsx        # 布局组件
│   └── lib/
│       ├── supabase.ts       # Supabase 客户端配置
│       └── appointments.ts   # 预约相关 API 函数
├── public/                   # 静态资源
└── package.json
```

## 部署

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### 其他平台
项目支持部署到任何支持 Next.js 的平台，如 Netlify、Railway 等。

## 开发说明

### 添加新功能
1. 在 `src/lib/` 中添加新的 API 函数
2. 在 `src/app/` 中创建新的页面组件
3. 更新类型定义（如需要）

### 样式修改
项目使用 Tailwind CSS，可以直接在组件中使用 Tailwind 类名，或创建自定义样式。

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。
