import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedOrigins: ['http://192.168.1.76:4321', 'http://localhost:4321'],
  },
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: '页面管理 (Pages)',
        path: 'content/pages',
        fields: [
          { type: 'string', name: 'title', label: '页面标题', isTitle: true, required: true },
          { type: 'string', name: 'seoDesc', label: 'SEO/GEO 描述', ui: { component: 'textarea' } },
          { type: 'image', name: 'heroImage', label: '首屏背景图' },
          { type: 'rich-text', name: 'body', label: '页面正文', isBody: true },
        ],
        ui: {
          // 关键配置：如果文件名是 home，指向根路径 /，否则指向 /文件名
          router: ({ document }) => {
            return document._sys.filename === 'home' ? '/' : `/${document._sys.filename}`;
          },
        },
      },
      {
        name: 'products',
        label: '产品管理 (Products)',
        path: 'content/products',
        fields: [
          { type: 'string', name: 'name', label: '产品名称', isTitle: true, required: true },
          { type: 'string', name: 'price', label: '价格/参数' },
          { type: 'image', name: 'coverImage', label: '封面图' },
          { type: 'rich-text', name: 'description', label: '产品介绍', isBody: true },
        ],
        ui: {
          // 产品指向 /products/文件名
          router: ({ document }) => `/products/${document._sys.filename}`,
        },
      },
      {
        name: 'blogs',
        label: '博客文章 (Blogs)',
        path: 'content/blogs',
        fields: [
          { type: 'string', name: 'title', label: '文章标题', isTitle: true, required: true },
          { type: 'string', name: 'seoDesc', label: 'SEO/GEO 描述', ui: { component: 'textarea' } },
          { type: 'datetime', name: 'date', label: '发布日期' },
          { type: 'image', name: 'coverImage', label: '封面图' },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
        ui: {
          // 博客指向 /blog/文件名
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
      {
        name: 'globals',
        label: '全局配置 (Globals)',
        path: 'content/globals',
        format: 'json',
        fields: [
          { type: 'string', name: 'siteName', label: '网站名称' },
          { type: 'string', name: 'contactEmail', label: '联系邮箱' },
        ],
      },
    ],
  },
});
