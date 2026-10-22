// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "\u9875\u9762\u7BA1\u7406 (Pages)",
        path: "content/pages",
        fields: [
          { type: "string", name: "title", label: "\u9875\u9762\u6807\u9898", isTitle: true, required: true },
          { type: "string", name: "seoDesc", label: "SEO/GEO \u63CF\u8FF0", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "\u9996\u5C4F\u80CC\u666F\u56FE" },
          { type: "rich-text", name: "body", label: "\u9875\u9762\u6B63\u6587", isBody: true }
        ],
        ui: {
          router: ({ document }) => {
            return document._sys.filename === "home" ? "/" : `/${document._sys.filename}`;
          }
        }
      },
      {
        name: "products",
        label: "\u4EA7\u54C1\u7BA1\u7406 (Products)",
        path: "content/products",
        fields: [
          { type: "string", name: "name", label: "\u4EA7\u54C1\u540D\u79F0", isTitle: true, required: true },
          { type: "string", name: "price", label: "\u4EF7\u683C/\u53C2\u6570" },
          { type: "image", name: "coverImage", label: "\u5C01\u9762\u56FE" },
          { type: "rich-text", name: "description", label: "\u4EA7\u54C1\u4ECB\u7ECD", isBody: true }
        ],
        ui: {
          router: ({ document }) => `/products/${document._sys.filename}`
        }
      },
      {
        name: "blogs",
        label: "\u535A\u5BA2\u6587\u7AE0 (Blogs)",
        path: "content/blogs",
        fields: [
          { type: "string", name: "title", label: "\u6587\u7AE0\u6807\u9898", isTitle: true, required: true },
          { type: "string", name: "seoDesc", label: "SEO/GEO \u63CF\u8FF0", ui: { component: "textarea" } },
          { type: "datetime", name: "date", label: "\u53D1\u5E03\u65E5\u671F" },
          { type: "image", name: "coverImage", label: "\u5C01\u9762\u56FE" },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`
        }
      },
      {
        name: "globals",
        label: "\u5168\u5C40\u914D\u7F6E (Globals)",
        path: "content/globals",
        format: "json",
        fields: [
          { type: "string", name: "siteName", label: "\u7F51\u7AD9\u540D\u79F0" },
          { type: "string", name: "contactEmail", label: "\u8054\u7CFB\u90AE\u7BB1" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
